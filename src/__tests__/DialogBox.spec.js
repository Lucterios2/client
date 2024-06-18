import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'

import DialogBox from '@/observers/DialogBox.vue'
import i18n from '@/libs/i18n.js'
import storage from '@/libs/datastorage'
import { convert_event_to_object } from '@/__tests__/tools.js'

beforeEach(() => {
  console.warn = vi.fn()
})

describe('DialogBox', () => {
  it('Information', async () => {
    const wrapper = mount(DialogBox, {
      propsData: {
        data: { text: 'Message simple', type: 1 },
        meta: { extension: '', title: 'Simple title', action: '', observer: '', ismodal: true },
        close: null,
        context: { id: 123, text: 'abc' },
        actions: []
      },
      global: {
        plugins: [i18n, storage]
      }
    })
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
    expect(wrapper.find('v-card > v-card-text').element.childElementCount).toBe(1)
    expect(wrapper.find('v-card > v-card-text > v-row').element.childElementCount).toBe(2)
    expect(
      wrapper.find('v-card > v-card-text > v-row > v-col:nth-of-type(1)').element.childElementCount
    ).toBe(1)
    expect(
      wrapper.find('v-card > v-card-text > v-row > v-col:nth-of-type(1) > v-icon').element
        .childElementCount
    ).toBe(0)
    expect(
      wrapper.find('v-card > v-card-text > v-row > v-col:nth-of-type(1) > v-icon').text()
    ).toBe('mdi:mdi-information-outline')
    expect(
      wrapper.find('v-card > v-card-text > v-row > v-col:nth-of-type(2)').element.childElementCount
    ).toBe(1)
    expect(wrapper.find('v-card > v-card-text > v-row > v-col:nth-of-type(2) > span').text()).toBe(
      'Message simple'
    )
    expect(wrapper.find('v-card > v-card-actions').element.childElementCount).toBe(3)
    expect(wrapper.find('v-card > v-card-actions > div:nth-of-type(1) > v-btn > span').text()).toBe(
      'Ok'
    )
  })

  it('Confirmation multi-action', async () => {
    const wrapper = mount(DialogBox, {
      propsData: {
        data: { text: 'Message simple', type: 2 },
        meta: { extension: '', title: 'Simple title', action: '', observer: '', ismodal: true },
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
    expect(wrapper.find('v-card > v-card-text').element.childElementCount).toBe(1)
    expect(wrapper.find('v-card > v-card-text > v-row').element.childElementCount).toBe(2)
    expect(
      wrapper.find('v-card > v-card-text > v-row > v-col:nth-of-type(1)').element.childElementCount
    ).toBe(1)
    expect(
      wrapper.find('v-card > v-card-text > v-row > v-col:nth-of-type(1) > v-icon').element
        .childElementCount
    ).toBe(0)
    expect(
      wrapper.find('v-card > v-card-text > v-row > v-col:nth-of-type(1) > v-icon').text()
    ).toBe('mdi:mdi-help-circle-outline')
    expect(
      wrapper.find('v-card > v-card-text > v-row > v-col:nth-of-type(2)').element.childElementCount
    ).toBe(1)
    expect(wrapper.find('v-card > v-card-text > v-row > v-col:nth-of-type(2) > span').text()).toBe(
      'Message simple'
    )

    expect(wrapper.find('v-card > v-card-actions').element.childElementCount).toBe(4)
    expect(wrapper.find('v-card > v-card-actions > div:nth-of-type(1) > v-btn > span').text()).toBe(
      'action1'
    )
    expect(wrapper.find('v-card > v-card-actions > div:nth-of-type(2) > v-btn > span').text()).toBe(
      'action2'
    )

    expect(wrapper.emitted('clickaction')).toStrictEqual(undefined)
    expect(wrapper.emitted('close')).toStrictEqual(undefined)
    await wrapper.find('v-card > v-card-actions > div:nth-of-type(1) > v-btn').trigger('click')
    expect(convert_event_to_object(wrapper.emitted('clickaction'))).toStrictEqual([
      [
        {
          id: 'abc',
          text: 'action1',
          icon: 'icon1',
          num: 0,
          close: '1',
          params: { id: 123, text: 'abc' }
        },
        false
      ]
    ])
    expect(wrapper.emitted('close')).toStrictEqual([[false]])
  })

  it('Warning', async () => {
    const wrapper = mount(DialogBox, {
      propsData: {
        data: { text: 'Message complexe{[br]}with multiline and {[b]}bold{[/b]}', type: 3 },
        meta: { extension: '', title: 'Simple title', action: '', observer: '', ismodal: true },
        close: null,
        context: { id: 123, text: 'abc' },
        actions: []
      },
      global: {
        plugins: [i18n, storage]
      }
    })
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
    expect(wrapper.find('v-card > v-card-text').element.childElementCount).toBe(1)
    expect(wrapper.find('v-card > v-card-text > v-row').element.childElementCount).toBe(2)
    expect(
      wrapper.find('v-card > v-card-text > v-row > v-col:nth-of-type(1)').element.childElementCount
    ).toBe(1)
    expect(
      wrapper.find('v-card > v-card-text > v-row > v-col:nth-of-type(1) > v-icon').element
        .childElementCount
    ).toBe(0)
    expect(
      wrapper.find('v-card > v-card-text > v-row > v-col:nth-of-type(1) > v-icon').text()
    ).toBe('mdi:mdi-alert')
    expect(
      wrapper.find('v-card > v-card-text > v-row > v-col:nth-of-type(2)').element.childElementCount
    ).toBe(1)
    const message_contain = wrapper
      .find('v-card > v-card-text > v-row > v-col:nth-of-type(2) > span')
      .html()
    expect(message_contain.substring(message_contain.indexOf('>'))).toBe(
      '>Message complexe<br>with multiline and <b>bold</b></span>'
    )

    expect(wrapper.find('v-card > v-card-actions').element.childElementCount).toBe(3)
    expect(wrapper.find('v-card > v-card-actions > div:nth-of-type(1) > v-btn > span').text()).toBe(
      'Ok'
    )
  })

  it('Error', async () => {
    const wrapper = mount(DialogBox, {
      propsData: {
        data: { text: 'Message simple', type: 4 },
        meta: { extension: '', title: 'Simple title', action: '', observer: '', ismodal: true },
        close: { id: 'abc', text: 'action1', icon: 'icon1', params: { value: 54.65 } },
        context: { id: 123, text: 'abc' },
        actions: [{ id: 'def', text: 'action2', icon: 'icon2', close: '0' }]
      },
      global: {
        plugins: [i18n, storage]
      }
    })
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
    expect(wrapper.find('v-card > v-card-text').element.childElementCount).toBe(1)
    expect(wrapper.find('v-card > v-card-text > v-row').element.childElementCount).toBe(2)
    expect(
      wrapper.find('v-card > v-card-text > v-row > v-col:nth-of-type(1)').element.childElementCount
    ).toBe(1)
    expect(
      wrapper.find('v-card > v-card-text > v-row > v-col:nth-of-type(1) > v-icon').element
        .childElementCount
    ).toBe(0)
    expect(
      wrapper.find('v-card > v-card-text > v-row > v-col:nth-of-type(1) > v-icon').text()
    ).toBe('mdi:mdi-alert-circle')
    expect(
      wrapper.find('v-card > v-card-text > v-row > v-col:nth-of-type(2)').element.childElementCount
    ).toBe(1)
    expect(wrapper.find('v-card > v-card-text > v-row > v-col:nth-of-type(2) > span').text()).toBe(
      'Message simple'
    )

    expect(wrapper.find('v-card > v-card-actions').element.childElementCount).toBe(3)
    expect(wrapper.find('v-card > v-card-actions > div:nth-of-type(1) > v-btn > span').text()).toBe(
      'action2'
    )
    expect(wrapper.emitted('clickaction')).toStrictEqual(undefined)
    expect(wrapper.emitted('close')).toStrictEqual(undefined)
    await wrapper.find('v-card > v-card-actions > div:nth-of-type(1) > v-btn').trigger('click')
    expect(convert_event_to_object(wrapper.emitted('clickaction'))).toStrictEqual([
      [
        {
          id: 'def',
          text: 'action2',
          icon: 'icon2',
          close: '0',
          num: 0,
          params: { id: 123, text: 'abc' }
        },
        false
      ]
    ])
    expect(wrapper.emitted('close')).toStrictEqual(undefined)
    await wrapper.find('v-card > v-card-title > div > v-btn:nth-of-type(2)').trigger('click')
    expect(wrapper.emitted('close')).toStrictEqual([[true]])
    expect(convert_event_to_object(wrapper.emitted('clickaction'))).toStrictEqual([
      [
        {
          id: 'def',
          text: 'action2',
          icon: 'icon2',
          close: '0',
          num: 0,
          params: { id: 123, text: 'abc' }
        },
        false
      ],
      [
        {
          id: 'abc',
          text: 'action1',
          icon: 'icon1',
          params: { id: 123, text: 'abc', value: 54.65 }
        },
        true
      ]
    ])
  })
})
