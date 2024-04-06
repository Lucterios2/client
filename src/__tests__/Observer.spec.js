import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import storage from '@/libs/datastorage.js'
import i18n from '@/libs/i18n.js'

import * as utils from '@/libs/utils'
import { clearComponent, factory, initialObserver } from '@/libs/observer.js'
import { createApp, nextTick } from 'vue'
import { LucteriosException } from '@/libs/error'

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
    try {
      await factory({ meta: { observer: 'unknonw' } }, action_fct)
      expect(true).toBe(false)
    } catch (error) {
      expect(error).toStrictEqual(
        new LucteriosException(2, 'NO COMPONENT', { meta: { observer: 'unknonw' } })
      )
    }
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
      await nextTick()
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
      expect(wrapper.find('div#comp > div > div').element.childElementCount).toBe(1)
      clearComponent()
      expect(wrapper.find('div#comp').element.childElementCount).toBe(0)
    }),
    it('core.custom', async () => {
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
          meta: { observer: 'core.custom' },
          data: { val1: 'aaa', val2: 'bbb' },
          comp: [
            { name: 'val1', component: 'LABELFORM', tab: 0, x: 0, y: 1 },
            { name: 'val2', component: 'LABELFORM', tab: 0, x: 0, y: 2 }
          ],
          actions: []
        },
        action_fct
      )
      expect(wrapper.find('div#comp > div').element.childElementCount).toBe(1)
      expect(wrapper.find('div#comp > div > .frameDlg').element.childElementCount).toBe(1)
      expect(wrapper.find('div#comp > div > .frameDlg > v-card').element.childElementCount).toBe(3)
      expect(
        wrapper
          .find(
            'div#comp > div > .frameDlg > v-card > v-card-text > div > table > tr:nth-of-type(2) > td > div > div > span'
          )
          .text()
      ).toBe('aaa')
      expect(
        wrapper
          .find(
            'div#comp > div > .frameDlg > v-card > v-card-text > div > table > tr:nth-of-type(3) > td > div > div > span'
          )
          .text()
      ).toBe('bbb')
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
    }),
    it('reload dialogbox', async () => {
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
      const first_comp = await factory(
        {
          meta: { observer: 'core.dialogbox', title: 'title 1' },
          data: { type: 1, text: 'text 1' },
          actions: []
        },
        action_fct,
        null,
        true
      )
      expect(wrapper.find('div#comp > div').element.childElementCount).toBe(1)
      expect(wrapper.find('div#comp > div > div > v-card > v-card-title').text()).toBe('title 1')
      expect(
        wrapper
          .find(
            'div#comp > div > div > v-card > v-card-text > v-row > v-col:nth-of-type(1) > v-icon'
          )
          .text()
      ).toBe('mdi:mdi-information-outline')
      expect(
        wrapper
          .find('div#comp > div > div > v-card > v-card-text > v-row > v-col:nth-of-type(2) > span')
          .text()
      ).toBe('text 1')
      const second_comp = await factory(
        {
          meta: { observer: 'core.dialogbox', title: 'title 2' },
          data: { type: 2, text: 'text 2' },
          actions: []
        },
        action_fct,
        first_comp.id,
        true
      )
      await nextTick()
      expect(second_comp).toBe(first_comp)
      expect(wrapper.find('div#comp > div').element.childElementCount).toBe(1)
      expect(wrapper.find('div#comp > div > div > v-card > v-card-title').text()).toBe('title 2')
      expect(
        wrapper
          .find(
            'div#comp > div > div > v-card > v-card-text > v-row > v-col:nth-of-type(1) > v-icon'
          )
          .text()
      ).toBe('mdi:mdi-help-circle-outline')
      expect(
        wrapper
          .find('div#comp > div > div > v-card > v-card-text > v-row > v-col:nth-of-type(2) > span')
          .text()
      ).toBe('text 2')
    }),
    it('reload core.custom', async () => {
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
      const first_comp = await factory(
        {
          meta: { observer: 'core.custom' },
          data: { val1: 'aaa', val2: 'bbb' },
          comp: [
            { name: 'val1', component: 'LABELFORM', tab: 0, x: 0, y: 1 },
            { name: 'val2', component: 'LABELFORM', tab: 0, x: 0, y: 2 }
          ],
          actions: []
        },
        action_fct
      )
      expect(
        wrapper
          .find(
            'div#comp > div > .frameDlg > v-card > v-card-text > div > table > tr:nth-of-type(2) > td > div > div > span'
          )
          .text()
      ).toBe('aaa')
      expect(
        wrapper
          .find(
            'div#comp > div > .frameDlg > v-card > v-card-text > div > table > tr:nth-of-type(3) > td > div > div > span'
          )
          .text()
      ).toBe('bbb')
      const second_comp = await factory(
        {
          meta: { observer: 'core.custom' },
          data: { val1: 'ccc', val2: 'ddd' },
          comp: [
            { name: 'val1', component: 'LABELFORM', tab: 0, x: 0, y: 1 },
            { name: 'val2', component: 'LABELFORM', tab: 0, x: 0, y: 2 }
          ],
          actions: []
        },
        action_fct,
        first_comp.id,
        true
      )
      await nextTick()
      expect(second_comp).toBe(first_comp)
      expect(
        wrapper
          .find(
            'div#comp > div > .frameDlg > v-card > v-card-text > div > table > tr:nth-of-type(2) > td > div > div > span'
          )
          .text()
      ).toBe('ccc')
      expect(
        wrapper
          .find(
            'div#comp > div > .frameDlg > v-card > v-card-text > div > table > tr:nth-of-type(3) > td > div > div > span'
          )
          .text()
      ).toBe('ddd')
    })
})
