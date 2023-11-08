import * as cdk from 'aws-cdk-lib'
import * as dotenv from 'dotenv'
import * as path from 'path'
import { Template } from 'aws-cdk-lib/assertions'
import { createStack } from './lib/stack'
import { createApiDeployment, createApiGateway, createApiStage } from './lib/api.gateway'
import { createBucket } from './lib/buckets'
import { createDynamoDbTable } from './lib/dynamodb'
import { createSharedLayer } from './lib/lambda'
import { createEndpoint } from './lib/api'
import { createLogGroup } from './lib/log'

dotenv.config({ path: path.resolve(__dirname, '.env.test') })

test('Api creation', () => {
  const app = new cdk.App()
  const stack = createStack('CdkStackBenaly', app)
  const api = Fixtures.createApi(stack)

  const template = Template.fromStack(stack)
  template.hasResourceProperties('AWS::ApiGatewayV2::Api', {
    Name: 'nshift-test-api',
    ProtocolType: 'HTTP',
    CorsConfiguration: {
      AllowHeaders: ['Authorization'],
      AllowMethods: ['GET', 'POST'],
      AllowOrigins: ['*'],
    },
  })
})

test('Bucket creation', () => {
  const app = new cdk.App()
  const stack = createStack('BucketCreation', app)
  Fixtures.createDocumentBucket(stack)

  const template = Template.fromStack(stack)
  template.hasResourceProperties('AWS::S3::Bucket', {
    BucketName: 'nshift-test-document-bucket-ap-southeast-1',
  })
})

test('DynamoDb table creation', () => {
  const app = new cdk.App()
  const stack = createStack('DynamoDbTableCreation', app)
  Fixtures.createDocumentTable(stack)

  const template = Template.fromStack(stack)
  template.hasResourceProperties('AWS::DynamoDB::Table', {
    TableName: 'nshift-test-document-table',
    AttributeDefinitions: [
      { AttributeName: 'type', AttributeType: 'S' },
      { AttributeName: 'number', AttributeType: 'N' },
      { AttributeName: 'id', AttributeType: 'S' },
    ],
    KeySchema: [
      { AttributeName: 'type', KeyType: 'HASH' },
      { AttributeName: 'number', KeyType: 'RANGE' },
    ],
    GlobalSecondaryIndexes: [
      {
        IndexName: 'IdLookup',
        KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
        Projection: { ProjectionType: 'ALL' },
      },
    ],
    BillingMode: 'PAY_PER_REQUEST',
  })
})

test('Layer creation', () => {
  const app = new cdk.App()
  const stack = createStack('LayerCreation', app)
  Fixtures.createAccountingSharedLayer(stack)

  const template = Template.fromStack(stack)
  template.hasResourceProperties('AWS::Lambda::LayerVersion', {
    LayerName: 'nshift-test-accounting-shared-layer',
    CompatibleRuntimes: ['nodejs18.x'],
  })
})

test('Endpoint creation', () => {
  const app = new cdk.App()
  const stack = createStack('EndpointCreation', app)
  const api = Fixtures.createApi(stack)
  const documentBucket = Fixtures.createDocumentBucket(stack)
  const documentTable = Fixtures.createDocumentTable(stack)
  const sharedLayer = Fixtures.createAccountingSharedLayer(stack)
  const context = { stack, api, documentBucket, documentTable, sharedLayer }
  Fixtures.createDocumentCreationEndpoint(context)

  const template = Template.fromStack(stack)
  template.hasResourceProperties('AWS::Lambda::Function', {
    FunctionName: 'nshift-test-create-document-function',
    Handler: 'api.createApi',
    Runtime: 'nodejs18.x',
    Timeout: 30,
    MemorySize: 2048,
    Environment: {
      Variables: {
        NODE_ENV: 'PROD',
        LOG_LEVEL: 'info',
        DOCUMENT_TABLE_NAME: { Ref: 'DocumentTable9FE6D880' },
        DOCUMENT_S3_BUCKET_NAME: { Ref: 'DocumentBucketAE41E5A9' },
      },
    },
    Layers: [{ Ref: 'AccountingSharedLayerBB8F9C06' }],
  })
  template.hasResourceProperties('AWS::ApiGatewayV2::Integration', {
    ApiId: { Ref: 'Api' },
    IntegrationMethod: 'POST',
    IntegrationType: 'AWS_PROXY',
    IntegrationUri: {
      'Fn::Join': [
        '',
        [
          'arn:aws:apigateway:ap-southeast-1:lambda:path/2015-03-31/functions/',
          { 'Fn::GetAtt': ['CreateDocumentFunction02C36A43', 'Arn'] },
          '/invocations',
        ],
      ],
    },
    PayloadFormatVersion: '2.0',
  })
  template.hasResource('AWS::ApiGatewayV2::Route', {
    Properties: {
      ApiId: { Ref: 'Api' },
      RouteKey: 'POST /document/{type}',
      AuthorizationType: 'NONE',
      Target: { 'Fn::Join': ['', ['integrations/', { Ref: 'CreateDocumentIntegration' }]] },
    },
    DependsOn: ['CreateDocumentIntegration'],
  })
  template.hasResourceProperties('AWS::Lambda::Permission', {
    Action: 'lambda:InvokeFunction',
    FunctionName: { Ref: 'CreateDocumentFunction02C36A43' },
    Principal: 'apigateway.amazonaws.com',
  })
})

