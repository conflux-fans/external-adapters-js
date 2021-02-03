import { Requester, Validator, AdapterError } from '@chainlink/external-adapter'
import { Config, ExecuteInContext, ExecuteFactory } from '@chainlink/types'
import { makeContext, DEFAULT_ENDPOINT } from './context'
import { example } from './endpoint'

const inputParams = {
  endpoint: false,
}

export const execute: ExecuteInContext<Config> = async (request, context) => {
  const validator = new Validator(request, inputParams)
  if (validator.error) throw validator.error

  Requester.logConfig(context.config)

  const jobRunID = validator.validated.id
  const endpoint = validator.validated.data.endpoint || DEFAULT_ENDPOINT

  switch (endpoint) {
    case example.NAME: {
      return await example.execute(request, context)
    }
    default: {
      throw new AdapterError({
        jobRunID,
        message: `Endpoint ${endpoint} not supported.`,
        statusCode: 400,
      })
    }
  }
}

export const makeExecute: ExecuteFactory<Config> = (context) => {
  return async (request) => execute(request, context || makeContext())
}
