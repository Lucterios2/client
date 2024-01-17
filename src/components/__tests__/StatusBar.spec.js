import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'

import StatusBar from '../StatusBar.vue'
import storage from '../../datastorage.js'

describe('StatusBar', () => {
  it('menu mode 0', async () => {
    storage.commit('change_server', {
      login: 'toto',
      instance_name: 'foo',
      logo_iconname: 'logo.png',
      mode: 0
    })

    const wrapper = shallowMount(StatusBar, {
      global: {
        plugins: [storage]
      }
    })
    expect(wrapper.find('v-app-bar-title').exists()).toBe(true)
    expect(wrapper.get('v-app-bar-title').text()).toBe('toto@foo')
    expect(wrapper.get('v-img').attributes('src')).toBe('logo.png')
    expect(wrapper.findAll('v-list-item-title').length).toBe(4)
    expect(wrapper.findAll('v-list-item-title').at(0).text()).toBe('Refresh')
    expect(wrapper.findAll('v-list-item-title > v-icon').at(0).attributes('icon')).toBe(
      'mdi:mdi-refresh'
    )
    expect(wrapper.findAll('v-list-item-title').at(1).text()).toBe('Help')
    expect(wrapper.findAll('v-list-item-title > v-icon').at(1).attributes('icon')).toBe(
      'mdi:mdi-help'
    )
    expect(wrapper.findAll('v-list-item-title').at(2).text()).toBe('About ...')
    expect(wrapper.findAll('v-list-item-title > v-icon').at(2).attributes('icon')).toBe(
      'mdi:mdi-information-variant'
    )
    expect(wrapper.findAll('v-list-item-title').at(3).text()).toBe('Logoff')
    expect(wrapper.findAll('v-list-item-title > v-icon').at(3).attributes('icon')).toBe(
      'mdi:mdi-logout'
    )
    await wrapper.findAll('v-list-item-title').at(0).trigger('click')
    expect(wrapper.emitted('refresh')).toStrictEqual([[]])
    await wrapper.findAll('v-list-item-title').at(1).trigger('click')
    expect(wrapper.emitted('help')).toStrictEqual([[]])
    await wrapper.findAll('v-list-item-title').at(2).trigger('click')
    expect(wrapper.emitted('about')).toStrictEqual([[]])
    await wrapper.findAll('v-list-item-title').at(3).trigger('click')
    expect(wrapper.emitted('logoff')).toStrictEqual([[]])
  }),
    it('menu mode 1', async () => {
      storage.commit('change_server', {
        login: '',
        instance_name: 'foo',
        logo_iconname: 'logo.png',
        mode: 1
      })

      const wrapper = shallowMount(StatusBar, {
        global: {
          plugins: [storage]
        }
      })
      expect(wrapper.find('v-app-bar-title').exists()).toBe(false)
      expect(wrapper.get('v-img').attributes('src')).toBe('logo.png')
      expect(wrapper.findAll('v-list-item-title').length).toBe(4)
      expect(wrapper.findAll('v-list-item-title').at(0).text()).toBe('Refresh')
      expect(wrapper.findAll('v-list-item-title > v-icon').at(0).attributes('icon')).toBe(
        'mdi:mdi-refresh'
      )
      expect(wrapper.findAll('v-list-item-title').at(1).text()).toBe('Help')
      expect(wrapper.findAll('v-list-item-title > v-icon').at(1).attributes('icon')).toBe(
        'mdi:mdi-help'
      )
      expect(wrapper.findAll('v-list-item-title').at(2).text()).toBe('About ...')
      expect(wrapper.findAll('v-list-item-title > v-icon').at(2).attributes('icon')).toBe(
        'mdi:mdi-information-variant'
      )
      expect(wrapper.findAll('v-list-item-title').at(3).text()).toBe('Login')
      expect(wrapper.findAll('v-list-item-title > v-icon').at(3).attributes('icon')).toBe(
        'mdi:mdi-login'
      )

      expect(wrapper.emitted('login')).toStrictEqual(undefined)
      await wrapper.findAll('v-list-item-title').at(3).trigger('click')
      expect(wrapper.emitted('login')).toStrictEqual([[]])
    }),
    it('menu mode 1 logged', () => {
      storage.commit('change_server', {
        login: 'toto',
        instance_name: 'foo',
        logo_iconname: 'logo.png',
        mode: 1
      })

      const wrapper = shallowMount(StatusBar, {
        global: {
          plugins: [storage]
        }
      })
      expect(wrapper.find('v-app-bar-title').exists()).toBe(true)
      expect(wrapper.get('v-app-bar-title').text()).toBe('toto@foo')
      expect(wrapper.get('v-img').attributes('src')).toBe('logo.png')
      expect(wrapper.findAll('v-list-item-title').length).toBe(4)
      expect(wrapper.findAll('v-list-item-title').at(0).text()).toBe('Refresh')
      expect(wrapper.findAll('v-list-item-title > v-icon').at(0).attributes('icon')).toBe(
        'mdi:mdi-refresh'
      )
      expect(wrapper.findAll('v-list-item-title').at(1).text()).toBe('Help')
      expect(wrapper.findAll('v-list-item-title > v-icon').at(1).attributes('icon')).toBe(
        'mdi:mdi-help'
      )
      expect(wrapper.findAll('v-list-item-title').at(2).text()).toBe('About ...')
      expect(wrapper.findAll('v-list-item-title > v-icon').at(2).attributes('icon')).toBe(
        'mdi:mdi-information-variant'
      )
      expect(wrapper.findAll('v-list-item-title').at(3).text()).toBe('Logoff')
      expect(wrapper.findAll('v-list-item-title > v-icon').at(3).attributes('icon')).toBe(
        'mdi:mdi-logout'
      )
    }),
    it('menu mode 2', () => {
      storage.commit('change_server', {
        login: '',
        instance_name: 'foo',
        logo_iconname: 'logo.png',
        mode: 2
      })

      const wrapper = shallowMount(StatusBar, {
        global: {
          plugins: [storage]
        }
      })
      expect(wrapper.find('v-app-bar-title').exists()).toBe(false)
      expect(wrapper.get('v-img').attributes('src')).toBe('logo.png')
      expect(wrapper.findAll('v-list-item-title').length).toBe(3)
      expect(wrapper.findAll('v-list-item-title').at(0).text()).toBe('Refresh')
      expect(wrapper.findAll('v-list-item-title > v-icon').at(0).attributes('icon')).toBe(
        'mdi:mdi-refresh'
      )
      expect(wrapper.findAll('v-list-item-title').at(1).text()).toBe('Help')
      expect(wrapper.findAll('v-list-item-title > v-icon').at(1).attributes('icon')).toBe(
        'mdi:mdi-help'
      )
      expect(wrapper.findAll('v-list-item-title').at(2).text()).toBe('About ...')
      expect(wrapper.findAll('v-list-item-title > v-icon').at(2).attributes('icon')).toBe(
        'mdi:mdi-information-variant'
      )
    }),
    it('click summary', () => {
      storage.commit('call_summary', false)
      expect(storage.state.show_summary).toBe(false)

      const wrapper = shallowMount(StatusBar, {
        global: {
          plugins: [storage]
        }
      })
      const addSummaryBtn = wrapper.find('v-app-bar-nav-icon')
      addSummaryBtn.trigger('click')
      expect(storage.state.show_summary).toBe(true)
      addSummaryBtn.trigger('click')
      expect(storage.state.show_summary).toBe(false)
    })
})
