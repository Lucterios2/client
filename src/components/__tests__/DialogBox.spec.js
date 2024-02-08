import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'

import DialogBox from '../DialogBox.vue'
import i18n from '../../i18n.js'
import { convert_event_to_object } from '../../__tests__/tools'

describe('DialogBox', () => {
  it('Information', async () => {
    const wrapper = shallowMount(DialogBox, {
      propsData: {
        data: { message: 'Message simple', type: 1 },
        meta: { extension: '', title: 'Simple title', action: '', observer: '' },
        close: null,
        context: { id: 123, text: 'abc' },
        actions: []
      },
      global: {
        plugins: [i18n]
      }
    })
    expect(wrapper.find('v-card').element.childElementCount).toBe(3)
    expect(wrapper.find('v-card > v-card-title').element.childElementCount).toBe(0)
    expect(wrapper.find('v-card > v-card-title').text()).toBe('Simple title')
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
    expect(
      wrapper.find('v-card > buttons-bar-stub').getCurrentComponent().props.actions
    ).toStrictEqual([])
  })

  it('Confirmation multi-action', async () => {
    const wrapper = shallowMount(DialogBox, {
      propsData: {
        data: { message: 'Message simple', type: 2 },
        meta: { extension: '', title: 'Simple title', action: '', observer: '' },
        close: null,
        context: { id: 123, text: 'abc' },
        actions: [
          { id: 'abc', text: 'action1', icon: 'icon1', close: '1' },
          { id: 'def', text: 'action2', icon: 'icon2', close: '0', params: { value: 54.65 } }
        ]
      },
      global: {
        plugins: [i18n]
      }
    })
    expect(wrapper.find('v-card').element.childElementCount).toBe(3)
    expect(wrapper.find('v-card > v-card-title').element.childElementCount).toBe(0)
    expect(wrapper.find('v-card > v-card-title').text()).toBe('Simple title')
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

  it('Warning', async () => {
    const wrapper = shallowMount(DialogBox, {
      propsData: {
        data: { message: 'Message complexe{[br]}with multiline and {[b]}bold{[/b]}', type: 3 },
        meta: { extension: '', title: 'Simple title', action: '', observer: '' },
        close: null,
        context: { id: 123, text: 'abc' },
        actions: []
      },
      global: {
        plugins: [i18n]
      }
    })
    expect(wrapper.find('v-card').element.childElementCount).toBe(3)
    expect(wrapper.find('v-card > v-card-title').element.childElementCount).toBe(0)
    expect(wrapper.find('v-card > v-card-title').text()).toBe('Simple title')
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
    expect(wrapper.find('v-card > v-card-text > v-row > v-col:nth-of-type(2) > span').html()).toBe(
      '<span>Message complexe<br>with multiline and <b>bold</b></span>'
    )

    expect(
      wrapper.find('v-card > buttons-bar-stub').getCurrentComponent().props.actions
    ).toStrictEqual([])
  })

  it('Error', async () => {
    const wrapper = shallowMount(DialogBox, {
      propsData: {
        data: { message: 'Message simple', type: 4 },
        meta: { extension: '', title: 'Simple title', action: '', observer: '' },
        close: { id: 'abc', text: 'action1', icon: 'icon1', params: { value: 54.65 } },
        context: { id: 123, text: 'abc' },
        actions: [{ id: 'def', text: 'action2', icon: 'icon2', close: '0' }]
      },
      global: {
        plugins: [i18n]
      }
    })
    expect(wrapper.find('v-card').element.childElementCount).toBe(3)
    expect(wrapper.find('v-card > v-card-title').element.childElementCount).toBe(0)
    expect(wrapper.find('v-card > v-card-title').text()).toBe('Simple title')
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

    expect(
      wrapper.find('v-card > buttons-bar-stub').getCurrentComponent().props.actions
    ).toStrictEqual([{ id: 'def', text: 'action2', icon: 'icon2', close: '0' }])

    expect(wrapper.emitted('clickaction')).toStrictEqual(undefined)
    expect(wrapper.emitted('close')).toStrictEqual(undefined)
    await wrapper.find('v-card > buttons-bar-stub').trigger('clickaction', {
      id: 'abc',
      text: 'action1',
      icon: 'icon1',
      params: { value: 54.65 }
    })
    expect(convert_event_to_object(wrapper.emitted('clickaction'))).toStrictEqual([
      [
        {
          id: 'abc',
          text: 'action1',
          icon: 'icon1',
          params: { id: 123, text: 'abc', value: 54.65 }
        }
      ]
    ])
    expect(wrapper.emitted('close')).toStrictEqual(undefined)
    await wrapper.find('v-card > buttons-bar-stub').trigger('close')
    expect(wrapper.emitted('close')).toStrictEqual([[]])
  })
})
