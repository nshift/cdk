import * as cdk from 'aws-cdk-lib'
import { makeId, makeName } from './naming'

export const createDynamoDbTable = (
  name: string,
  props: {
    stack: cdk.Stack
    partitionKey: { name: string; type: cdk.aws_dynamodb.AttributeType }
    sortKey?: { name: string; type: cdk.aws_dynamodb.AttributeType }
    secondaryIndexes?: {
      indexName: string
      partitionKey: { name: string; type: cdk.aws_dynamodb.AttributeType }
      sortKey?: { name: string; type: cdk.aws_dynamodb.AttributeType }
    }[]
  }
) => {
  const table = new cdk.aws_dynamodb.Table(props.stack, makeId(name), {
    tableName: makeName(name),
    partitionKey: props.partitionKey,
    sortKey: props.sortKey,
    billingMode: cdk.aws_dynamodb.BillingMode.PAY_PER_REQUEST,
    removalPolicy: cdk.RemovalPolicy.DESTROY,
  })
  if (props.secondaryIndexes) {
    props.secondaryIndexes.forEach((secondaryIndex) => {
      table.addGlobalSecondaryIndex({
        indexName: secondaryIndex.indexName,
        partitionKey: secondaryIndex.partitionKey,
        sortKey: secondaryIndex.sortKey,
        projectionType: cdk.aws_dynamodb.ProjectionType.ALL,
      })
    })
  }
  return table
}
