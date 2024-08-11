import * as cdk from 'aws-cdk-lib';
export declare const createSQS: (name: string, props: {
    stack: cdk.Stack;
}) => cdk.aws_sqs.Queue;
export declare const linkLambdaToSQS: (lambda: cdk.aws_lambda.Function, queue: cdk.aws_sqs.Queue) => void;
