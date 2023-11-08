import * as cdk from 'aws-cdk-lib'
import { Environment } from './environment'
import { makeId } from './naming'

export const createStack = (name: string, app: cdk.App) =>
  new cdk.Stack(app, makeId(name), { env: { region: Environment.region() } })
