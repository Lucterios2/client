import { useI18n } from 'vue-i18n'

export function convertToBytes(byteCharacters) {
  const sliceSize = 512
  var byteNumbers
  var slice
  const byteArrays = new [].constructor()
  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    slice = byteCharacters.slice(offset, offset + sliceSize)
    byteNumbers = new [].constructor(slice.length)
    for (var idx = 0; idx < slice.length; idx++) {
      byteNumbers[idx] = slice.charCodeAt(idx)
    }
    byteArrays.push(new Uint8Array(byteNumbers))
  }
  return byteArrays
}

export function convert_action(action, no_check) {
  var new_action = Object.assign({}, action)
  if (new_action.params === undefined) {
    new_action.params = {}
  }
  new_action.params = Object.assign({}, action.params)
  if (no_check) {
    new_action.no_check = true
  }
  return new_action
}

export function convertLuctoriosFormatToHtml(oldText) {
  var newText = String(oldText)
  newText = newText.replace(/<br\/>/g, '#BR#')
  newText = newText.replace('>', '&gt;')
  newText = newText.replace(/</g, '&lt;')
  newText = newText.replace(/\{\[bold\]\}/g, '<b>')
  newText = newText.replace(/\{\[\/bold\]\}/g, '</b>')
  newText = newText.replace(/\{\[italc\]\}/g, '<i>')
  newText = newText.replace(/\{\[\/italc\]\}/g, '</i>')
  newText = newText.replace(/\{\[italic\]\}/g, '<i>')
  newText = newText.replace(/\{\[\/italic\]\}/g, '</i>')
  newText = newText.replace(/\{\[newline\]\}/g, '<br>')
  newText = newText.replace(/\{\[underline\]\}/g, '<u>')
  newText = newText.replace(/\{\[\/underline\]\}/g, '</u>')
  newText = newText.replace(/\{\[center\]\}/g, '<center>')
  newText = newText.replace(/\{\[\/center\]\}/g, '</center>')
  newText = newText.replace(/\{\[hr\/\]\}/g, '<hr/>')
  newText = newText.replace(/<hr>/g, '<hr/>')
  newText = newText.replace(/#BR#/g, '<br/>')
  newText = newText.replace(/\{\[br\/\]\}/g, '<br/>')
  newText = newText.replace(/\{\[/g, '<')
  newText = newText.replace(/\]\}/g, '>')
  if (newText.length > 0 && newText.charAt(0) === '/') {
    newText = '&#47;' + newText.substring(1)
  }
  return newText
}

export function getFileNameWithoutForgottenChar(oldText) {
  var newText = oldText
  newText = newText.replace(/:/g, '_')
  newText = newText.replace(/\//g, '_')
  newText = newText.replace(/\\/g, '_')
  newText = newText.replace(/</g, '_')
  newText = newText.replace(/>/g, '_')
  newText = newText.replace(/\|/g, '_')
  newText = newText.replace(/ /g, '_')
  newText = newText.replace(/"/g, '_')
  newText = newText.replace(/'/g, '_')
  return newText.trim()
}

export function Stringformat(value, args) {
  var formatted = value
  for (var i = 0; i < args.length; i++) {
    var regexp1 = new RegExp('\\{' + i + '\\}', 'gi')
    var regexp2 = new RegExp('%' + i, 'gi')
    formatted = formatted.replace(regexp1, args[i])
    formatted = formatted.replace(regexp2, args[i])
  }
  return formatted
}

export function formatValue(value, formatNum) {
  const i18n = useI18n()
  var options = null
  var subFormat = null
  /* eslint no-prototype-builtins: 0 */
  if (value !== null && typeof value === 'object') {
    if (value.hasOwnProperty('format')) {
      subFormat = value.format
    }
    if (value.hasOwnProperty('value')) {
      value = value.value
    } else {
      value = null
    }
  }

  if (value === null) {
    value = '---'
    formatNum = ''
  }
  if (typeof formatNum === 'object') {
    if (formatNum.hasOwnProperty(value)) {
      value = formatNum[value]
    }
    formatNum = ''
  }
  if (formatNum === 'B') {
    if (value === true) {
      value = i18n.t('Yes')
    } else {
      value = i18n.t('No')
    }
  }
  if (formatNum === 'T') {
    value = new Date('1900-01-01 ' + value)
    options = { hour: '2-digit', minute: '2-digit' }
  }
  if (formatNum === 'D') {
    value = new Date(value)
    options = { year: 'numeric', month: 'long', day: 'numeric' }
  }
  if (formatNum === 'H') {
    value = new Date(value)
    options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }
  }
  if (formatNum.substr(0, 1) === 'N') {
    value = Number(value)
    options = {
      minimumFractionDigits: Number(formatNum.substr(1)),
      maximumFractionDigits: Number(formatNum.substr(1))
    }
  }
  if (formatNum.substr(0, 1) === 'C') {
    value = Number(value)
    options = {
      minimumFractionDigits: Number(formatNum.substr(1, 1)),
      maximumFractionDigits: Number(formatNum.substr(1, 1)),
      style: 'currency',
      currency: formatNum.substr(2),
      currencyDisplay: 'symbol'
    }
  }
  if (options !== null) {
    value = value.toLocaleString(i18n.locale.value, options)
  }
  if (subFormat !== null) {
    if (subFormat.search('{') !== -1) {
      value = Stringformat(subFormat, [value])
    } else {
      value = subFormat
    }
  }
  return value
}

export function formatToString(initialvalue, formatNum, formatStr) {
  var value = initialvalue
  var valIdx
  if (formatNum === null) {
    formatNum = ''
  }
  if (formatStr === null) {
    formatStr = '{0}'
  }
  if (formatStr.indexOf(';') !== -1) {
    formatStr = formatStr.split(';')
    if (Math.abs(Number(value)) < 0.00001 && formatStr.length > 2 && formatStr[2] !== '') {
      formatStr = formatStr[2]
      value = Number(value)
    } else {
      if (Number(value) < 0.00001 && formatStr.length > 1 && formatStr[1] !== '') {
        formatStr = formatStr[1]
        value = Math.abs(Number(value))
      } else {
        formatStr = formatStr[0]
      }
    }
  }
  if (Array.isArray(value)) {
    value = Array()
    for (valIdx = 0; valIdx < initialvalue.length; valIdx++) {
      value[valIdx] = formatValue(initialvalue[valIdx], formatNum)
    }
    if (formatStr.indexOf('{1}') === -1) {
      value = [value.join('{[br/]}')]
    }
  } else {
    value = [formatValue(value, formatNum)]
  }
  var res_formated
  if (formatStr.search('{') !== -1) {
    res_formated = Stringformat(formatStr, value)
  } else {
    res_formated = formatStr
  }
  return res_formated
}

export function convert_object_lowercase(old_object) {
  if (old_object == undefined) {
    return {}
  }
  if (old_object) {
    const new_object = {}
    Object.keys(old_object).forEach((key) => {
      new_object[key.toLowerCase()] = old_object[key]
    })
    return new_object
  } else {
    return old_object
  }
}

export function blobToData(blob) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.readAsDataURL(blob)
  })
}
