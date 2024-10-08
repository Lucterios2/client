import { describe, it, expect, beforeEach, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'

import ButtonsBar from '@/libs/ButtonsBar.vue'
import i18n from '@/libs/i18n.js'

beforeEach(() => {
  console.warn = vi.fn()
})

describe('ButtonsBar', () => {
  it('No actions - No close', async () => {
    const wrapper = shallowMount(ButtonsBar, {
      propsData: {
        actions: [],
        close: null
      },
      global: {
        plugins: [i18n]
      }
    })
    expect(wrapper.element.childElementCount).toBe(2)
    expect(wrapper.find('v-spacer').exists()).toBe(true)
    expect(wrapper.find('div').element.childElementCount).toBe(1)
    expect(
      wrapper.find('div > button-action-stub').getCurrentComponent().props.action
    ).toStrictEqual({ id: '', text: 'Ok', short_icon: 'mdi:mdi-check', close: '1' })

    expect(wrapper.emitted('clickaction')).toStrictEqual(undefined)
    await wrapper.find('div > button-action-stub').trigger('click')
    expect(wrapper.emitted('clickaction')).toStrictEqual([
      [
        { id: '', text: 'Ok', short_icon: 'mdi:mdi-check', no_check: true, close: '1', params: {} },
        false,
        null
      ]
    ])
  })

  it('No actions - Close', async () => {
    const wrapper = shallowMount(ButtonsBar, {
      propsData: {
        actions: [],
        close: { id: 'xyz', text: 'actionend', short_icon: 'iconend' }
      },
      global: {
        plugins: [i18n]
      }
    })
    expect(wrapper.element.childElementCount).toBe(2)
    expect(wrapper.find('v-spacer').exists()).toBe(true)
    expect(wrapper.find('div').element.childElementCount).toBe(1)
    expect(
      wrapper.find('div > button-action-stub').getCurrentComponent().props.action
    ).toStrictEqual({ id: '', text: 'Ok', short_icon: 'mdi:mdi-check', close: '1' })

    expect(wrapper.emitted('clickaction')).toStrictEqual(undefined)
    await wrapper.find('div > button-action-stub').trigger('click')
    expect(wrapper.emitted('clickaction')).toStrictEqual([
      [
        { id: '', text: 'Ok', short_icon: 'mdi:mdi-check', no_check: true, close: '1', params: {} },
        false,
        { id: 'xyz', text: 'actionend', short_icon: 'iconend' }
      ]
    ])
  })

  it('Actions - No close', async () => {
    const wrapper = shallowMount(ButtonsBar, {
      propsData: {
        actions: [
          { id: 'abc', text: 'action1', icon: 'icon1', close: '0' },
          { id: 'def', text: 'action2', icon: 'icon2', close: '0' }
        ],
        close: null
      },
      global: {
        plugins: [i18n]
      }
    })
    expect(wrapper.element.childElementCount).toBe(3)
    expect(wrapper.find('v-spacer').exists()).toBe(true)
    expect(wrapper.find('div').element.childElementCount).toBe(1)
    expect(
      wrapper.find('div:nth-of-type(1) > button-action-stub').getCurrentComponent().props.action
    ).toStrictEqual({ id: 'abc', text: 'action1', icon: 'icon1', close: '0', num: 0 })
    expect(
      wrapper.find('div:nth-of-type(2) > button-action-stub').getCurrentComponent().props.action
    ).toStrictEqual({
      id: 'def',
      text: 'action2',
      icon: 'icon2',
      close: '0',
      num: 1
    })

    expect(wrapper.emitted('clickaction')).toStrictEqual(undefined)
    await wrapper.find('div:nth-of-type(1) > button-action-stub').trigger('click')
    expect(wrapper.emitted('clickaction')).toStrictEqual([
      [{ id: 'abc', text: 'action1', icon: 'icon1', close: '0', num: 0, params: {} }, false, null]
    ])
    await wrapper.find('div:nth-of-type(2) > button-action-stub').trigger('click')
    expect(wrapper.emitted('clickaction')).toStrictEqual([
      [{ id: 'abc', text: 'action1', icon: 'icon1', close: '0', num: 0, params: {} }, false, null],
      [
        {
          id: 'def',
          text: 'action2',
          icon: 'icon2',
          close: '0',
          num: 1,
          params: {}
        },
        false,
        null
      ]
    ])
  })

  it('Actions - Close', async () => {
    const wrapper = shallowMount(ButtonsBar, {
      propsData: {
        actions: [
          { id: 'abc', text: 'action1', icon: 'icon1', close: '0' },
          { id: 'def', text: 'action2', icon: 'icon2', close: '1' }
        ],
        close: { id: 'xyz', text: 'actionend', icon: 'iconend' }
      },
      global: {
        plugins: [i18n]
      }
    })
    expect(wrapper.element.childElementCount).toBe(3)
    expect(wrapper.find('v-spacer').exists()).toBe(true)
    expect(wrapper.find('div').element.childElementCount).toBe(1)
    expect(
      wrapper.find('div:nth-of-type(1) > button-action-stub').getCurrentComponent().props.action
    ).toStrictEqual({ id: 'abc', text: 'action1', icon: 'icon1', close: '0', num: 0 })
    expect(
      wrapper.find('div:nth-of-type(2) > button-action-stub').getCurrentComponent().props.action
    ).toStrictEqual({
      id: 'def',
      text: 'action2',
      icon: 'icon2',
      close: '1',
      num: 1
    })

    expect(wrapper.emitted('clickaction')).toStrictEqual(undefined)
    await wrapper.find('div:nth-of-type(1) > button-action-stub').trigger('click')
    expect(wrapper.emitted('clickaction')).toStrictEqual([
      [{ id: 'abc', text: 'action1', icon: 'icon1', close: '0', num: 0, params: {} }, false, null]
    ])
    await wrapper.find('div:nth-of-type(2) > button-action-stub').trigger('click')
    expect(wrapper.emitted('clickaction')).toStrictEqual([
      [{ id: 'abc', text: 'action1', icon: 'icon1', close: '0', num: 0, params: {} }, false, null],
      [
        {
          id: 'def',
          text: 'action2',
          icon: 'icon2',
          close: '1',
          num: 1,
          params: {}
        },
        false,
        { id: 'xyz', text: 'actionend', icon: 'iconend' }
      ]
    ])
  })
})
