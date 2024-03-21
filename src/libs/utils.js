export function openBlob(aBlob, aFileName) {
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(aBlob, aFileName)
  } else if (URL.createObjectURL) {
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

export function send_to_support(i18n_t, store, complement, url_server) {
  if (complement === undefined) {
    complement = i18n_t('support_body')
  } else {
    complement = i18n_t('support_body') + complement
  }
  complement += '__________________________________________\n'
  complement += '#### ' + store.state.server.title + ' ####\n'
  complement += i18n_t('version') + ' : ' + store.state.server.version + '\n'
  complement += i18n_t('server') + ' : ' + store.state.server.serverversion + '\n'
  complement += i18n_t('client') + ' : ' + store.state.server.clientversion + '\n'
  complement +=
    i18n_t('Connection') +
    ' : ' +
    store.state.server.login +
    '@' +
    store.state.server.instance +
    '\n'
  complement += url_server + '\n'
  complement += store.state.server.copyright + '\n'
  complement += '__________________________________________\n'
  complement +=
    store.state.server.info_server.join('\n').replaceAll('{[i]}', '').replaceAll('{[/i]}', '') +
    '\n'

  var url = 'mailto:' + store.state.server.support_email
  url += '?subject=' + encodeURIComponent(i18n_t('support_subject'))
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

export function insertStyle(rule) {
  var css = document.createElement('style')
  css.type = 'text/css'
  css.innerHTML = rule
  document.body.appendChild(css)
}

export const CLOSE_NO = 0
export const CLOSE_YES = 1
export const FORMTYPE_NOMODAL = 0
export const FORMTYPE_MODAL = 1
export const FORMTYPE_REFRESH = 2
export const SELECT_NONE = 1
export const SELECT_SINGLE = 0
export const SELECT_MULTI = 2
export const NULL_VALUE = 'NULL'

export function refreshAction(meta, default_params) {
  return {
    id: meta.id || meta.extension + '/' + meta.action,
    extension: meta.extension,
    action: meta.action,
    modal: FORMTYPE_REFRESH,
    close: CLOSE_NO,
    unique: SELECT_NONE,
    method: meta.method,
    params: default_params || {}
  }
}

var singletonObj = null

class SingletonClass {
  constructor() {}

  close() {}
}

export function singletonClose() {
  if (singletonObj !== null) {
    singletonObj.close()
  }
  singletonObj = null
}

export function singleton() {
  if (singletonObj === null) {
    singletonObj = new Proxy(new SingletonClass(), {
      get(target, name, receiver) {
        if (!Reflect.has(target, name)) {
          return undefined
        }
        return Reflect.get(target, name, receiver)
      },
      set(target, name, value, receiver) {
        return Reflect.set(target, name, value, receiver)
      }
    })
  }
  return singletonObj
}
