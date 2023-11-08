import * as cdk from 'aws-cdk-lib'
import { Environment } from './environment'
import { makeId, makeName } from './naming'

export const createBucket = (name: string, stack: cdk.Stack) =>
  new cdk.aws_s3.Bucket(stack, makeId(name), {
    bucketName: makeName(name, Environment.region()),
    removalPolicy: cdk.RemovalPolicy.DESTROY,
  })
