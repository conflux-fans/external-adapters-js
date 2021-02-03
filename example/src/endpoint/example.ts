import { Validator } from '@chainlink/external-adapter'
import { ExecuteInContext, Config } from '@chainlink/types'

export const NAME = 'example'

const customError = (data: any) => data.Response === 'Error'

const customParams = {
  base: ['base', 'from', 'coin'],
  quote: ['quote', 'to', 'market'],
}

export const execute: ExecuteInContext<Config> = async (request, { config, http }) => {
  const validator = new Validator(request, customParams)
  if (validator.error) throw validator.error

  const jobRunID = validator.validated.id
  const base = validator.validated.data.base
  const quote = validator.validated.data.quote
  const url = `price`

  const params = {
    base,
    quote,
  }

  const options = { ...config.api, params, url }

  const response = await http.request(options, customError)
  const result = http.validateResultNumber(response.data, ['price'])

  return http.success(jobRunID, {
    data: { result },
    result,
    status: 200,
  })
}
