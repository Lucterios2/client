import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'

import LoginBox from '../LoginBox.vue'
import storage from '../../datastorage.js'
import i18n from '../../i18n.js'

describe('LoginBox', () => {
  it('login mode 0', async () => {
    storage.commit('change_server', {
      mode: 0,
      login_field: 'email',
    })
    const wrapper = shallowMount(LoginBox, {
      propsData: {
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
    expect(wrapper.find('v-card > v-card-text > v-container').element.childElementCount).toBe(2)
    expect(
      wrapper
        .find('v-card > v-card-text > v-container > v-text-field:nth-of-type(1)')
        .attributes('label')
    ).toBe('Courriel')
    expect(
      wrapper
        .find('v-card > v-card-text > v-container > v-text-field:nth-of-type(2)')
        .attributes('label')
    ).toBe('Mot de passe')

    expect(wrapper.find('v-card > v-card-actions').element.childElementCount).toBe(2)
    expect(wrapper.find('v-card > v-card-actions > v-spacer').exists()).toBe(true)
    expect(wrapper.find('v-card > v-card-actions > v-btn:nth-of-type(1)').text()).toBe('OK')
  })

  it('login mode 1', async () => {
    storage.commit('change_server', {
      mode: 1,
      login_field: 'email',
    })
    const wrapper = shallowMount(LoginBox, {
      propsData: {
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
    expect(wrapper.find('v-card > v-card-text > v-container').element.childElementCount).toBe(2)
    expect(
      wrapper
        .find('v-card > v-card-text > v-container > v-text-field:nth-of-type(1)')
        .attributes('label')
    ).toBe('Courriel')
    expect(
      wrapper
        .find('v-card > v-card-text > v-container > v-text-field:nth-of-type(2)')
        .attributes('label')
    ).toBe('Mot de passe')

    expect(wrapper.find('v-card > v-card-actions').element.childElementCount).toBe(3)
    expect(wrapper.find('v-card > v-card-actions > v-spacer').exists()).toBe(true)
    expect(wrapper.find('v-card > v-card-actions > v-btn:nth-of-type(1)').text()).toBe('Annuler')
    expect(wrapper.find('v-card > v-card-actions > v-btn:nth-of-type(2)').text()).toBe('OK')
  })

  it('login need auth', async () => {
    storage.commit('change_server', {
      mode: 0,
      login_field: 'email',
    })
    const wrapper = shallowMount(LoginBox, {
      propsData: {
        data: 'NEEDAUTH',
        actions: []
      },
      global: {
        plugins: [storage, i18n]
      }
    })
    expect(wrapper.find('v-card').element.childElementCount).toBe(3)
    expect(wrapper.find('v-card > v-card-title').text()).toBe('Connexion')
    expect(wrapper.find('v-card > v-card-text').element.childElementCount).toBe(2)
    expect(wrapper.find('v-card > v-card-text > v-alert').attributes('text')).toBe(
      'Veuillez vous identifier'
    )
    expect(wrapper.find('v-card > v-card-text > v-container').element.childElementCount).toBe(2)
    expect(wrapper.find('v-card > v-card-actions').element.childElementCount).toBe(2)
  })

  it('login bad auth', async () => {
    storage.commit('change_server', {
      mode: 0,
      login_field: 'username'
    })
    const wrapper1 = shallowMount(LoginBox, {
      propsData: {
        data: 'BADAUTH',
        actions: []
      },
      global: {
        plugins: [storage, i18n]
      }
    })
    expect(wrapper1.find('v-card').element.childElementCount).toBe(3)
    expect(wrapper1.find('v-card > v-card-title').text()).toBe('Connexion')
    expect(wrapper1.find('v-card > v-card-text').element.childElementCount).toBe(2)
    expect(wrapper1.find('v-card > v-card-text > v-alert').attributes('text')).toBe(
      'Alias ou Mot de passe incorrect!'
    )
    expect(wrapper1.find('v-card > v-card-text > v-container').element.childElementCount).toBe(2)
    expect(
      wrapper1
        .find('v-card > v-card-text > v-container > v-text-field:nth-of-type(1)')
        .attributes('label')
    ).toBe('Alias')
    expect(
      wrapper1
        .find('v-card > v-card-text > v-container > v-text-field:nth-of-type(2)')
        .attributes('label')
    ).toBe('Mot de passe')
    
    expect(wrapper1.find('v-card > v-card-actions').element.childElementCount).toBe(2)

    storage.commit('change_server', {
      mode: 0,
      login_field: 'email'
    })
    const wrapper2 = shallowMount(LoginBox, {
      propsData: {
        data: 'BADAUTH',
        actions: []
      },
      global: {
        plugins: [storage, i18n]
      }
    })
    expect(wrapper2.find('v-card > v-card-text > v-alert').attributes('text')).toBe(
      'Courriel ou Mot de passe incorrect!'
    )
    expect(wrapper2.find('v-card > v-card-text > v-container').element.childElementCount).toBe(2)
    expect(
      wrapper2
        .find('v-card > v-card-text > v-container > v-text-field:nth-of-type(1)')
        .attributes('label')
    ).toBe('Courriel')
    expect(
      wrapper2
        .find('v-card > v-card-text > v-container > v-text-field:nth-of-type(2)')
        .attributes('label')
    ).toBe('Mot de passe')
  })

  it('login only admin', async () => {
    storage.commit('change_server', {
      mode: 0,
      login_field: 'email'
    })
    const wrapper = shallowMount(LoginBox, {
      propsData: {
        data: 'ONLYADMIN',
        actions: []
      },
      global: {
        plugins: [storage, i18n]
      }
    })
    expect(wrapper.find('v-card').element.childElementCount).toBe(3)
    expect(wrapper.find('v-card > v-card-title').text()).toBe('Connexion')
    expect(wrapper.find('v-card > v-card-text').element.childElementCount).toBe(2)
    expect(wrapper.find('v-card > v-card-text > v-alert').attributes('text')).toBe(
      'Seuls les administrateurs peuvent accéder !'
    )
    expect(wrapper.find('v-card > v-card-text > v-container').element.childElementCount).toBe(2)
    expect(wrapper.find('v-card > v-card-actions').element.childElementCount).toBe(2)
  })

  it('login with action', async () => {
    storage.commit('change_server', {
      mode: 1,
      login_field: 'email'
    })
    const wrapper = shallowMount(LoginBox, {
      propsData: {
        data: '',
        actions: [
          { id: 'abc', text: 'action1', icon: 'icon1' },
          { id: 'def', text: 'action2', icon: 'icon2' }
        ]
      },
      global: {
        plugins: [storage, i18n]
      }
    })
    expect(wrapper.find('v-card').element.childElementCount).toBe(5)
    expect(wrapper.find('v-card > v-card-title').text()).toBe('Connexion')
    expect(wrapper.find('v-card > v-card-text').element.childElementCount).toBe(1)
    expect(wrapper.find('v-card > v-card-text > v-container').element.childElementCount).toBe(2)
    expect(
      wrapper
        .find('v-card > v-card-text > v-container > v-text-field:nth-of-type(1)')
        .attributes('label')
    ).toBe('Courriel')
    expect(
      wrapper
        .find('v-card > v-card-text > v-container > v-text-field:nth-of-type(2)')
        .attributes('label')
    ).toBe('Mot de passe')

    expect(wrapper.find('v-card > v-card-actions:nth-of-type(1)').element.childElementCount).toBe(1)
    expect(
      wrapper
        .find('v-card > v-card-actions:nth-of-type(1) > button-action-stub')
        .attributes('action') === undefined
    ).toBe(false)
    expect(wrapper.find('v-card > v-card-actions:nth-of-type(2)').element.childElementCount).toBe(1)
    expect(
      wrapper
        .find('v-card > v-card-actions:nth-of-type(2) > button-action-stub')
        .attributes('action') === undefined
    ).toBe(false)
    expect(wrapper.find('v-card > v-card-actions:nth-of-type(3)').element.childElementCount).toBe(3)
    expect(wrapper.find('v-card > v-card-actions:nth-of-type(3) > v-spacer').exists()).toBe(true)
    expect(
      wrapper.find('v-card > v-card-actions:nth-of-type(3) > v-btn:nth-of-type(1)').text()
    ).toBe('Annuler')
    expect(
      wrapper.find('v-card > v-card-actions:nth-of-type(3) > v-btn:nth-of-type(2)').text()
    ).toBe('OK')
  })
})
