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
    expect(wrapper.element.childElementCount).toBe(2)
    expect(wrapper.find('v-row:nth-of-type(1)').element.childElementCount).toBe(0)
    expect(wrapper.find('v-row:nth-of-type(2)').element.childElementCount).toBe(0)
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
      expect(wrapper.element.childElementCount).toBe(2)
      expect(wrapper.find('v-row:nth-of-type(1)').element.childElementCount).toBe(1)
      expect(wrapper.find('v-row:nth-of-type(1) > status-bar-stub').text()).toBe('')
      expect(wrapper.find('v-row:nth-of-type(2)').element.childElementCount).toBe(0)
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
      expect(wrapper.element.childElementCount).toBe(3)
      expect(wrapper.find('v-row:nth-of-type(1)').element.childElementCount).toBe(0)
      expect(wrapper.find('v-row:nth-of-type(2)').element.childElementCount).toBe(0)
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
      expect(wrapper.element.childElementCount).toBe(2)
      expect(wrapper.find('v-row:nth-of-type(1)').element.childElementCount).toBe(0)
      expect(wrapper.find('v-row:nth-of-type(2)').element.childElementCount).toBe(1)
      expect(wrapper.find('v-row:nth-of-type(2) > main-menu-stub').text()).toBe('')
      expect(
        wrapper.find('v-row:nth-of-type(2) > main-menu-stub').getCurrentComponent().props.data
          .length
      ).toStrictEqual(4)
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
      expect(wrapper.element.childElementCount).toBe(3)
      expect(wrapper.find('v-row:nth-of-type(1)').element.childElementCount).toBe(0)
      expect(wrapper.find('v-row:nth-of-type(2)').element.childElementCount).toBe(0)
      expect(wrapper.get('waiting-frame-stub').text()).toBe('')
    })
})
