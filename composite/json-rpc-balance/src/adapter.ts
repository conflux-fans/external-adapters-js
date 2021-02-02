import { AdapterRequest, AdapterResponse, Execute } from '@chainlink/types'
import { Requester, Validator } from '@chainlink/external-adapter'
import { Config, makeConfig } from './config'
import { BigNumber } from 'ethers'

const customParams = {}

export type BalanceResponse = {
  addresses: Record<string, BigNumber>
  result: BigNumber
}

export const makeExecute = (config?: Config): Execute => {
  return async (request: AdapterRequest) => execute(request, config || makeConfig())
}

const execute = async (input: AdapterRequest, config: Config): Promise<AdapterResponse> => {
  const validator = new Validator(input, customParams)
  if (validator.error) throw validator.error

  const jobRunID = validator.validated.id
  const {} = validator.validated.data

  return success(jobRunID, 0)
}

const success = (jobRunID: string, result: number): AdapterResponse => {
  const response = { data: { result }, result, status: 200 }
  return Requester.success(jobRunID, response)
}
