import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'

import CustomBox from '@/observers/CustomBox.vue'
import i18n from '@/libs/i18n.js'
import { convert_event_to_object } from '@/__tests__/tools.js'
import { createApp } from 'vue'
import storage from '@/libs/datastorage'
import { initialObserver } from '@/libs/observer'
import FrameDlg from '@/libs/FrameDlg.vue'

beforeEach(() => {
  document.documentElement.innerHTML = '<html><body><div id="comp"></div></body></html>'
  console.warn = vi.fn()
  const app = createApp({})
  app.use(storage)
  app.use(i18n)
  app.mount('#app')
  initialObserver(app)
})

describe('CustomBox', () => {
  it('check actions', async () => {
    const wrapper = await mount(CustomBox, {
      propsData: {
        data: { val1: 'aaa', val2: 'bbb' },
        comp: [
          { name: 'val1', component: 'EDIT', x: 1, y: 0, tab: 0 },
          { name: 'val2', component: 'EDIT', x: 2, y: 0, tab: 0 }
        ],
        meta: { extension: '', title: 'Simple title', action: '', observer: '', ismodal: false },
        close: null,
        context: { id: 123, text: 'abc' },
        actions: [
          { id: 'abc', text: 'action1', icon: 'icon1', close: '1' },
          { id: 'def', text: 'action2', icon: 'icon2', close: '0', params: { value: 54.65 } }
        ]
      },
      global: {
        plugins: [i18n, storage]
      }
    })
    expect(wrapper.element.childElementCount).toBe(1)
    expect(wrapper.find('v-card').element.childElementCount).toBe(3)
    expect(wrapper.find('v-card > v-card-title').text()).toBe('Simple title')
    expect(wrapper.find('v-card > v-card-text').element.childElementCount).toBe(1)
    expect(wrapper.find('v-card > v-card-actions').element.childElementCount).toBe(4)
    expect(wrapper.find('v-card > v-card-actions > div:nth-of-type(1) > v-btn > span').text()).toBe(
      'action1'
    )
    expect(wrapper.find('v-card > v-card-actions > div:nth-of-type(2) > v-btn > span').text()).toBe(
      'action2'
    )

    expect(wrapper.emitted('clickaction')).toStrictEqual(undefined)
    expect(wrapper.emitted('close')).toStrictEqual(undefined)
    await wrapper.find('v-card > v-card-actions > div:nth-of-type(2) > v-btn').trigger('click')
    expect(wrapper.emitted('close')).toStrictEqual(undefined)
    expect(convert_event_to_object(wrapper.emitted('clickaction'))).toStrictEqual([
      [
        {
          id: 'def',
          text: 'action2',
          icon: 'icon2',
          close: '0',
          params: { value: 54.65, id: 123, text: 'abc', val1: 'aaa', val2: 'bbb' },
          num: 1
        },
        false
      ]
    ])

    await wrapper.find('v-card > v-card-actions > div:nth-of-type(1) > v-btn').trigger('click')
    expect(convert_event_to_object(wrapper.emitted('clickaction'))).toStrictEqual([
      [
        {
          id: 'def',
          text: 'action2',
          icon: 'icon2',
          close: '0',
          params: { value: 54.65, id: 123, text: 'abc', val1: 'aaa', val2: 'bbb' },
          num: 1
        },
        false
      ],
      [
        {
          id: 'abc',
          text: 'action1',
          icon: 'icon1',
          close: '1',
          params: { id: 123, text: 'abc', val1: 'aaa', val2: 'bbb' },
          num: 0
        },
        false
      ]
    ])
    expect(wrapper.emitted('close')).toStrictEqual([[false]])
    wrapper.vm.click_action(null)
    expect(convert_event_to_object(wrapper.emitted('clickaction'))).toStrictEqual([
      [
        {
          id: 'def',
          text: 'action2',
          icon: 'icon2',
          close: '0',
          params: { value: 54.65, id: 123, text: 'abc', val1: 'aaa', val2: 'bbb' },
          num: 1
        },
        false
      ],
      [
        {
          id: 'abc',
          text: 'action1',
          icon: 'icon1',
          close: '1',
          params: { id: 123, text: 'abc', val1: 'aaa', val2: 'bbb' },
          num: 0
        },
        false
      ],
      [
        {
          id: 'abc',
          text: 'action1',
          icon: 'icon1',
          close: '1',
          params: { id: 123, text: 'abc', val1: 'aaa', val2: 'bbb' },
          num: 0
        },
        undefined
      ]
    ])
    expect(wrapper.emitted('close')).toStrictEqual([[false]])
  })

  it('check CustomComponents', async () => {
    const wrapper = shallowMount(CustomBox, {
      propsData: {
        data: { val1: 'aaa', val2: 'bbb' },
        comp: [
          { name: 'val1', component: 'EDIT', x: 1, y: 0, tab: 0 },
          { name: 'val2', component: 'EDIT', x: 2, y: 0, tab: 0 }
        ],
        meta: { extension: '', title: 'Simple title', action: '', observer: '', ismodal: false },
        close: { id: 'xyz', text: 'action0', icon: 'icon0', close: '0' },
        context: { id: 123, text: 'abc' },
        actions: [
          { id: 'abc', text: 'action1', icon: 'icon1', close: '1' },
          { id: 'def', text: 'action2', icon: 'icon2', close: '0', params: { value: 54.65 } }
        ]
      },
      global: {
        plugins: [i18n, storage]
      }
    })
    expect(wrapper.element.childElementCount).toBe(0)
    expect(wrapper.element.tagName).toBe('FRAME-DLG-STUB')
    expect(wrapper.getCurrentComponent().props.actions.length).toBe(2)
    expect(wrapper.getCurrentComponent().props.close).toStrictEqual({
      id: 'xyz',
      text: 'action0',
      icon: 'icon0',
      close: '0'
    })
    expect(wrapper.getCurrentComponent().props.meta).toStrictEqual({
      extension: '',
      title: 'Simple title',
      action: '',
      observer: '',
      ismodal: false
    })
  })

  it('No modal', async () => {
    const wrapper = shallowMount(FrameDlg, {
      propsData: {
        meta: { extension: '', title: 'Simple title', action: '', observer: '', ismodal: false },
        close: null,
        actions: []
      }
    })
    expect(wrapper.element.childElementCount).toBe(1)
    expect(wrapper.find('v-card').element.childElementCount).toBe(3)
    expect(wrapper.find('v-card > v-card-title').element.childElementCount).toBe(1)
    expect(wrapper.find('v-card > v-card-title').text()).toBe('Simple title')
    expect(wrapper.find('v-card > v-card-title > div').element.childElementCount).toBe(3)
    expect(
      wrapper.find('v-card > v-card-title > div > v-btn:nth-of-type(1)').attributes().icon
    ).toBe('mdi-arrow-expand-all')
    expect(
      wrapper.find('v-card > v-card-title > div > v-btn:nth-of-type(2)').attributes().icon
    ).toBe('mdi-refresh')
    expect(
      wrapper.find('v-card > v-card-title > div > v-btn:nth-of-type(3)').attributes().icon
    ).toBe('mdi-close')
    expect(wrapper.find('v-card > v-card-text').element.childElementCount).toBe(0)
    expect(
      wrapper.find('v-card > buttons-bar-stub').getCurrentComponent().props.actions
    ).toStrictEqual([])
  })

  it('Modal', async () => {
    const wrapper = shallowMount(FrameDlg, {
      propsData: {
        meta: { extension: '', title: 'Simple title', action: '', observer: '', ismodal: true },
        close: null,
        actions: []
      }
    })
    expect(wrapper.element.childElementCount).toBe(2)
    expect(wrapper.find('div.modaldlg').element.childElementCount).toBe(0)
    expect(wrapper.find('v-card').element.childElementCount).toBe(3)
    expect(wrapper.find('v-card > v-card-title').element.childElementCount).toBe(1)
    expect(wrapper.find('v-card > v-card-title').text()).toBe('Simple title')
    expect(wrapper.find('v-card > v-card-title > div').element.childElementCount).toBe(2)
    expect(
      wrapper.find('v-card > v-card-title > div > v-btn:nth-of-type(1)').attributes().icon
    ).toBe('mdi-refresh')
    expect(
      wrapper.find('v-card > v-card-title > div > v-btn:nth-of-type(2)').attributes().icon
    ).toBe('mdi-close')
    expect(wrapper.find('v-card > v-card-text').element.childElementCount).toBe(0)
    expect(
      wrapper.find('v-card > buttons-bar-stub').getCurrentComponent().props.actions
    ).toStrictEqual([])
  })
})
