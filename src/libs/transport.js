import { useStore } from 'vuex'

import {
  example_logon_actions,
  example_menu_data,
  example_server_data,
  response_to_ident
} from '@/__tests__/tools'
import { FORMTYPE_NOMODAL, convertToBytes, sleep } from './utils'
import { image_compress, image_normal } from '../__tests__/tools'

var current_store = null

export function initialTransport() {
  current_store = useStore()
}

export async function callLucteriosAction(action) {
  current_store.commit('call_waiting', true)
  var call_result = { meta: {} }
  if (action.id == 'CORE/authentification' || action.id == 'CORE/exitConnection') {
    call_result = {
      connexion: example_server_data,
      data: '',
      actions: example_logon_actions,
      meta: {
        extension: 'CORE',
        title: 'info',
        action: 'authentification',
        observer: 'core.auth'
      }
    }
    if (action.params === undefined) {
      action.params = {}
    }
    if (action.params.info === true) {
      call_result.data = 'OK'
    } else if (action.params.login === undefined) {
      call_result.data = ''
    } else if (action.params.login === action.params.password) {
      await sleep(2 * 1000)
      call_result.data = action.params.login == 'x' ? 'NEEDAUTH' : 'OK'
    } else {
      call_result.data = 'BADAUTH'
    }
  } else if (action.id == 'CORE/menu') {
    call_result = {
      menus: example_menu_data,
      meta: {
        extension: 'CORE',
        title: 'menu',
        action: 'menu',
        observer: 'core.menu'
      }
    }
  } else if (response_to_ident[action.id] !== undefined) {
    await sleep(500)
    call_result = response_to_ident[action.id]
  }
  call_result.meta.ismodal = Number(action.modal) == FORMTYPE_NOMODAL
  call_result.meta.method = action.method
  console.log('CALL ACTION', action, call_result)
  current_store.commit('call_waiting', false)
  return call_result
}

export async function getFileContent(url) {
  console.log('GET_FILE_CONTENT', url)
  var stream_content = null
  if (url.endsWith('document_1')) {
    stream_content = convertToBytes(window.atob(image_normal.replaceAll('\n', '')))
  } else {
    stream_content = convertToBytes(window.atob(image_compress.replaceAll('\n', '')))
  }
  const new_blob = new Blob(stream_content)
  await sleep(500)
  return new_blob
}
