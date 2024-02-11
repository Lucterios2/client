export function openBlob(aBlob, aFileName) {
  if (window.navigator.msSaveOrOpenBlob) {
    console.log('>>> window.navigator.msSaveOrOpenBlob')
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

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function convertLuctoriosFormatToHtml(oldText) {
  var newText = oldText.replace('>', '&gt;')
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
