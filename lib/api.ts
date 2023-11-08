import * as cdk from 'aws-cdk-lib'
import {
  createApiDeployment,
  createApiGateway,
  createApiIntegration,
  createApiRoute,
  createApiStage,
} from './api.gateway'
import { createLambda, createLambdaPermission } from './lambda'
import { createLogGroup } from './log'

export const createApi = (stack: cdk.Stack) => createApiGateway('Api', stack)

export const deployApi = (stack: cdk.Stack, api: cdk.aws_apigatewayv2.CfnApi, dependencies: cdk.CfnResource[]) => {
  const apiDevelopment = createApiDeployment('ApiDevelopment', stack, api)
  dependencies.forEach((dependency) => apiDevelopment.addDependency(dependency))
  const logGroup = createLogGroup('LogGroup', stack, api)
  const apiStage = createApiStage('ApiStageName', { stack, api, apiDevelopment, logGroup })
  return {
    apiDevelopment,
    logGroup,
    apiStage,
  }
}

export const createEndpoint = (
  prefix: string,
  props: {
    codeUri: string
    handler: string
    method: string
    path: string
    stack: cdk.Stack
    api: cdk.aws_apigatewayv2.CfnApi
    sharedLayer: cdk.aws_lambda.LayerVersion
    environment?: { [key: string]: string }
  }
) => {
  const lambda = createLambda(`${prefix}Function`, {
    path: props.codeUri,
    handler: props.handler,
    environment: props.environment,
    stack: props.stack,
    sharedLayer: props.sharedLayer,
  })
  const integration = createApiIntegration(`${prefix}Integration`, {
    integrationMethod: props.method,
    stack: props.stack,
    api: props.api,
    lambda: lambda,
  })
  const route = createApiRoute(`${prefix}Route`, {
    routeKey: `${props.method} ${props.path}`,
    stack: props.stack,
    api: props.api,
    integration: integration,
  })
  route.addDependency(integration)
  const lambdaPermission = createLambdaPermission(`${prefix}Permission`, props.stack, lambda)
  return { lambda, integration, route, lambdaPermission }
}
