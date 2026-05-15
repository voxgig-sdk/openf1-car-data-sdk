
import { Context } from './Context'


class Openf1CarDataError extends Error {

  isOpenf1CarDataError = true

  sdk = 'Openf1CarData'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  Openf1CarDataError
}

