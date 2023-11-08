import * as cdk from 'aws-cdk-lib'
import { makeId } from './naming'

export const createLogGroup = (name: string, stack: cdk.Stack, api: cdk.aws_apigatewayv2.CfnApi) =>
  new cdk.aws_logs.CfnLogGroup(stack, makeId(name), {
    logGroupName: `/aws/apigateway/${api.name}`,
    retentionInDays: 7,
  })
