export function makeDialogsMovable() {
  // make vuetify dialogs movable
  const dialog_box = {}
  document.addEventListener('mousedown', (event) => {
    const closestDialog = event.target.closest('.v-dialog.v-dialog--active')
    if (
      event.button === 0 &&
      closestDialog != null &&
      event.target.classList.contains('v-card__title')
    ) {
      // element which can be used to move element
      dialog_box.el = closestDialog // element which should be moved
      dialog_box.mouseStartX = event.clientX
      dialog_box.mouseStartY = event.clientY
      dialog_box.elStartX = dialog_box.el.getBoundingClientRect().left
      dialog_box.elStartY = dialog_box.el.getBoundingClientRect().top
      dialog_box.el.style.position = 'fixed'
      dialog_box.el.style.margin = 0
      dialog_box.oldTransition = dialog_box.el.style.transition
      dialog_box.el.style.transition = 'none'
    }
  })
  document.addEventListener('mousemove', (event) => {
    if (dialog_box.el === undefined) return
    dialog_box.el.style.left =
      Math.min(
        Math.max(dialog_box.elStartX + event.clientX - dialog_box.mouseStartX, 0),
        window.innerWidth - dialog_box.el.getBoundingClientRect().width
      ) + 'px'
    dialog_box.el.style.top =
      Math.min(
        Math.max(dialog_box.elStartY + event.clientY - dialog_box.mouseStartY, 0),
        window.innerHeight - dialog_box.el.getBoundingClientRect().height
      ) + 'px'
  })
  document.addEventListener('mouseup', () => {
    if (dialog_box.el === undefined) return
    dialog_box.el.style.transition = dialog_box.oldTransition
    dialog_box.el = undefined
  })
  setInterval(() => {
    // prevent out of bounds
    const dialog = document.querySelector('.v-dialog.v-dialog--active')
    if (dialog === null) return
    dialog.style.left =
      Math.min(
        parseInt(dialog.style.left),
        window.innerWidth - dialog.getBoundingClientRect().width
      ) + 'px'
    dialog.style.top =
      Math.min(
        parseInt(dialog.style.top),
        window.innerHeight - dialog.getBoundingClientRect().height
      ) + 'px'
  }, 100)
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
