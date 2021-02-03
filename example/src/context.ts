import { Config, ContextFactory } from '@chainlink/types'
import { defaultContext } from '@chainlink/external-adapter'

export const DEFAULT_ENDPOINT = 'example'

export const makeContext: ContextFactory<Config> = (prefix?: string) => defaultContext(prefix)
