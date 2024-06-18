import { describe, it, expect, beforeEach, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'

import StatusBar from '@/libs/StatusBar.vue'
import storage from '@/libs/datastorage.js'
import i18n from '@/libs/i18n.js'

beforeEach(() => {
  console.warn = vi.fn()
})

describe('StatusBar', () => {
  it('menu mode 0', async () => {
    storage.commit('change_server', {
      login: 'toto',
      instance: 'foo',
      realname: 'Toto',
      logoname: 'logo.png',
      mode: 0
    })

    const wrapper = shallowMount(StatusBar, {
      global: {
        plugins: [storage, i18n]
      }
    })
    expect(wrapper.find('v-app-bar-title').exists()).toBe(true)
    expect(wrapper.get('v-app-bar-title').text()).toBe('Toto (toto@foo)')
    expect(wrapper.get('v-img').attributes('src')).toBe('logo.png')
    expect(wrapper.findAll('v-btn').length).toBe(4)
    expect(wrapper.findAll('v-btn > v-tooltip').at(0).text()).toBe('Rafraichir')
    expect(wrapper.findAll('v-btn > v-icon').at(0).attributes('icon')).toBe('mdi:mdi-refresh')
    expect(wrapper.findAll('v-btn > v-tooltip').at(1).text()).toBe('Aide')
    expect(wrapper.findAll('v-btn > v-icon').at(1).attributes('icon')).toBe('mdi:mdi-help')
    expect(wrapper.findAll('v-btn > v-tooltip').at(2).text()).toBe('A propos...')
    expect(wrapper.findAll('v-btn > v-icon').at(2).attributes('icon')).toBe(
      'mdi:mdi-information-variant'
    )
    expect(wrapper.findAll('v-btn > v-tooltip').at(3).text()).toBe('Déconnexion')
    expect(wrapper.findAll('v-btn > v-icon').at(3).attributes('icon')).toBe('mdi:mdi-logout')
    await wrapper.findAll('v-btn').at(0).trigger('click')
    expect(wrapper.emitted('refresh')).toStrictEqual([[]])
    await wrapper.findAll('v-btn').at(1).trigger('click')
    expect(wrapper.emitted('help')).toStrictEqual([[]])
    await wrapper.findAll('v-btn').at(2).trigger('click')
    expect(wrapper.emitted('about')).toStrictEqual([[]])
    await wrapper.findAll('v-btn').at(3).trigger('click')
    expect(wrapper.emitted('logoff')).toStrictEqual([[]])
  }),
    it('menu mode 1', async () => {
      storage.commit('change_server', {
        login: '',
        instance: 'foo',
        logoname: 'logo.png',
        mode: 1
      })

      const wrapper = shallowMount(StatusBar, {
        global: {
          plugins: [storage, i18n]
        }
      })
      expect(wrapper.find('v-app-bar-title').exists()).toBe(false)
      expect(wrapper.get('v-img').attributes('src')).toBe('logo.png')
      expect(wrapper.findAll('v-btn').length).toBe(4)
      expect(wrapper.findAll('v-btn > v-tooltip').at(0).text()).toBe('Rafraichir')
      expect(wrapper.findAll('v-btn > v-icon').at(0).attributes('icon')).toBe('mdi:mdi-refresh')
      expect(wrapper.findAll('v-btn > v-tooltip').at(1).text()).toBe('Aide')
      expect(wrapper.findAll('v-btn > v-icon').at(1).attributes('icon')).toBe('mdi:mdi-help')
      expect(wrapper.findAll('v-btn > v-tooltip').at(2).text()).toBe('A propos...')
      expect(wrapper.findAll('v-btn > v-icon').at(2).attributes('icon')).toBe(
        'mdi:mdi-information-variant'
      )
      expect(wrapper.findAll('v-btn > v-tooltip').at(3).text()).toBe('Connexion')
      expect(wrapper.findAll('v-btn > v-icon').at(3).attributes('icon')).toBe('mdi:mdi-login')

      expect(wrapper.emitted('logoff')).toStrictEqual(undefined)
      await wrapper.findAll('v-btn').at(3).trigger('click')
      expect(wrapper.emitted('logoff')).toStrictEqual([[]])
    }),
    it('menu mode 1 logged', () => {
      storage.commit('change_server', {
        login: 'toto',
        instance: 'foo',
        realname: 'Toto',
        logoname: 'logo.png',
        mode: 1
      })

      const wrapper = shallowMount(StatusBar, {
        global: {
          plugins: [storage, i18n]
        }
      })
      expect(wrapper.find('v-app-bar-title').exists()).toBe(true)
      expect(wrapper.get('v-app-bar-title').text()).toBe('Toto (toto@foo)')
      expect(wrapper.get('v-img').attributes('src')).toBe('logo.png')
      expect(wrapper.findAll('v-btn').length).toBe(4)
      expect(wrapper.findAll('v-btn > v-tooltip').at(0).text()).toBe('Rafraichir')
      expect(wrapper.findAll('v-btn > v-icon').at(0).attributes('icon')).toBe('mdi:mdi-refresh')
      expect(wrapper.findAll('v-btn > v-tooltip').at(1).text()).toBe('Aide')
      expect(wrapper.findAll('v-btn > v-icon').at(1).attributes('icon')).toBe('mdi:mdi-help')
      expect(wrapper.findAll('v-btn > v-tooltip').at(2).text()).toBe('A propos...')
      expect(wrapper.findAll('v-btn > v-icon').at(2).attributes('icon')).toBe(
        'mdi:mdi-information-variant'
      )
      expect(wrapper.findAll('v-btn > v-tooltip').at(3).text()).toBe('Déconnexion')
      expect(wrapper.findAll('v-btn > v-icon').at(3).attributes('icon')).toBe('mdi:mdi-logout')
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
          plugins: [storage, i18n]
        }
      })
      expect(wrapper.find('v-app-bar-title').exists()).toBe(false)
      expect(wrapper.get('v-img').attributes('src')).toBe('logo.png')
      expect(wrapper.findAll('v-btn').length).toBe(3)
      expect(wrapper.findAll('v-btn > v-tooltip').at(0).text()).toBe('Rafraichir')
      expect(wrapper.findAll('v-btn > v-icon').at(0).attributes('icon')).toBe('mdi:mdi-refresh')
      expect(wrapper.findAll('v-btn > v-tooltip').at(1).text()).toBe('Aide')
      expect(wrapper.findAll('v-btn > v-icon').at(1).attributes('icon')).toBe('mdi:mdi-help')
      expect(wrapper.findAll('v-btn > v-tooltip').at(2).text()).toBe('A propos...')
      expect(wrapper.findAll('v-btn > v-icon').at(2).attributes('icon')).toBe(
        'mdi:mdi-information-variant'
      )
    }),
    it('click summary', () => {
      storage.commit('call_summary', false)
      expect(storage.state.show_summary).toBe(false)

      const wrapper = shallowMount(StatusBar, {
        global: {
          plugins: [storage, i18n]
        }
      })
      const addSummaryBtn = wrapper.find('v-app-bar-nav-icon')
      addSummaryBtn.trigger('click')
      expect(storage.state.show_summary).toBe(true)
      addSummaryBtn.trigger('click')
      expect(storage.state.show_summary).toBe(false)
    })
})
