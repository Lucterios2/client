import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import * as transport from '@/libs/transport'

import LoginBox from '@/observers/LoginBox.vue'
import ButtonAction from '@/libs/ButtonAction.vue'
import storage from '@/libs/datastorage.js'
import i18n from '@/libs/i18n.js'
import { convert_event_to_object } from '@/__tests__/tools'
import { nextTick } from 'vue'

beforeEach(() => {
  console.warn = vi.fn()
  vi.spyOn(transport, 'getUrlServer')
  transport.getUrlServer.mockImplementation(() => {
    return 'http://localhost'
  })
})

describe('LoginBox', () => {
  it('login mode 0', async () => {
    storage.commit('change_server', {
      mode: 0,
      login_field: 'email'
    })
    const wrapper = mount(LoginBox, {
      propsData: {
        connexion: {},
        data: '',
        actions: []
      },
      global: {
        plugins: [storage, i18n]
      }
    })
    expect(wrapper.find('v-card').element.childElementCount).toBe(3)
    expect(wrapper.find('v-card > v-card-title').text()).toBe('Connexion')
    expect(wrapper.find('v-card > v-card-text').element.childElementCount).toBe(1)
    expect(
      wrapper.find('v-card > v-card-text > v-form > v-container').element.childElementCount
    ).toBe(2)
    expect(
      wrapper
        .find('v-card > v-card-text > v-form > v-container > v-text-field:nth-of-type(1)')
        .attributes('label')
    ).toBe('Courriel')
    expect(
      wrapper
        .find('v-card > v-card-text > v-form > v-container > v-text-field:nth-of-type(2)')
        .attributes('label')
    ).toBe('Mot de passe')

    expect(wrapper.find('v-card > v-card-actions').element.childElementCount).toBe(2)
    expect(
      wrapper.find('v-card > v-card-actions > div:nth-of-type(1) > v-btn > v-icon').text()
    ).toStrictEqual('mdi:mdi-power')
  })

  it('login mode 1', async () => {
    storage.commit('change_server', {
      mode: 1,
      login_field: 'email'
    })
    const wrapper = mount(LoginBox, {
      propsData: {
        connexion: {},
        data: 'OK',
        actions: []
      },
      global: {
        plugins: [storage, i18n]
      }
    })
    expect(wrapper.find('v-card').element.childElementCount).toBe(3)
    expect(wrapper.find('v-card > v-card-title').text()).toBe('Connexion')
    expect(wrapper.find('v-card > v-card-text').element.childElementCount).toBe(1)
    expect(
      wrapper.find('v-card > v-card-text > v-form > v-container').element.childElementCount
    ).toBe(2)
    expect(
      wrapper
        .find('v-card > v-card-text > v-form > v-container > v-text-field:nth-of-type(1)')
        .attributes('label')
    ).toBe('Courriel')
    expect(
      wrapper
        .find('v-card > v-card-text > v-form > v-container > v-text-field:nth-of-type(2)')
        .attributes('label')
    ).toBe('Mot de passe')

    expect(wrapper.find('v-card > v-card-actions').element.childElementCount).toBe(3)
    expect(
      wrapper.find('v-card > v-card-actions > div:nth-of-type(1) > v-btn > v-icon').text()
    ).toStrictEqual('mdi:mdi-logout')
    expect(
      wrapper.find('v-card > v-card-actions > div:nth-of-type(2) > v-btn > v-icon').text()
    ).toStrictEqual('mdi:mdi-power')
  })

  it('login need auth', async () => {
    storage.commit('change_server', {
      mode: 0,
      login_field: 'email'
    })
    const wrapper = mount(LoginBox, {
      propsData: {
        connexion: {},
        data: 'NEEDAUTH',
        actions: []
      },
      global: {
        plugins: [storage, i18n]
      }
    })
    await nextTick()
    expect(wrapper.find('v-card').element.childElementCount).toBe(3)
    expect(wrapper.find('v-card > v-card-title').text()).toBe('Connexion')
    expect(wrapper.find('v-card > v-card-text').element.childElementCount).toBe(2)
    expect(wrapper.find('v-card > v-card-text > v-alert').attributes('text')).toBe(
      'Veuillez vous identifier'
    )
    expect(
      wrapper.find('v-card > v-card-text > v-form > v-container').element.childElementCount
    ).toBe(2)
    expect(wrapper.find('v-card > v-card-actions').element.childElementCount).toBe(2)
    expect(
      wrapper.find('v-card > v-card-actions > div:nth-of-type(1) > v-btn > v-icon').text()
    ).toStrictEqual('mdi:mdi-power')
  })

  it('login bad auth', async () => {
    storage.commit('change_server', {
      mode: 0,
      login_field: 'username'
    })
    const wrapper1 = mount(LoginBox, {
      propsData: {
        connexion: {},
        data: 'BADAUTH',
        actions: []
      },
      global: {
        plugins: [storage, i18n]
      }
    })
    await nextTick()
    expect(wrapper1.find('v-card').element.childElementCount).toBe(3)
    expect(wrapper1.find('v-card > v-card-title').text()).toBe('Connexion')
    expect(wrapper1.find('v-card > v-card-text').element.childElementCount).toBe(2)
    expect(wrapper1.find('v-card > v-card-text > v-alert').attributes('text')).toBe(
      'Alias ou Mot de passe incorrect!'
    )
    expect(
      wrapper1.find('v-card > v-card-text > v-form > v-container').element.childElementCount
    ).toBe(2)
    expect(
      wrapper1
        .find('v-card > v-card-text > v-form > v-container > v-text-field:nth-of-type(1)')
        .attributes('label')
    ).toBe('Alias')
    expect(
      wrapper1
        .find('v-card > v-card-text > v-form > v-container > v-text-field:nth-of-type(2)')
        .attributes('label')
    ).toBe('Mot de passe')
    expect(wrapper1.find('v-card > v-card-actions').element.childElementCount).toBe(2)
    expect(
      wrapper1.find('v-card > v-card-actions > div:nth-of-type(1) > v-btn > v-icon').text()
    ).toStrictEqual('mdi:mdi-power')

    storage.commit('change_server', {
      mode: 0,
      login_field: 'email'
    })
    const wrapper2 = mount(LoginBox, {
      propsData: {
        connexion: {},
        data: 'BADAUTH',
        actions: []
      },
      global: {
        plugins: [storage, i18n]
      }
    })
    await nextTick()
    expect(wrapper2.find('v-card > v-card-text > v-alert').attributes('text')).toBe(
      'Courriel ou Mot de passe incorrect!'
    )
    expect(
      wrapper2.find('v-card > v-card-text > v-form > v-container').element.childElementCount
    ).toBe(2)
    expect(
      wrapper2
        .find('v-card > v-card-text > v-form > v-container > v-text-field:nth-of-type(1)')
        .attributes('label')
    ).toBe('Courriel')
    expect(
      wrapper2
        .find('v-card > v-card-text > v-form > v-container > v-text-field:nth-of-type(2)')
        .attributes('label')
    ).toBe('Mot de passe')
  })

  it('login only admin', async () => {
    storage.commit('change_server', {
      mode: 0,
      login_field: 'email'
    })
    const wrapper = mount(LoginBox, {
      propsData: {
        connexion: {},
        data: 'ONLYADMIN',
        actions: []
      },
      global: {
        plugins: [storage, i18n]
      }
    })
    await nextTick()
    expect(wrapper.find('v-card').element.childElementCount).toBe(3)
    expect(wrapper.find('v-card > v-card-title').text()).toBe('Connexion')
    expect(wrapper.find('v-card > v-card-text').element.childElementCount).toBe(2)
    expect(wrapper.find('v-card > v-card-text > v-alert').attributes('text')).toBe(
      'Seuls les administrateurs peuvent accéder !'
    )
    expect(
      wrapper.find('v-card > v-card-text > v-form > v-container').element.childElementCount
    ).toBe(2)
    expect(wrapper.find('v-card > v-card-actions').element.childElementCount).toBe(2)
    expect(
      wrapper.find('v-card > v-card-actions > div:nth-of-type(1) > v-btn > v-icon').text()
    ).toStrictEqual('mdi:mdi-power')
  })

  it('login with action', async () => {
    storage.commit('change_server', {
      mode: 1,
      login_field: 'email'
    })
    const wrapper = mount(LoginBox, {
      propsData: {
        connexion: {},
        data: '',
        actions: [
          { id: 'abc', text: 'action1', short_icon: 'icon1' },
          { id: 'def', text: 'action2', short_icon: 'icon2' }
        ]
      },
      global: {
        plugins: [storage, i18n]
      }
    })
    expect(wrapper.find('v-card').element.childElementCount).toBe(3)
    expect(wrapper.find('v-card > v-card-title').text()).toBe('Connexion')
    expect(wrapper.find('v-card > v-card-text').element.childElementCount).toBe(2)
    expect(
      wrapper.find('v-card > v-card-text > v-form > v-container').element.childElementCount
    ).toBe(2)
    expect(
      wrapper
        .find('v-card > v-card-text > v-form > v-container > v-text-field:nth-of-type(1)')
        .attributes('label')
    ).toBe('Courriel')
    expect(
      wrapper
        .find('v-card > v-card-text > v-form > v-container > v-text-field:nth-of-type(2)')
        .attributes('label')
    ).toBe('Mot de passe')

    expect(
      wrapper.find('v-card > v-card-text > div.login_actions > v-card-actions:nth-of-type(1)')
        .element.childElementCount
    ).toBe(1)
    expect(
      wrapper
        .find(
          'v-card > v-card-text > div.login_actions > v-card-actions:nth-of-type(1) > v-btn > v-icon'
        )
        .text()
    ).toStrictEqual('icon1')
    expect(
      wrapper.find('v-card > v-card-text > div.login_actions > v-card-actions:nth-of-type(2)')
        .element.childElementCount
    ).toBe(1)
    expect(
      wrapper
        .find(
          'v-card > v-card-text > div.login_actions > v-card-actions:nth-of-type(2) > v-btn > v-icon'
        )
        .text()
    ).toStrictEqual('icon2')
    expect(wrapper.find('v-card > v-card-actions').element.childElementCount).toBe(3)
    expect(
      wrapper.find('v-card > v-card-actions > div:nth-of-type(1) > v-btn > v-icon').text()
    ).toStrictEqual('mdi:mdi-logout')
    expect(
      wrapper.find('v-card > v-card-actions > div:nth-of-type(2) > v-btn > v-icon').text()
    ).toStrictEqual('mdi:mdi-power')

    expect(wrapper.emitted('clickaction')).toStrictEqual(undefined)
    await wrapper
      .find('v-card > v-card-text > div.login_actions > v-card-actions:nth-of-type(1) > v-btn')
      .trigger('click')
    expect(convert_event_to_object(wrapper.emitted('clickaction'))).toStrictEqual([
      [{ id: 'abc', text: 'action1', short_icon: 'icon1' }]
    ])
  })

  it('Button short icon', async () => {
    const wrapper = shallowMount(ButtonAction, {
      propsData: {
        action: { id: 'abc', text: 'action1', short_icon: 'icon1' }
      },
      global: {
        plugins: [storage, i18n]
      }
    })
    expect(wrapper.find('v-btn').element.childElementCount).toBe(2)
    expect(wrapper.find('v-btn').attributes('disabled')).toBe('false')
    expect(wrapper.find('v-btn > v-icon').text()).toBe('icon1')
    expect(wrapper.find('v-btn > span').text()).toBe('action1')
    expect(wrapper.emitted('click')).toStrictEqual(undefined)
    await wrapper.trigger('click', { id: 'abc' })
    expect(wrapper.emitted('click')).toStrictEqual([
      [{ id: 'abc', text: 'action1', short_icon: 'icon1' }]
    ])
    await wrapper.setProps({
      action: { id: 'abc', text: 'action1', icon: 'icon1', disabled: true }
    })
    expect(wrapper.find('v-btn').attributes('disabled')).toBe('true')
    await wrapper.setProps({
      action: { id: 'abc', text: 'action1', icon: 'icon1', disabled: false }
    })
    expect(wrapper.find('v-btn').attributes('disabled')).toBe('false')
  })

  it('Button long icon', async () => {
    const wrapper = shallowMount(ButtonAction, {
      propsData: {
        action: { id: 'abc', text: 'action1', icon: '/icon1' }
      },
      global: {
        plugins: [storage, i18n]
      }
    })
    expect(wrapper.find('v-btn').element.childElementCount).toBe(2)
    expect(wrapper.find('v-btn').attributes('disabled')).toBe('false')
    expect(wrapper.find('v-btn > img').attributes('src')).toBe('http://localhost/icon1')
    expect(wrapper.find('v-btn > span').text()).toBe('action1')
    expect(wrapper.emitted('click')).toStrictEqual(undefined)
    await wrapper.trigger('click', { id: 'abc' })
    expect(wrapper.emitted('click')).toStrictEqual([
      [{ id: 'abc', text: 'action1', icon: '/icon1' }]
    ])
    await wrapper.setProps({
      action: { id: 'abc', text: 'action1', icon: 'icon1', disabled: true }
    })
    expect(wrapper.find('v-btn').attributes('disabled')).toBe('true')
    await wrapper.setProps({
      action: { id: 'abc', text: 'action1', icon: 'icon1', disabled: false }
    })
    expect(wrapper.find('v-btn').attributes('disabled')).toBe('false')
  })
})
