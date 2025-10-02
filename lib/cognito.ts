import * as cdk from 'aws-cdk-lib'
import { makeId, makeName } from './naming'

export const createCognito = (
  prefix: string,
  props: { stack: cdk.Stack; passwordPolicy?: cdk.aws_cognito.PasswordPolicy }
) => {
  const userPool = createUserPool(`${prefix}UserPool`, props)
  const userPoolClient = createUserPoolClient(`${prefix}UserPoolClient`, { ...props, userPool })
  return { userPool, userPoolClient }
}

// {
//   minLength: 8,
//   requireLowercase: true,
//   requireUppercase: true,
//   requireDigits: true,
// }
export const createUserPool = (
  name: string,
  props: { stack: cdk.Stack; passwordPolicy?: cdk.aws_cognito.PasswordPolicy }
) =>
  new cdk.aws_cognito.UserPool(props.stack, makeId(name), {
    userPoolName: makeName(name),
    selfSignUpEnabled: true,
    signInAliases: { email: true },
    autoVerify: { email: true },
    passwordPolicy: props.passwordPolicy,
    accountRecovery: cdk.aws_cognito.AccountRecovery.EMAIL_ONLY,
  })

export const createUserPoolClient = (name: string, props: { stack: cdk.Stack; userPool: cdk.aws_cognito.UserPool }) =>
  new cdk.aws_cognito.UserPoolClient(props.stack, name, {
    userPool: props.userPool,
    generateSecret: false,
    authFlows: { userPassword: true },
    accessTokenValidity: cdk.Duration.hours(1),
    idTokenValidity: cdk.Duration.hours(1),
    refreshTokenValidity: cdk.Duration.days(30),
  })

export const createAutoVerifyLambda = (stack: cdk.Stack) =>
  new cdk.aws_lambda.Function(stack, makeId('CognitoPreSignUpLambda'), {
    runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
    handler: 'index.handler',
    code: cdk.aws_lambda.Code.fromInline(`
    exports.handler = async (event) => {
      event.response.autoConfirmUser = true;
      event.response.autoVerifyEmail = true;
      return event;
    };
  `),
  })
