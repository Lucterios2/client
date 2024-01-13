import { describe, it, expect } from 'vitest'

import { shallowMount } from '@vue/test-utils'
import StatusBar from '../StatusBar.vue'
import storage from '../../datastorage.js'

describe('StatusBar', () => {
  it('info server', () => {
    storage.commit('change_server', { login: 'toto', instance_name: 'foo' })

    const wrapper = shallowMount(StatusBar, {
      global: {
        plugins: [storage]
      }
    })
    //console.log(wrapper.html())
    expect(wrapper.get('v-app-bar-title').text()).toBe('toto@foo')
  })
})
