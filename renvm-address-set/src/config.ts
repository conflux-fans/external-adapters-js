import { logger } from '@chainlink/external-adapter'
import { util } from '@chainlink/ea-bootstrap'
import { RenNetwork, isRenNetwork } from '@renproject/interfaces'

export const ENV_NETWORK = 'NETWORK'
export const ENV_API_ENDPOINT = 'API_ENDPOINT'

export const DEFAULT_NETWORK = 'testnet'
export const DEFAULT_TOKEN_OR_CONTRACT = 'BTC'

export type Config = {
  network: RenNetwork | undefined
  api: {
    baseURL: string | undefined
  }
}

export const getConfig = (prefix = ''): Config => {
  const network = util.getEnv(ENV_NETWORK, prefix)
  if (network && !isRenNetwork(network)) throw Error(`Unknown Ren network: ${network}`)

  return {
    network: network as RenNetwork | undefined,
    api: {
      baseURL: util.getEnv(ENV_API_ENDPOINT, prefix),
    },
  }
}

export const logConfig = (config: Config): void => {
  logger.debug('Adapter configuration:', { config })
}
