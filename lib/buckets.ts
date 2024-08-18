import * as cdk from 'aws-cdk-lib'
import { Environment } from './environment'
import { makeId, makeName } from './naming'

export const createBucket = (name: string, stack: cdk.Stack, isPublic: boolean = false) =>
  new cdk.aws_s3.Bucket(stack, makeId(name), {
    bucketName: makeName(name, Environment.region()),
    removalPolicy: cdk.RemovalPolicy.DESTROY,
    ...(isPublic
      ? {
          blockPublicAccess: {
            blockPublicPolicy: false,
            blockPublicAcls: false,
            ignorePublicAcls: false,
            restrictPublicBuckets: false,
          },
          publicReadAccess: true,
        }
      : {}),
  })
