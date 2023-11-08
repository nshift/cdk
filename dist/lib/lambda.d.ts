import * as cdk from 'aws-cdk-lib';
export declare const createSharedLayer: (name: string, path: string, stack: cdk.Stack) => cdk.aws_lambda.LayerVersion;
export declare const createLambda: (name: string, props: {
    stack: cdk.Stack;
    sharedLayer: cdk.aws_lambda.LayerVersion;
    path: string;
    handler: string;
    memorySize?: number | undefined;
    environment?: {
        [key: string]: string;
    } | undefined;
}) => cdk.aws_lambda.Function;
export declare const createLambdaPermission: (name: string, stack: cdk.Stack, lambda: cdk.aws_lambda.Function) => cdk.aws_lambda.CfnPermission;
