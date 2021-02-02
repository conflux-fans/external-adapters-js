import { util } from '@chainlink/ea-bootstrap'
import { Execute } from '@chainlink/types'
import { getSourceDataProviders, getSourceImpl } from './source'
import { getCheckDataProviders, getCheckImpl } from './check'

export type Config = {
  rpcUrl: string
  type: string
}

export const ENV_RPC_URL = 'RPC_URL'
export const ENV_NODE_TYPE = 'NODE_TYPE'

export const makeConfig = (prefix = ''): Config => {
  const threshold = {
    checks: Number(util.getEnv(ENV_RPC_URL, prefix) || 0),
    onchain: Number(util.getEnv(ENV_NODE_TYPE, prefix) || 0),
  }

  const sourceDataProviders = getSourceDataProviders(prefix)
  const sourceAdapters = sourceDataProviders.map(getSourceImpl)
  if (sourceAdapters.length === 0) {
    throw Error('No source adapters provided')
  }

  const checkDataProviders = getCheckDataProviders(prefix)
  const checkAdapters = checkDataProviders.map(getCheckImpl)
  if (threshold.checks > 0 && checkAdapters.length === 0) {
    throw Error('Check threshold is >0, but no check adapters were provided')
  }

  return { sourceAdapters, checkAdapters, threshold }
}
