import { Requester } from './requester'
import { getDefaultConfig } from './config'

export const defaultContext = (prefix = '') => {
  return {
    http: Requester,
    cache: {},
    secrets: {},
    config: getDefaultConfig(prefix),
  }
}
