import * as cdk from 'aws-cdk-lib';
export declare const createBucket: (name: string, stack: cdk.Stack, isPublic?: boolean) => cdk.aws_s3.Bucket;
