// Declare missing type definitions
declare module '@chainlink/types' {
  export type AdapterRequestMeta = {
    availableFunds?: number
    eligibleToSubmit?: boolean
    latestAnswer?: number
    oracleCount?: number
    paymentAmount?: number
    reportableRoundID?: number
    startedAt?: number
    timeout?: number
  }
  export type AdapterRequest = {
    id: string
    data: Record<string, unknown>
    meta?: AdapterRequestMeta
  }

  export type Callback = (statusCode: number, data?: any) => void
  export type AdapterHealthCheck = (callback: Callback) => any

  import { AxiosRequestConfig } from 'axios'
  export type Config = {
    apiKey?: string
    network?: string
    returnRejectedPromiseOnError?: Boolean
    verbose?: boolean
    api: Partial<AxiosRequestConfig>
  }

  export type Context<C extends Config> = {
    http: any
    cache: any
    secrets: any
    config: C
  }

  /* RESPONSES */
  export type DataResponse<R, P> = {
    result: R
    payload?: P
  }

  export type SequenceResponseData<R> = {
    responses?: any[]
    result: R[]
  }

  export type AdapterResponse = {
    jobRunID: string
    statusCode: number
    data: any
    result: any
  }

  type ErrorBasic = {
    name: string
    message: string
  }
  type ErrorFull = ErrorBasic & {
    stack: string
    cause: string
  }
  export type AdapterErrorResponse = {
    jobRunID: string
    status: string
    statusCode: number
    error: ErrorBasic | ErrorFull
  }

  // TODO: clean this ASAP
  export type WrappedAdapterResponse = {
    statusCode: number
    data: AdapterResponse
  }
  export type ExecuteWrappedResponse = (input: AdapterRequest) => Promise<WrappedAdapterResponse>

  export type ExecuteSync = (input: AdapterRequest, callback: Callback) => void

  import { AxiosRequestConfig } from 'axios'
  export type Config = {
    apiKey?: string
    network?: string
    returnRejectedPromiseOnError?: Boolean
    api?: Partial<AxiosRequestConfig>
  }

  export type Execute = (input: AdapterRequest) => Promise<AdapterResponse>

  export type ExecuteWithConfig = (
    input: AdapterRequest,
    config: Config,
  ) => Promise<AdapterResponse>

  export type ExecuteInContext<C extends Config> = (
    input: AdapterRequest,
    context: Context<C>,
  ) => Promise<AdapterResponse>

  export type ExecuteFactory<C extends Config> = (context?: Context<C>) => Execute

  export type ConfigFactory = (prefix?: string) => Config

  export type ContextFactory<C extends Config> = (prefix?: string) => Context<C>

  import type { ExecuteHandlers } from '@chainlink/ea-bootstrap/src'
  export type AdapterImplementation = {
    NAME: string
    makeExecute: ExecuteFactory
  } & ReturnType<expose>
  export interface Implementations<t> {
    [type: string]: AdapterImplementation
  }

  export type Account = {
    address: string
    coin?: CoinType
    chain?: ChainType
    balance?: number
  }
}
declare module '@chainlink/ea-bootstrap'
declare module '@chainlink/external-adapter'
declare module 'object-path'
