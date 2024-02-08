import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'

import ButtonsBar from '../ButtonsBar.vue'
import i18n from '../../i18n.js'

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
    ).toStrictEqual({ id: '', text: 'OK', icon: 'mdi:mdi-check', close: '0' })

    expect(wrapper.emitted('clickaction')).toStrictEqual(undefined)
    expect(wrapper.emitted('close')).toStrictEqual(undefined)
    await wrapper.find('div > button-action-stub').trigger('click')
    expect(wrapper.emitted('clickaction')).toStrictEqual(undefined)
    expect(wrapper.emitted('close')).toStrictEqual([[]])
  })

  it('No actions - Close', async () => {
    const wrapper = shallowMount(ButtonsBar, {
      propsData: {
        actions: [],
        close: { id: 'xyz', text: 'actionend', icon: 'iconend' }
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
    ).toStrictEqual({ id: '', text: 'OK', icon: 'mdi:mdi-check', close: '0' })

    expect(wrapper.emitted('clickaction')).toStrictEqual(undefined)
    expect(wrapper.emitted('close')).toStrictEqual(undefined)
    await wrapper.find('div > button-action-stub').trigger('click')
    expect(wrapper.emitted('clickaction')).toStrictEqual([
      [{ id: 'xyz', text: 'actionend', icon: 'iconend' }]
    ])
    expect(wrapper.emitted('close')).toStrictEqual([[]])
  })

  it('Actions - No close', async () => {
    const wrapper = shallowMount(ButtonsBar, {
      propsData: {
        actions: [
          { id: 'abc', text: 'action1', icon: 'icon1', close: '1' },
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
    ).toStrictEqual({ id: 'abc', text: 'action1', icon: 'icon1', close: '1' })
    expect(
      wrapper.find('div:nth-of-type(2) > button-action-stub').getCurrentComponent().props.action
    ).toStrictEqual({
      id: 'def',
      text: 'action2',
      icon: 'icon2',
      close: '0'
    })

    expect(wrapper.emitted('clickaction')).toStrictEqual(undefined)
    expect(wrapper.emitted('close')).toStrictEqual(undefined)
    await wrapper.find('div:nth-of-type(1) > button-action-stub').trigger('click')
    expect(wrapper.emitted('clickaction')).toStrictEqual([
      [{ id: 'abc', text: 'action1', icon: 'icon1', close: '1' }]
    ])
    expect(wrapper.emitted('close')).toStrictEqual(undefined)
    await wrapper.find('div:nth-of-type(2) > button-action-stub').trigger('click')
    expect(wrapper.emitted('clickaction')).toStrictEqual([
      [{ id: 'abc', text: 'action1', icon: 'icon1', close: '1' }],
      [
        {
          id: 'def',
          text: 'action2',
          icon: 'icon2',
          close: '0'
        }
      ]
    ])
    expect(wrapper.emitted('close')).toStrictEqual([[]])
  })

  it('Actions - Close', async () => {
    const wrapper = shallowMount(ButtonsBar, {
      propsData: {
        actions: [
          { id: 'abc', text: 'action1', icon: 'icon1', close: '1' },
          { id: 'def', text: 'action2', icon: 'icon2', close: '0' }
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
    ).toStrictEqual({ id: 'abc', text: 'action1', icon: 'icon1', close: '1' })
    expect(
      wrapper.find('div:nth-of-type(2) > button-action-stub').getCurrentComponent().props.action
    ).toStrictEqual({
      id: 'def',
      text: 'action2',
      icon: 'icon2',
      close: '0'
    })

    expect(wrapper.emitted('clickaction')).toStrictEqual(undefined)
    expect(wrapper.emitted('close')).toStrictEqual(undefined)
    await wrapper.find('div:nth-of-type(1) > button-action-stub').trigger('click')
    expect(wrapper.emitted('clickaction')).toStrictEqual([
      [{ id: 'abc', text: 'action1', icon: 'icon1', close: '1' }]
    ])
    expect(wrapper.emitted('close')).toStrictEqual(undefined)
    await wrapper.find('div:nth-of-type(2) > button-action-stub').trigger('click')
    expect(wrapper.emitted('clickaction')).toStrictEqual([
      [{ id: 'abc', text: 'action1', icon: 'icon1', close: '1' }],
      [
        {
          id: 'def',
          text: 'action2',
          icon: 'icon2',
          close: '0'
        }
      ],
      [{ id: 'xyz', text: 'actionend', icon: 'iconend' }]
    ])
    expect(wrapper.emitted('close')).toStrictEqual([[]])
  })
})
