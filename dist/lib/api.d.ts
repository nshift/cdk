import * as cdk from 'aws-cdk-lib';
export declare const createApi: (stack: cdk.Stack) => cdk.aws_apigatewayv2.CfnApi;
export declare const deployApi: (stack: cdk.Stack, api: cdk.aws_apigatewayv2.CfnApi, dependencies: cdk.CfnResource[]) => {
    apiDevelopment: cdk.aws_apigatewayv2.CfnDeployment;
    logGroup: cdk.aws_logs.CfnLogGroup;
    apiStage: cdk.aws_apigatewayv2.CfnStage;
};
export declare const createEndpoint: (prefix: string, props: {
    codeUri: string;
    handler: string;
    method: string;
    path: string;
    stack: cdk.Stack;
    api: cdk.aws_apigatewayv2.CfnApi;
    sharedLayer: cdk.aws_lambda.LayerVersion;
    memorySize?: number | undefined;
    environment?: {
        [key: string]: string;
    } | undefined;
}) => {
    lambda: cdk.aws_lambda.Function;
    integration: cdk.aws_apigatewayv2.CfnIntegration;
    route: cdk.aws_apigatewayv2.CfnRoute;
    lambdaPermission: cdk.aws_lambda.CfnPermission;
};
