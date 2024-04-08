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
    ).toStrictEqual({ id: '', text: 'OK', short_icon: 'mdi:mdi-check', close: '1' })

    expect(wrapper.emitted('clickaction')).toStrictEqual(undefined)
    expect(wrapper.emitted('close')).toStrictEqual(undefined)
    await wrapper.find('div > button-action-stub').trigger('click')
    expect(wrapper.emitted('clickaction')).toStrictEqual(undefined)
    expect(wrapper.emitted('close')).toStrictEqual([[true]])
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
    ).toStrictEqual({ id: '', text: 'OK', short_icon: 'mdi:mdi-check', close: '1' })

    expect(wrapper.emitted('clickaction')).toStrictEqual(undefined)
    expect(wrapper.emitted('close')).toStrictEqual(undefined)
    await wrapper.find('div > button-action-stub').trigger('click')
    expect(wrapper.emitted('clickaction')).toStrictEqual([
      [{ id: 'xyz', text: 'actionend', short_icon: 'iconend' }, true]
    ])
    expect(wrapper.emitted('close')).toStrictEqual([[true]])
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
    expect(wrapper.emitted('close')).toStrictEqual(undefined)
    await wrapper.find('div:nth-of-type(1) > button-action-stub').trigger('click')
    expect(wrapper.emitted('clickaction')).toStrictEqual([
      [{ id: 'abc', text: 'action1', icon: 'icon1', close: '0', num: 0 }, false]
    ])
    expect(wrapper.emitted('close')).toStrictEqual(undefined)
    await wrapper.find('div:nth-of-type(2) > button-action-stub').trigger('click')
    expect(wrapper.emitted('clickaction')).toStrictEqual([
      [{ id: 'abc', text: 'action1', icon: 'icon1', close: '0', num: 0 }, false],
      [
        {
          id: 'def',
          text: 'action2',
          icon: 'icon2',
          close: '0',
          num: 1
        },
        false
      ]
    ])
    expect(wrapper.emitted('close')).toStrictEqual(undefined)
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
    expect(wrapper.emitted('close')).toStrictEqual(undefined)
    await wrapper.find('div:nth-of-type(1) > button-action-stub').trigger('click')
    expect(wrapper.emitted('clickaction')).toStrictEqual([
      [{ id: 'abc', text: 'action1', icon: 'icon1', close: '0', num: 0 }, false]
    ])
    expect(wrapper.emitted('close')).toStrictEqual(undefined)
    await wrapper.find('div:nth-of-type(2) > button-action-stub').trigger('click')
    expect(wrapper.emitted('clickaction')).toStrictEqual([
      [{ id: 'abc', text: 'action1', icon: 'icon1', close: '0', num: 0 }, false],
      [
        {
          id: 'def',
          text: 'action2',
          icon: 'icon2',
          close: '1',
          num: 1
        },
        false
      ],
      [{ id: 'xyz', text: 'actionend', icon: 'iconend' }, true]
    ])
    expect(wrapper.emitted('close')).toStrictEqual([[false]])
  })
})
