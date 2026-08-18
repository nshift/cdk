import * as cdk from 'aws-cdk-lib';
export declare const createDynamoDbTable: (name: string, props: {
    stack: cdk.Stack;
    partitionKey: {
        name: string;
        type: cdk.aws_dynamodb.AttributeType;
    };
    sortKey?: {
        name: string;
        type: cdk.aws_dynamodb.AttributeType;
    };
    secondaryIndexes?: {
        indexName: string;
        partitionKey: {
            name: string;
            type: cdk.aws_dynamodb.AttributeType;
        };
        sortKey?: {
            name: string;
            type: cdk.aws_dynamodb.AttributeType;
        };
    }[];
}) => cdk.aws_dynamodb.Table;
