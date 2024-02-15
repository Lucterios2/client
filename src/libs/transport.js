import { useStore } from 'vuex'

import {
  example_logon_actions,
  example_menu_data,
  example_server_data,
  response_to_ident
} from '@/__tests__/tools'
import { FORMTYPE_NOMODAL, sleep } from './utils'

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
  console.log('CALL ACTION', action, call_result)
  current_store.commit('call_waiting', false)
  return call_result
}
