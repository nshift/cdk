import * as cdk from 'aws-cdk-lib'
import { makeId, makeName, makeQueueName } from './naming'

export const createSQS = (name: string, props: { stack: cdk.Stack }, fifo: boolean = false) => {
  const deadLetterQueue = new cdk.aws_sqs.Queue(props.stack, makeId(`${name}DeadLetterQueue`), {
    queueName: makeName(`${name}DeadLetterQueue`),
    retentionPeriod: cdk.Duration.days(7),
  })
  return new cdk.aws_sqs.Queue(props.stack, makeId(`${name}Queue`), {
    queueName: makeQueueName(`${name}Queue`) + fifo ? '.fifo' : '',
    visibilityTimeout: cdk.Duration.seconds(30),
    fifo,
    deadLetterQueue: {
      maxReceiveCount: 1,
      queue: deadLetterQueue,
    },
  })
}

export const linkLambdaToSQS = (lambda: cdk.aws_lambda.Function, queue: cdk.aws_sqs.Queue) => {
  lambda.addEventSource(new cdk.aws_lambda_event_sources.SqsEventSource(queue, { batchSize: 1 }))
}
