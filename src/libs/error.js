import { factory } from '@/libs/observer'

export const FAILURE = 0
export const CRITIC = 1
export const GRAVE = 2
export const IMPORTANT = 3
export const MINOR = 4

export class LucteriosException extends Error {
  constructor(aType, aMessage, aInfo, aExtra) {
    super(aMessage)
    this.type = aType
    this.message = aMessage
    this.info = aInfo
    this.extra = aExtra
  }
  toString() {
    var res = this.type + '~' + this.message
    if (this.info) {
      res += '#' + this.info
      if (this.extra) {
        res += '#' + this.extra
      }
    }
    return res
  }
}

function errorHandler(errorMsg, stack, error) {
  var errorDesc = ['', '', '']
  var typeError
  var errname
  if (error !== undefined) {
    if (error.type !== undefined) {
      typeError = error.type
      errname = 'LucteriosException'
      errorDesc[0] = error.message
      errorDesc[1] = error.info
      if (error.extra !== undefined) {
        errorDesc[2] = error.extra.toString()
      }
      if (error.stack !== undefined) {
        stack = error.stack.replaceAll('@http', '\thttp').replaceAll('@', '{[br]}')
      } else if (error.fileName !== undefined) {
        stack = error.fileName + ':' + error.lineNumber + ':' + error.columnNumber
      } else if (stack == null) {
        stack = ''
      }
    } else {
      typeError = FAILURE
      errname = error.name
      errorDesc[0] = error.message
      errorDesc[1] = '*'
      stack = error.stack
    }
  } else {
    errorDesc[0] = errorMsg
    typeError = FAILURE
  }
  return {
    context: {},
    close: null,
    exception: {
      message: errorDesc[0],
      code: typeError,
      debug: stack,
      type: errname,
      request: errorDesc[1],
      response: errorDesc[2]
    },
    meta: {
      extension: '',
      action: '',
      title: 'Exception',
      observer: 'core.exception'
    }
  }
}

export function initial_error() {
  window.onerror = async function (errorMsg, source, lineno, columnNo, error) {
    const obs_exception = errorHandler(errorMsg, source + '->' + lineno + ':' + columnNo, error)
    await factory(obs_exception, () => {}, null, false)
  }
}

export async function runErrorCaptured(err) {
  const obs_exception = errorHandler(err.message, null, err)
  await factory(obs_exception, () => {}, null, false)
  return true
}
