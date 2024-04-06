import axios from 'axios'

import { FORMTYPE_MODAL } from '@/libs/utils'
import { Stringformat } from '@/libs/convert'
import { CRITIC, GRAVE, LucteriosException } from '@/libs/error'

var current_store = null
var current_translate = null

export function initialTransport(store, translate) {
  current_store = store
  current_translate = translate
}

var server_url = null

export function getUrlServer() {
  if (server_url == null) {
    var server_url_items = window.location.href.split('/')
    if (
      server_url_items[server_url_items.length - 1] == 'index.html' ||
      server_url_items[server_url_items.length - 1] == ''
    ) {
      server_url_items = server_url_items.slice(0, server_url_items.length - 2)
    }
    server_url = server_url_items.join('/')
  }
  return server_url
}

export async function callLucteriosAction(action) {
  var reponsetext = ''
  var web_file = action.id
  if (action.extension && action.action) {
    web_file = action.extension + '/' + action.action
  }
  var fullurl = getUrlServer() + '/' + web_file
  const formData = new FormData()
  if (action.method === undefined) {
    action.method = 'GET'
  }
  if (action.params) {
    if (action.method === 'GET' || action.method === 'DELETE') {
      var parts = []
      Object.keys(action.params).forEach(function (key) {
        parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(action.params[key]))
      })
      if (parts.length > 0) {
        fullurl += '?' + parts.join('&')
      }
    } else {
      Object.keys(action.params).forEach(function (key) {
        formData.append(key, action.params[key])
      })
    }
  }

  const success = function (response) {
    reponsetext = response.data
  }
  const failure = function (error) {
    reponsetext = JSON.stringify(error)
    if (error.response !== undefined) {
      if (error.response.status === 404) {
        throw new LucteriosException(
          GRAVE,
          current_translate.t('Command unknown!'),
          web_file,
          reponsetext
        )
      } else {
        throw new LucteriosException(
          CRITIC,
          Stringformat(current_translate.t('Http error {0}'), [error.response.status]),
          web_file,
          reponsetext
        )
      }
    } else {
      throw new LucteriosException(
        CRITIC,
        current_translate.t('Internal error !'),
        web_file,
        reponsetext
      )
    }
  }
  current_store.commit('call_waiting', true)
  try {
    if (action.method === 'GET') {
      await axios.get(fullurl).then(success).catch(failure)
    } else if (action.method === 'POST') {
      await axios.post(fullurl, formData).then(success).catch(failure)
    } else if (action.method === 'PUT') {
      await axios.put(fullurl, formData).then(success).catch(failure)
    } else if (action.method === 'DELETE') {
      await axios.delete(fullurl).then(success).catch(failure)
    } else {
      throw new LucteriosException(
        GRAVE,
        Stringformat(current_translate.t('Method "{0}" unknown !'), [action.method]),
        web_file
      )
    }
  } finally {
    current_store.commit('call_waiting', false)
  }
  reponsetext.meta.ismodal =
    ['core.dialogbox', 'core.custom'].includes(reponsetext.meta.observer) &&
    (action.modal == undefined || Number(action.modal) == FORMTYPE_MODAL)
  reponsetext.meta.method = action.method
  if (reponsetext.meta.id == undefined && reponsetext.meta.extension) {
    reponsetext.meta.id = reponsetext.meta.extension + '/' + reponsetext.meta.action
  }
  return reponsetext
}

export async function getFileContent(url) {
  var result = null
  current_store.commit('call_waiting', true)
  try {
    await axios
      .post(getUrlServer() + (url.startsWith('/') ? url : '/' + url), null, {
        responseType: 'blob'
      })
      .then(function (data) {
        result = data
      })
      .catch(function (error) {
        throw new LucteriosException(GRAVE, error)
      })
  } finally {
    current_store.commit('call_waiting', false)
  }
  return result
}
