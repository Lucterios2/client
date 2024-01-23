import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'

import App from '../App.vue'
import storage from '../datastorage.js'
import i18n from '../i18n.js'

describe('App', () => {
  it('empty', () => {
    storage.commit('call_status', false)
    storage.commit('call_login', false)
    storage.commit('call_menu', false)
    storage.commit('call_waiting', false)

    const wrapper = shallowMount(App, {
      global: {
        plugins: [storage, i18n]
      }
    })
    expect(wrapper.element.childElementCount).toBe(0)
  }),
    it('status', () => {
      storage.commit('call_status', true)
      storage.commit('call_login', false)
      storage.commit('call_menu', false)
      storage.commit('call_waiting', false)

      const wrapper = shallowMount(App, {
        global: {
          plugins: [storage, i18n]
        }
      })
      expect(wrapper.element.childElementCount).toBe(1)
      expect(wrapper.get('status-bar-stub').text()).toBe('')
    }),
    it('login', () => {
      storage.commit('call_status', false)
      storage.commit('call_login', true)
      storage.commit('call_menu', false)
      storage.commit('call_waiting', false)

      const wrapper = shallowMount(App, {
        global: {
          plugins: [storage, i18n]
        }
      })
      expect(wrapper.element.childElementCount).toBe(1)
      expect(wrapper.get('login-box-stub').text()).toBe('')
    }),
    it('menu', () => {
      storage.commit('call_status', false)
      storage.commit('call_login', false)
      storage.commit('call_menu', true)
      storage.commit('call_waiting', false)

      const wrapper = shallowMount(App, {
        global: {
          plugins: [storage, i18n]
        }
      })
      expect(wrapper.element.childElementCount).toBe(1)
      expect(wrapper.get('main-menu-stub').text()).toBe('')
    }),
    it('waiting', () => {
      storage.commit('call_status', false)
      storage.commit('call_login', false)
      storage.commit('call_menu', false)
      storage.commit('call_waiting', true)

      const wrapper = shallowMount(App, {
        global: {
          plugins: [storage, i18n]
        }
      })
      expect(wrapper.element.childElementCount).toBe(1)
      expect(wrapper.get('waiting-frame-stub').text()).toBe('')
    })
})
