import * as cdk from 'aws-cdk-lib';
export declare const createLogGroup: (name: string, stack: cdk.Stack, api: cdk.aws_apigatewayv2.CfnApi) => cdk.aws_logs.CfnLogGroup;
