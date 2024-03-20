import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import * as transport from '@/libs/transport'

import ButtonComp from '@/components/ButtonComp.vue'
import { convert_event_to_object } from '@/__tests__/tools.js'
import { nextTick } from 'vue'

beforeEach(() => {
  console.warn = vi.fn()
  vi.spyOn(transport, 'getUrlServer')
  transport.getUrlServer.mockImplementation(() => {
    return 'http://localhost'
  })
})

describe('ButtonComp', () => {
  it('no action', async () => {
    const wrapper = mount(ButtonComp, {
      propsData: {
        value: '',
        component: { name: 'btn1', component: 'BUTTON', x: 0, y: 0, colspan: 1, rowspan: 1, tab: 0 }
      }
    })
    await nextTick()
    expect(wrapper.html()).toBe('<!--v-if-->')
  })

  it('simple action', async () => {
    const wrapper = mount(ButtonComp, {
      propsData: {
        value: '',
        component: {
          name: 'btn1',
          component: 'BUTTON',
          x: 0,
          y: 0,
          colspan: 1,
          rowspan: 1,
          tab: 0,
          action: {
            id: 'def',
            text: 'action btn',
            icon: '/icon',
            close: '0',
            params: { value: 54.65 }
          }
        }
      }
    })
    await nextTick()
    expect(wrapper.emitted('action')).toStrictEqual(undefined)
    expect(wrapper.element.childElementCount).toBe(1)
    expect(wrapper.find('div > v-btn').element.childElementCount).toBe(2)
    expect(wrapper.find('div > v-btn > span').text()).toBe('action btn')
    expect(wrapper.find('div > v-btn > img').attributes('src')).toBe('http://localhost/icon')
    await wrapper.find('div > v-btn').trigger('click')
    expect(convert_event_to_object(wrapper.emitted('action'))).toStrictEqual([
      [
        {
          id: 'def',
          text: 'action btn',
          icon: '/icon',
          close: '0',
          params: { value: 54.65 }
        }
      ]
    ])
  })

  it('mini button', async () => {
    const wrapper = mount(ButtonComp, {
      propsData: {
        value: '',
        component: {
          name: 'btn1',
          component: 'BUTTON',
          x: 0,
          y: 0,
          colspan: 1,
          rowspan: 1,
          tab: 0,
          is_mini: true,
          action: {
            id: 'def',
            text: 'action btn',
            icon: '/icon',
            close: '0',
            params: { value: 54.65 }
          }
        }
      }
    })
    await nextTick()
    expect(wrapper.emitted('action')).toStrictEqual(undefined)
    expect(wrapper.element.childElementCount).toBe(1)
    expect(wrapper.find('div > v-btn').element.childElementCount).toBe(1)
    expect(wrapper.find('div > v-btn > img').attributes('src')).toBe('http://localhost/icon')
    expect(wrapper.find('div > v-btn > img').attributes('title')).toBe('action btn')
    await wrapper.find('div > v-btn').trigger('click')
    expect(convert_event_to_object(wrapper.emitted('action'))).toStrictEqual([
      [
        {
          id: 'def',
          text: 'action btn',
          icon: '/icon',
          close: '0',
          params: { value: 54.65 }
        }
      ]
    ])
  })

  it('mini button short icon', async () => {
    const wrapper = mount(ButtonComp, {
      propsData: {
        value: '',
        component: {
          name: 'btn1',
          component: 'BUTTON',
          x: 0,
          y: 0,
          colspan: 1,
          rowspan: 1,
          tab: 0,
          is_mini: true,
          action: {
            id: 'def',
            text: 'action btn',
            short_icon: 'icon',
            close: '0',
            params: { value: 54.65 }
          }
        }
      }
    })
    await nextTick()
    expect(wrapper.emitted('action')).toStrictEqual(undefined)
    expect(wrapper.element.childElementCount).toBe(1)
    expect(wrapper.find('div > v-btn').element.childElementCount).toBe(1)
    expect(wrapper.find('div > v-btn > v-icon').text()).toBe('icon')
    expect(wrapper.find('div > v-btn > v-icon').attributes('title')).toBe('action btn')
    await wrapper.find('div > v-btn').trigger('click')
    expect(convert_event_to_object(wrapper.emitted('action'))).toStrictEqual([
      [
        {
          id: 'def',
          text: 'action btn',
          short_icon: 'icon',
          close: '0',
          params: { value: 54.65 }
        }
      ]
    ])
  })
})
