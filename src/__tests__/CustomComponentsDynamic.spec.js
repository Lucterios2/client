import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createApp, nextTick } from 'vue'

import CustomComponents from '@/components/CustomComponents.vue'
import { initialObserver } from '@/libs/observer'
import storage from '@/libs/datastorage.js'
import i18n from '@/libs/i18n.js'
import vuetify from '@/plugins/vuetify'

beforeEach(() => {
  document.documentElement.innerHTML = '<html><body><div id="app"></div></body></html>'
  console.warn = vi.fn()
  const app = createApp({})
  app.use(storage)
  app.use(i18n)
  app.mount('#app')
  initialObserver(app)
})

describe('CustomComponentsDynamic', () => {
  it('with button by default', async () => {
    const wrapper = mount(CustomComponents, {
      propsData: {
        data: { val1: 'aaa', val2: '' },
        comp: [
          { name: 'val1', component: 'EDIT', x: 0, y: 0, colspan: 1, rowspan: 1, tab: 0 },
          {
            name: 'val2',
            component: 'BUTTON',
            x: 0,
            y: 1,
            colspan: 1,
            rowspan: 1,
            tab: 0,
            is_default: true,
            action: {
              id: 'def',
              text: 'action btn',
              short_icon: 'icon',
              close: '0',
              params: { value: 54.65 }
            }
          }
        ],
        meta: {}
      },
      global: {
        plugins: [i18n, vuetify]
      }
    })
    await nextTick()
    expect(wrapper.element.childElementCount).toBe(1)
    expect(wrapper.find('table').element.childElementCount).toBe(2)
    expect(
      wrapper.find('table > tr:nth-of-type(1) > td > v-text-field').attributes().modelvalue
    ).toStrictEqual('aaa')
    expect(
      wrapper.find('table > tr:nth-of-type(2) > td > div > div > v-btn > span').text()
    ).toStrictEqual('action btn')
    expect(wrapper.emitted('action')).toStrictEqual(undefined)
    await wrapper.find('table > tr:nth-of-type(1) > td > v-text-field').trigger('keyup.enter')
    expect(wrapper.emitted('action')).toStrictEqual([
      [
        {
          close: '0',
          id: 'def',
          params: {
            val1: 'aaa',
            value: 54.65
          },
          short_icon: 'icon',
          text: 'action btn'
        }
      ]
    ])
  })

  it('with button no default', async () => {
    const wrapper = mount(CustomComponents, {
      propsData: {
        data: { val1: 'aaa', val2: '' },
        comp: [
          { name: 'val1', component: 'EDIT', x: 0, y: 0, colspan: 1, rowspan: 1, tab: 0 },
          {
            name: 'val2',
            component: 'BUTTON',
            x: 0,
            y: 1,
            colspan: 1,
            rowspan: 1,
            tab: 0,
            is_default: false,
            action: {
              id: 'def',
              text: 'action btn',
              short_icon: 'icon',
              close: '0',
              params: { value: 54.65 }
            }
          }
        ],
        meta: {}
      },
      global: {
        plugins: [i18n, vuetify]
      }
    })
    await nextTick()
    expect(wrapper.element.childElementCount).toBe(1)
    expect(wrapper.find('table').element.childElementCount).toBe(2)
    expect(
      wrapper.find('table > tr:nth-of-type(1) > td > v-text-field').attributes().modelvalue
    ).toStrictEqual('aaa')
    expect(
      wrapper.find('table > tr:nth-of-type(2) > td > div > div > v-btn > span').text()
    ).toStrictEqual('action btn')
    expect(wrapper.emitted('action')).toStrictEqual(undefined)
    await wrapper.find('table > tr:nth-of-type(1) > td > v-text-field').trigger('keyup.enter')
    expect(wrapper.emitted('action')).toStrictEqual([[null]])
  })
})
