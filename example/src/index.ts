import { expose, util } from '@chainlink/ea-bootstrap'
import { makeExecute } from './adapter'
import { makeContext } from './context'

const NAME = 'EXAMPLE'

export = { NAME, makeExecute, makeContext, ...expose(util.wrapExecute(makeExecute())) }
