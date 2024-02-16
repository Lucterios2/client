import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import storage from '@/libs/datastorage.js'
import i18n from '@/libs/i18n.js'

import * as utils from '@/libs/utils'
import { clearComponent, factory, initialObserver } from '@/libs/observer.js'
import { createApp, nextTick } from 'vue'

beforeEach(() => {
  document.documentElement.innerHTML = '<html><body><div id="app"></div></body></html>'
  console.warn = vi.fn()
  const app = createApp({})
  app.use(storage)
  app.use(i18n)
  app.mount('#app')
  initialObserver(app)
})

describe('observer', () => {
  it('unknown', async () => {
    clearComponent()
    const wrapper = mount(
      {
        template: '<div id="comp"></div>'
      },
      {
        attachTo: document.getElementById('app')
      }
    )
    expect(wrapper.find('div#comp').element.childElementCount).toBe(0)
    const action_fct = vi.fn()
    await factory({ meta: { observer: 'unknonw' } }, action_fct)
    expect(wrapper.find('div#comp').element.childElementCount).toBe(0)
  }),
    it('core.acknowledge', async () => {
      clearComponent()
      const wrapper = mount(
        {
          template: '<div id="comp"></div>'
        },
        {
          attachTo: document.getElementById('app')
        }
      )
      expect(wrapper.find('div#comp').element.childElementCount).toBe(0)
      const action_fct = vi.fn()
      await factory({ meta: { observer: 'core.acknowledge' } }, action_fct)
      expect(wrapper.find('div#comp').element.childElementCount).toBe(0)
      clearComponent()
      expect(wrapper.find('div#comp').element.childElementCount).toBe(0)
    }),
    it('core.dialogbox', async () => {
      clearComponent()
      const wrapper = mount(
        {
          template: '<div id="comp"></div>'
        },
        {
          attachTo: document.getElementById('app')
        }
      )
      expect(wrapper.find('div#comp').element.childElementCount).toBe(0)
      const action_fct = vi.fn()
      await factory(
        { meta: { observer: 'core.dialogbox' }, data: { type: 1, message: 'title' }, actions: [] },
        action_fct
      )
      expect(wrapper.find('div#comp > div').element.childElementCount).toBe(1)
      expect(wrapper.find('div#comp > div > v-dialog').element.childElementCount).toBe(1)
      clearComponent()
      expect(wrapper.find('div#comp').element.childElementCount).toBe(0)
    }),
    it('core.exception', async () => {
      clearComponent()
      const wrapper = mount(
        {
          template: '<div id="comp"></div>'
        },
        {
          attachTo: document.getElementById('app')
        }
      )
      expect(wrapper.find('div#comp').element.childElementCount).toBe(0)
      const action_fct = vi.fn()
      await factory(
        {
          meta: { observer: 'core.exception' },
          exception: { type: 'aa', debug: '', message: '', code: 2, request: '', response: '' }
        },
        action_fct
      )
      expect(wrapper.find('div#comp > div').element.childElementCount).toBe(1)
      expect(wrapper.find('div#comp > div > v-dialog').element.childElementCount).toBe(1)
      clearComponent()
      expect(wrapper.find('div#comp').element.childElementCount).toBe(0)
    }),
    it('core.menu', async () => {
      clearComponent()
      const wrapper = mount(
        {
          template: '<div id="comp"></div>'
        },
        {
          attachTo: document.getElementById('app')
        }
      )
      expect(wrapper.find('div#comp').element.childElementCount).toBe(0)
      const action_fct = vi.fn()
      await factory({ meta: { observer: 'core.menu' }, menus: [] }, action_fct)
      expect(wrapper.find('div#comp > div').element.childElementCount).toBe(1)
      expect(wrapper.find('div#comp > div > div.menu').element.childElementCount).toBe(1)
      clearComponent()
      expect(wrapper.find('div#comp').element.childElementCount).toBe(0)
    }),
    it('core.auth', async () => {
      clearComponent()
      const wrapper = mount(
        {
          template: '<div id="comp"></div>'
        },
        {
          attachTo: document.getElementById('app')
        }
      )
      expect(wrapper.find('div#comp').element.childElementCount).toBe(0)
      const action_fct = vi.fn()
      await factory(
        { meta: { observer: 'core.auth' }, data: { type: 1, message: 'title' } },
        action_fct
      )
      await nextTick()
      expect(wrapper.find('div#comp > div > div').element.childElementCount).toBe(1)
      expect(wrapper.find('div#comp > div > div > v-dialog').element.childElementCount).toBe(1)
      clearComponent()
      expect(wrapper.find('div#comp').element.childElementCount).toBe(0)
    }),
    it('core.print', async () => {
      vi.spyOn(utils, 'openBlob')
      utils.openBlob.mockImplementation(() => {
        return true
      })
      clearComponent()
      const wrapper = mount(
        {
          template: '<div id="comp"></div>'
        },
        {
          attachTo: document.getElementById('app')
        }
      )
      expect(wrapper.find('div#comp').element.childElementCount).toBe(0)
      const action_fct = vi.fn()
      await factory(
        {
          meta: { observer: 'core.print' },
          print: { extension: '.csv', title: 'title', content: '' }
        },
        action_fct
      )
      expect(wrapper.find('div#comp').element.childElementCount).toBe(0)
      clearComponent()
      expect(wrapper.find('div#comp').element.childElementCount).toBe(0)
    })
})
