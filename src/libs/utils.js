import { useI18n } from 'vue-i18n'

export function openBlob(aBlob, aFileName) {
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(aBlob, aFileName)
  } else {
    const hyperlink = document.createElement('a')
    hyperlink.href = URL.createObjectURL(aBlob)
    hyperlink.target = '_blank'
    hyperlink.download = aFileName
    const mouseEvent = new MouseEvent('click', {
      canBubble: true,
      cancelable: true,
      view: window,
      detail: 0,
      screenX: 0,
      screenY: 0,
      clientX: 80,
      clientY: 20,
      ctrlKey: false,
      altKey: false,
      shiftKey: false,
      metaKey: false,
      button: 0,
      relatedTarget: null
    })
    hyperlink.dispatchEvent(mouseEvent)
    if (window.URL) {
      window.URL.revokeObjectURL(hyperlink.href)
    } else if (window.webkitURL) {
      window.webkitURL.revokeObjectURL(hyperlink.href)
    }
  }
}

export function first_element_by_class(root_element, classname) {
  var ret_element = null
  Array.from(root_element.getElementsByClassName(classname)).forEach((item) => {
    ret_element = item
  })
  return ret_element
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function convertLuctoriosFormatToHtml(oldText) {
  var newText = String(oldText).replace('>', '&gt;')
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
    var regexp = new RegExp('\\{' + i + '\\}', 'gi')
    formatted = formatted.replace(regexp, args[i])
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
  if (formatStr.search('{') !== -1) {
    return Stringformat(formatStr, value)
  } else {
    return formatStr
  }
}

export function send_to_support(i18n, store, complement) {
  if (complement === undefined) {
    complement = i18n.t('support_body')
  } else {
    complement = i18n.t('support_body') + complement
  }
  complement += '__________________________________________\n'
  complement += '#### ' + store.state.server.title + ' ####\n'
  complement += i18n.t('version') + ' : ' + store.state.server.applis_version + '\n'
  complement += i18n.t('server') + ' : ' + store.state.server.applis_version + '\n'
  complement += i18n.t('client') + ' : ' + store.state.server.version_current + '\n'
  complement +=
    i18n.t('Connection') +
    ' : ' +
    store.state.server.login +
    '@' +
    store.state.server.instance_name +
    '\n'
  complement += window.location.href + '\n'
  complement += store.state.server.copy_rigth + '\n'
  complement += '__________________________________________\n'
  complement +=
    store.state.server.info_server.join('\n').replaceAll('<i>', '').replaceAll('</i>', '') + '\n'

  var url = 'mailto:' + store.state.server.support_email
  url += '?subject=' + encodeURIComponent(i18n.t('support_subject'))
  url += '&body=' + encodeURIComponent(complement)
  window.location = url
}

export function part_for_email(title, value) {
  if (value !== '') {
    return (
      '**' +
      title +
      '**\n' +
      value.replaceAll('{[br/]}', '\n').replaceAll('{[br]}', '\n').trim() +
      '\n\n'
    )
  }
  return ''
}
