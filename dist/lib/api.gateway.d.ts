import * as cdk from 'aws-cdk-lib';
export declare const createApiGateway: (name: string, stack: cdk.Stack, _allowHeaders: string[]) => cdk.aws_apigatewayv2.CfnApi;
export declare const createApiIntegration: (name: string, props: {
    stack: cdk.Stack;
    integrationMethod: string;
    api: cdk.aws_apigatewayv2.CfnApi;
    lambda: cdk.aws_lambda.Function;
}) => cdk.aws_apigatewayv2.CfnIntegration;
export declare const createAuthorizer: (name: string, props: {
    stack: cdk.Stack;
    api: cdk.aws_apigatewayv2.CfnApi;
    userPool: cdk.aws_cognito.UserPool;
    userPoolClient: cdk.aws_cognito.UserPoolClient;
}) => cdk.aws_apigatewayv2.CfnAuthorizer;
export declare const createApiRoute: (name: string, props: {
    stack: cdk.Stack;
    routeKey: string;
    api: cdk.aws_apigatewayv2.CfnApi;
    integration: cdk.aws_apigatewayv2.CfnIntegration;
    authorizer?: cdk.aws_apigatewayv2.CfnAuthorizer;
}) => cdk.aws_apigatewayv2.CfnRoute;
export declare const createApiDeployment: (name: string, stack: cdk.Stack, api: cdk.aws_apigatewayv2.CfnApi) => cdk.aws_apigatewayv2.CfnDeployment;
export declare const createApiStage: (name: string, props: {
    stack: cdk.Stack;
    api: cdk.aws_apigatewayv2.CfnApi;
    apiDevelopment: cdk.aws_apigatewayv2.CfnDeployment;
    logGroup: cdk.aws_logs.CfnLogGroup;
}) => cdk.aws_apigatewayv2.CfnStage;
