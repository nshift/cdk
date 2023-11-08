export class Environment {
  static projectName = () => required('PROJECT_NAME')
  static region = () => required('REGION')
  static environment = () => required('ENVIRONMENT')
}

function required(environmentName: string) {
  const environmentVariable = process.env[environmentName]
  if (!environmentVariable) {
    throw new Error(`Environment variable ${environmentName} is required.`)
  }
  return environmentVariable
}
