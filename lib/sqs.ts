import * as cdk from 'aws-cdk-lib'
import { makeId, makeName } from './naming'

export const createSQS = (name: string, props: { stack: cdk.Stack }) => {
  const deadLetterQueue = new cdk.aws_sqs.Queue(props.stack, makeId(`${name}DeadLetterQueue`), {
    queueName: makeName(`${name}DeadLetterQueue`),
    retentionPeriod: cdk.Duration.days(7),
  })
  return new cdk.aws_sqs.Queue(props.stack, makeId(`${name}Queue`), {
    queueName: makeName(`${name}Queue`),
    visibilityTimeout: cdk.Duration.seconds(30),
    deadLetterQueue: {
      maxReceiveCount: 1,
      queue: deadLetterQueue,
    },
  })
}

export const linkLambdaToSQS = (lambda: cdk.aws_lambda.Function, queue: cdk.aws_sqs.Queue) => {
  lambda.addEventSource(new cdk.aws_lambda_event_sources.SqsEventSource(queue, { batchSize: 1 }))
}
