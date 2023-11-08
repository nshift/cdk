import * as cdk from 'aws-cdk-lib'
import { makeId, makeName } from './naming'

export const createSharedLayer = (name: string, path: string, stack: cdk.Stack) =>
  new cdk.aws_lambda.LayerVersion(stack, makeId(name), {
    layerVersionName: makeName(name),
    code: cdk.aws_lambda.Code.fromAsset(path),
    compatibleRuntimes: [cdk.aws_lambda.Runtime.NODEJS_18_X],
  })

export const createLambda = (
  name: string,
  props: {
    stack: cdk.Stack
    sharedLayer: cdk.aws_lambda.LayerVersion
    path: string
    handler: string
    memorySize?: number
    environment?: { [key: string]: string }
  }
) =>
  new cdk.aws_lambda.Function(props.stack, makeId(name), {
    functionName: makeName(name),
    code: cdk.aws_lambda.Code.fromAsset(props.path),
    handler: props.handler,
    runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
    timeout: cdk.Duration.seconds(30),
    memorySize: props.memorySize ?? 2048,
    environment: props.environment,
    layers: [props.sharedLayer],
    logRetention: cdk.aws_logs.RetentionDays.THREE_MONTHS,
  })

export const createLambdaPermission = (name: string, stack: cdk.Stack, lambda: cdk.aws_lambda.Function) =>
  new cdk.aws_lambda.CfnPermission(stack, makeId(name), {
    action: 'lambda:InvokeFunction',
    functionName: lambda.functionName,
    principal: 'apigateway.amazonaws.com',
  })
