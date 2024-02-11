import { describe, it, expect, beforeEach, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'

import CustomBox from '@/observers/CustomBox.vue'
import { convert_event_to_object } from '@/__tests__/tools.js'

beforeEach(() => {
  document.documentElement.innerHTML = '<html><body><div id="comp"></div></body></html>'
  console.warn = vi.fn()
})

describe('CustomBox', () => {
  it('check actions', async () => {
    const wrapper = shallowMount(CustomBox, {
      propsData: {
        data: { val1: 'aaa', val2: 'aaa' },
        comp: [{ name: 'val1' }, { name: 'val2' }],
        meta: { extension: '', title: 'Simple title', action: '', observer: '', ismodal: false },
        close: null,
        context: { id: 123, text: 'abc' },
        actions: [
          { id: 'abc', text: 'action1', icon: 'icon1', close: '1' },
          { id: 'def', text: 'action2', icon: 'icon2', close: '0', params: { value: 54.65 } }
        ]
      }
    })
    expect(wrapper.element.childElementCount).toBe(1)
    expect(wrapper.find('v-card').element.childElementCount).toBe(4)
    expect(wrapper.find('v-card > v-card-title').text()).toBe('Simple title')
    expect(wrapper.find('v-card > v-card-text').element.childElementCount).toBe(1)
    expect(
      wrapper.find('v-card > buttons-bar-stub').getCurrentComponent().props.actions
    ).toStrictEqual([
      { id: 'abc', text: 'action1', icon: 'icon1', close: '1' },
      {
        id: 'def',
        text: 'action2',
        icon: 'icon2',
        close: '0',
        params: { value: 54.65 }
      }
    ])

    expect(wrapper.emitted('clickaction')).toStrictEqual(undefined)
    expect(wrapper.emitted('close')).toStrictEqual(undefined)
    await wrapper
      .find('v-card > buttons-bar-stub')
      .trigger('clickaction', { id: 'abc', text: 'action1', icon: 'icon1', close: '1' })
    expect(convert_event_to_object(wrapper.emitted('clickaction'))).toStrictEqual([
      [{ id: 'abc', text: 'action1', icon: 'icon1', close: '1', params: { id: 123, text: 'abc' } }]
    ])
    expect(wrapper.emitted('close')).toStrictEqual(undefined)
    await wrapper.find('v-card > buttons-bar-stub').trigger('close')
    expect(wrapper.emitted('close')).toStrictEqual([[]])
  })

  it('No modal', async () => {
    const wrapper = shallowMount(CustomBox, {
      propsData: {
        data: { val1: 'aaa', val2: 'aaa' },
        comp: [{ name: 'val1' }, { name: 'val2' }],
        meta: { extension: '', title: 'Simple title', action: '', observer: '', ismodal: false },
        close: null,
        context: { id: 123, text: 'abc' },
        actions: []
      }
    })
    expect(wrapper.element.childElementCount).toBe(1)
    expect(wrapper.find('v-card').element.childElementCount).toBe(4)
    expect(wrapper.find('v-card > v-card-title').element.childElementCount).toBe(0)
    expect(wrapper.find('v-card > v-card-title').text()).toBe('Simple title')
    expect(wrapper.find('v-card > v-icon').text()).toBe('mdi-arrow-expand-all')
    expect(wrapper.find('v-card > v-card-text').element.childElementCount).toBe(1)
    expect(
      wrapper.find('v-card > v-card-text > custom-components-stub').element.childElementCount
    ).toBe(0)
    expect(
      wrapper.find('v-card > v-card-text > custom-components-stub').getCurrentComponent().props.data
    ).toStrictEqual({ val1: 'aaa', val2: 'aaa' })
    expect(
      wrapper.find('v-card > v-card-text > custom-components-stub').getCurrentComponent().props.comp
    ).toStrictEqual([{ name: 'val1' }, { name: 'val2' }])
    expect(
      wrapper.find('v-card > buttons-bar-stub').getCurrentComponent().props.actions
    ).toStrictEqual([])
  })

  it('Modal', async () => {
    const wrapper = shallowMount(CustomBox, {
      propsData: {
        data: { val1: 'aaa', val2: 'aaa' },
        comp: [{ name: 'val1' }, { name: 'val2' }],
        meta: { extension: '', title: 'Simple title', action: '', observer: '', ismodal: true },
        close: null,
        context: { id: 123, text: 'abc' },
        actions: []
      }
    })
    expect(wrapper.element.childElementCount).toBe(2)
    expect(wrapper.find('div.modaldlg').element.childElementCount).toBe(0)
    expect(wrapper.find('v-card').element.childElementCount).toBe(3)
    expect(wrapper.find('v-card > v-card-title').element.childElementCount).toBe(0)
    expect(wrapper.find('v-card > v-card-title').text()).toBe('Simple title')
    expect(wrapper.find('v-card > v-card-text').element.childElementCount).toBe(1)
    expect(
      wrapper.find('v-card > v-card-text > custom-components-stub').element.childElementCount
    ).toBe(0)
    expect(
      wrapper.find('v-card > v-card-text > custom-components-stub').getCurrentComponent().props.data
    ).toStrictEqual({ val1: 'aaa', val2: 'aaa' })
    expect(
      wrapper.find('v-card > v-card-text > custom-components-stub').getCurrentComponent().props.comp
    ).toStrictEqual([{ name: 'val1' }, { name: 'val2' }])
    expect(
      wrapper.find('v-card > buttons-bar-stub').getCurrentComponent().props.actions
    ).toStrictEqual([])
  })
})
