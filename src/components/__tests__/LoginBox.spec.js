import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'

import LoginBox from '../LoginBox.vue'
import storage from '../../datastorage.js'

describe('LoginBox', () => {
  it('login mode 0', async () => {
    storage.commit('change_server', {
      mode: 0
    })
    const wrapper = shallowMount(LoginBox, {
      global: {
        plugins: [storage]
      }
    })
    expect(wrapper.find('v-card-title').text()).toBe('Logon')
    expect(
      wrapper.find('v-card-text > v-container > v-text-field:nth-of-type(1)').attributes('label')
    ).toBe('Email')
    expect(
      wrapper.find('v-card-text > v-container > v-text-field:nth-of-type(2)').attributes('label')
    ).toBe('Password')

    expect(wrapper.find('v-card-actions > v-btn:nth-of-type(1)').text()).toBe('OK')
  })

  it('login mode 1', async () => {
    storage.commit('change_server', {
      mode: 1
    })
    const wrapper = shallowMount(LoginBox, {
      global: {
        plugins: [storage]
      }
    })
    expect(wrapper.find('v-card-title').text()).toBe('Logon')
    expect(
      wrapper.find('v-card-text > v-container > v-text-field:nth-of-type(1)').attributes('label')
    ).toBe('Email')
    expect(
      wrapper.find('v-card-text > v-container > v-text-field:nth-of-type(2)').attributes('label')
    ).toBe('Password')

    expect(wrapper.find('v-card-actions > v-btn:nth-of-type(1)').text()).toBe('Cancel')
    expect(wrapper.find('v-card-actions > v-btn:nth-of-type(2)').text()).toBe('OK')
  })
})
