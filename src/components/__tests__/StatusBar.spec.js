import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'

import StatusBar from '../StatusBar.vue'
import storage from '../../datastorage.js'

describe('StatusBar', () => {
  it('info server', () => {
    storage.commit('change_server', { login: 'toto', instance_name: 'foo', logo_iconname: "logo.png" })

    const wrapper = shallowMount(StatusBar, {
      global: {
        plugins: [storage]
      }
    })
    expect(wrapper.get('v-app-bar-title').text()).toBe('toto@foo')
    expect(wrapper.get('v-img').attributes("src")).toBe('logo.png')
    expect(wrapper.findAll('v-list-item-title').at(0).text()).toBe('Refresh')
    expect(wrapper.findAll('v-list-item-title > v-icon').at(0).attributes("icon")).toBe('mdi:mdi-refresh')
    expect(wrapper.findAll('v-list-item-title').at(1).text()).toBe('Help')
    expect(wrapper.findAll('v-list-item-title > v-icon').at(1).attributes("icon")).toBe('mdi:mdi-help')
    expect(wrapper.findAll('v-list-item-title').at(2).text()).toBe('About ...')
    expect(wrapper.findAll('v-list-item-title > v-icon').at(2).attributes("icon")).toBe('mdi:mdi-information-variant')
    expect(wrapper.findAll('v-list-item-title').at(3).text()).toBe('Logoff')
    expect(wrapper.findAll('v-list-item-title > v-icon').at(3).attributes("icon")).toBe('mdi:mdi-logout')
  }),

  it('click summary', () => {
    storage.commit('change_summary', false)
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
