import * as cdk from 'aws-cdk-lib';
export declare const createCognito: (prefix: string, props: {
    stack: cdk.Stack;
    passwordPolicy?: cdk.aws_cognito.PasswordPolicy;
}) => {
    userPool: cdk.aws_cognito.UserPool;
    userPoolClient: cdk.aws_cognito.UserPoolClient;
};
export declare const createUserPool: (name: string, props: {
    stack: cdk.Stack;
    passwordPolicy?: cdk.aws_cognito.PasswordPolicy;
}) => cdk.aws_cognito.UserPool;
export declare const createUserPoolClient: (name: string, props: {
    stack: cdk.Stack;
    userPool: cdk.aws_cognito.UserPool;
}) => cdk.aws_cognito.UserPoolClient;
