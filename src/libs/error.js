export const FAILURE = 0
export const CRITIC = 1
export const GRAVE = 2
export const IMPORTANT = 3
export const MINOR = 4

export class LucteriosException {
  constructor(aType, aMessage, aInfo, aExtra) {
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

export function errorHandler(errorMsg, stack, error) {
  var errorDesc
  var typeError
  var errname
  if (error !== undefined) {
    if (error.type !== undefined) {
      typeError = error.type
      errname = 'LucteriosException'
      errorDesc = []
      errorDesc[0] = error.message
      errorDesc[1] = error.info
      if (error.extra !== undefined) {
        errorDesc[2] = error.extra.toString()
      }
      if (error.fileName !== undefined) {
        stack = error.fileName + ':' + error.lineNumber + ':' + error.columnNumber
      }
    } else {
      typeError = FAILURE
      errname = error.name
      errorDesc = []
      errorDesc[0] = error.message
      errorDesc[1] = '*'
      stack = error.stack
    }
  } else {
    errorDesc = []
    errorDesc[0] = errorMsg
    typeError = FAILURE
  }
  errorDesc[1] = errorDesc[1] ? encodeURIComponent(errorDesc[1]) : ''
  errorDesc[2] = errorDesc[2] ? encodeURIComponent(errorDesc[2]) : ''
  return {
    context: {},
    close: null,
    exception: {
      message: errorDesc[0],
      code: typeError,
      debug: stack,
      type: errname,
      requette: errorDesc[1],
      reponse: errorDesc[2]
    },
    meta: {
      extension: '',
      action: '',
      title: 'Exception',
      observer: 'core.exception'
    }
  }
}
