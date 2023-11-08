import { Environment } from './environment'
import { camelize, snakelize, upperFirst } from './lodash'

export const makeId = (...ids: string[]) => ids.map((id) => upperFirst(camelize(id))).join()

export const makeName = (...names: string[]) => {
  const projectName = Environment.projectName()
  const environment = Environment.environment()
  return snakelize(
    [projectName, environment]
      .concat(names)
      .map((name) => upperFirst(camelize(name)))
      .join()
  ).replace(new RegExp('_', 'g'), '-')
}