test('Api deployment', () => {
  const app = new cdk.App()
  const stack = createStack('ApiDeployment', app)
  const api = Fixtures.createApi(stack)
  const documentBucket = Fixtures.createDocumentBucket(stack)
  const documentTable = Fixtures.createDocumentTable(stack)
  const sharedLayer = Fixtures.createAccountingSharedLayer(stack)
  const context = { stack, api, documentBucket, documentTable, sharedLayer }
  const { route: createDocumentRoute } = Fixtures.createDocumentCreationEndpoint(context)
  Fixtures.deployApi(stack, api, [createDocumentRoute])

  const template = Template.fromStack(stack)
  template.hasResourceProperties('AWS::ApiGatewayV2::Deployment', { ApiId: { Ref: 'Api' } })
  template.hasResourceProperties('AWS::Logs::LogGroup', {
    LogGroupName: '/aws/apigateway/nshift-test-api',
    RetentionInDays: 7,
  })
  template.hasResourceProperties('AWS::ApiGatewayV2::Stage', {
    StageName: 'nshift-test-api-stage-name',
    AutoDeploy: true,
    DeploymentId: { Ref: 'ApiDeployment' },
    ApiId: { Ref: 'Api' },
    AccessLogSettings: {
      DestinationArn: { 'Fn::GetAtt': ['LogGroup', 'Arn'] },
      Format:
        '{ "requestId": "$context.requestId", "path": "$context.path", "routeKey": "$context.routeKey", "ip": "$context.identity.sourceIp", "requestTime": "$context.requestTime", "httpMethod": "$context.httpMethod","statusCode": $context.status }',
    },
  })
})

class Fixtures {
  static createApi = (stack: cdk.Stack) => createApiGateway('Api', stack)
  static createDocumentBucket = (stack: cdk.Stack) => createBucket('DocumentBucket', stack)
  static createDocumentTable = (stack: cdk.Stack) =>
    createDynamoDbTable('DocumentTable', {
      partitionKey: { name: 'type', type: cdk.aws_dynamodb.AttributeType.STRING },
      sortKey: { name: 'number', type: cdk.aws_dynamodb.AttributeType.NUMBER },
      secondaryIndex: {
        indexName: 'IdLookup',
        partitionKey: { name: 'id', type: cdk.aws_dynamodb.AttributeType.STRING },
      },
      stack,
    })
  static createAccountingSharedLayer = (stack: cdk.Stack) =>
    createSharedLayer('AccountingSharedLayer', 'node_modules', stack)
  static createDocumentCreationEndpoint = (props: {
    stack: cdk.Stack
    api: cdk.aws_apigatewayv2.CfnApi
    sharedLayer: cdk.aws_lambda.LayerVersion
    documentTable: cdk.aws_dynamodb.Table
    documentBucket: cdk.aws_s3.Bucket
  }) => {
    const endpoint = createEndpoint('CreateDocument', {
      codeUri: 'lib',
      handler: 'api.createApi',
      method: 'POST',
      path: '/document/{type}',
      environment: {
        NODE_ENV: 'PROD',
        LOG_LEVEL: 'info',
        DOCUMENT_TABLE_NAME: props.documentTable.tableName,
        DOCUMENT_S3_BUCKET_NAME: props.documentBucket.bucketName,
      },
      ...props,
    })
    props.documentBucket.grantRead(endpoint.lambda)
    props.documentBucket.grantPut(endpoint.lambda)
    props.documentTable.grant(endpoint.lambda, 'dynamodb:PutItem', 'dynamodb:Query')
    return endpoint
  }
  static deployApi = (stack: cdk.Stack, api: cdk.aws_apigatewayv2.CfnApi, dependencies: cdk.CfnResource[]) => {
    const apiDevelopment = createApiDeployment('ApiDeployment', stack, api)
    dependencies.forEach((dependency) => apiDevelopment.addDependency(dependency))
    const logGroup = createLogGroup('LogGroup', stack, api)
    const apiStage = createApiStage('ApiStageName', { stack, api, apiDevelopment, logGroup })
    return {
      apiDevelopment,
      logGroup,
      apiStage,
    }
  }
}
