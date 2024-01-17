import * as cdk from 'aws-cdk-lib'
import { Environment } from './environment'
import { makeId, makeName } from './naming'

export const createApiGateway = (name: string, stack: cdk.Stack, _allowHeaders: string[]) =>
  new cdk.aws_apigatewayv2.CfnApi(stack, makeId(name), {
    name: makeName(name),
    protocolType: 'HTTP',
    corsConfiguration: {
      allowHeaders: ['*'],
      allowMethods: ['*'],
      allowOrigins: ['*'],
    },
  })

export const createApiIntegration = (
  name: string,
  props: {
    stack: cdk.Stack
    integrationMethod: string
    api: cdk.aws_apigatewayv2.CfnApi
    lambda: cdk.aws_lambda.Function
  }
) =>
  new cdk.aws_apigatewayv2.CfnIntegration(props.stack, makeId(name), {
    apiId: cdk.Fn.ref(props.api.logicalId),
    integrationType: 'AWS_PROXY',
    integrationUri: `arn:aws:apigateway:${Environment.region()}:lambda:path/2015-03-31/functions/${
      props.lambda.functionArn
    }/invocations`,
    integrationMethod: 'POST',
    payloadFormatVersion: '2.0',
  })

export const createApiRoute = (
  name: string,
  props: {
    stack: cdk.Stack
    routeKey: string
    api: cdk.aws_apigatewayv2.CfnApi
    integration: cdk.aws_apigatewayv2.CfnIntegration
  }
) =>
  new cdk.aws_apigatewayv2.CfnRoute(props.stack, makeId(name), {
    apiId: cdk.Fn.ref(props.api.logicalId),
    routeKey: props.routeKey,
    authorizationType: 'NONE',
    target: `integrations/${cdk.Fn.ref(props.integration.logicalId)}`,
  })

export const createApiDeployment = (name: string, stack: cdk.Stack, api: cdk.aws_apigatewayv2.CfnApi) =>
  new cdk.aws_apigatewayv2.CfnDeployment(stack, makeId(name), {
    apiId: cdk.Fn.ref(api.logicalId),
  })

export const createApiStage = (
  name: string,
  props: {
    stack: cdk.Stack
    api: cdk.aws_apigatewayv2.CfnApi
    apiDevelopment: cdk.aws_apigatewayv2.CfnDeployment
    logGroup: cdk.aws_logs.CfnLogGroup
  }
) => {
  const apiStage = new cdk.aws_apigatewayv2.CfnStage(props.stack, makeId(name), {
    apiId: cdk.Fn.ref(props.api.logicalId),
    stageName: makeName(name),
    autoDeploy: true,
    deploymentId: cdk.Fn.ref(props.apiDevelopment.logicalId),
    accessLogSettings: {
      destinationArn: props.logGroup.attrArn,
      format:
        '{ "requestId": "$context.requestId", "path": "$context.path", "routeKey": "$context.routeKey", "ip": "$context.identity.sourceIp", "requestTime": "$context.requestTime", "httpMethod": "$context.httpMethod","statusCode": $context.status }',
    },
  })
  apiStage.addDependency(props.apiDevelopment)
  apiStage.addDependency(props.logGroup)
  return apiStage
}
