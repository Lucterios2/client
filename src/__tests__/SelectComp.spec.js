import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { vuetify } from '@/plugins/vuetify'
import { nextTick } from 'vue'

import SelectComp from '@/components/SelectComp.vue'
import i18n from '@/libs/i18n.js'

beforeEach(() => {
  console.warn = vi.fn()
})

describe('SelectComp', () => {
  it('simple select', async () => {
    const wrapper = mount(SelectComp, {
      global: {
        plugins: [vuetify, i18n]
      },
      props: {
        value: '1',
        component: {
          name: 'val1',
          component: 'SELECT',
          x: 0,
          y: 0,
          colspan: 1,
          rowspan: 1,
          tab: 0,
          needed: true,
          case: [
            ['1', 'abc'],
            ['2', 'def'],
            ['3', 'ghij']
          ]
        }
      }
    })
    await nextTick()
    expect(wrapper.element.childElementCount).toBe(1)
    expect(wrapper.find('div.checklist').element.childElementCount).toBe(1)
    expect(wrapper.find('div.checklist > div.v-field_abstract').element.childElementCount).toBe(1)
    expect(wrapper.find('div.checklist > div.v-field_abstract > select').element.name).toBe('val1')
    expect(wrapper.find('div.checklist > div.v-field_abstract > select').element.value).toBe('1')
    expect(
      wrapper.find('div.checklist > div.v-field_abstract > select').element.childElementCount
    ).toBe(3)
    expect(
      wrapper.find('div.checklist > div.v-field_abstract > select > option:nth-of-type(1)').element
        .value
    ).toBe('1')
    expect(
      wrapper.find('div.checklist > div.v-field_abstract > select > option:nth-of-type(1)').text()
    ).toBe('abc')
    expect(
      wrapper.find('div.checklist > div.v-field_abstract > select > option:nth-of-type(2)').element
        .value
    ).toBe('2')
    expect(
      wrapper.find('div.checklist > div.v-field_abstract > select > option:nth-of-type(2)').text()
    ).toBe('def')
    expect(
      wrapper.find('div.checklist > div.v-field_abstract > select > option:nth-of-type(3)').element
        .value
    ).toBe('3')
    expect(
      wrapper.find('div.checklist > div.v-field_abstract > select > option:nth-of-type(3)').text()
    ).toBe('ghij')
    expect(wrapper.vm.is_valid()).toBe(true)
    expect(wrapper.vm.getValue()).toStrictEqual('1')
    expect(wrapper.emitted('action')).toStrictEqual(undefined)
    await wrapper.find('div.checklist > div.v-field_abstract > select').setValue('2')
    expect(wrapper.vm.getValue()).toStrictEqual('2')
    expect(wrapper.emitted('action')).toStrictEqual(undefined)
  })

  it('with description', async () => {
    const wrapper = mount(SelectComp, {
      global: {
        plugins: [vuetify, i18n]
      },
      props: {
        value: '3',
        component: {
          name: 'val1',
          component: 'CHECK',
          x: 0,
          y: 0,
          colspan: 1,
          rowspan: 1,
          tab: 0,
          description: 'select',
          needed: true,
          case: [
            ['1', 'abc'],
            ['2', 'def'],
            ['3', 'ghij']
          ],
          action: {
            text: 'Modify',
            id: 'ext/act',
            extension: 'ext',
            action: 'act',
            modal: '1',
            close: '0',
            unique: '1',
            method: 'POST',
            params: null,
            name: 'edt1'
          }
        }
      }
    })
    await nextTick()
    expect(wrapper.element.childElementCount).toBe(2)
    expect(wrapper.find('div.checklist').element.childElementCount).toBe(2)
    expect(wrapper.find('div.checklist > label.v-label').text()).toBe('select')
    expect(wrapper.find('div.checklist > div.v-field_abstract').element.childElementCount).toBe(1)
    expect(wrapper.find('div.checklist > div.v-field_abstract > select').element.name).toBe('val1')
    expect(wrapper.find('div.checklist > div.v-field_abstract > select').element.value).toBe('3')
    expect(
      wrapper.find('div.checklist > div.v-field_abstract > select').element.childElementCount
    ).toBe(3)
    expect(
      wrapper.find('div.checklist > div.v-field_abstract > select > option:nth-of-type(1)').element
        .value
    ).toBe('1')
    expect(
      wrapper.find('div.checklist > div.v-field_abstract > select > option:nth-of-type(1)').text()
    ).toBe('abc')
    expect(
      wrapper.find('div.checklist > div.v-field_abstract > select > option:nth-of-type(2)').element
        .value
    ).toBe('2')
    expect(
      wrapper.find('div.checklist > div.v-field_abstract > select > option:nth-of-type(2)').text()
    ).toBe('def')
    expect(
      wrapper.find('div.checklist > div.v-field_abstract > select > option:nth-of-type(3)').element
        .value
    ).toBe('3')
    expect(
      wrapper.find('div.checklist > div.v-field_abstract > select > option:nth-of-type(3)').text()
    ).toBe('ghij')
    expect(wrapper.vm.is_valid()).toBe(true)
    expect(wrapper.vm.getValue()).toStrictEqual('3')
    expect(wrapper.emitted('action')).toStrictEqual(undefined)
    await wrapper.find('div.checklist > div.v-field_abstract > select').setValue('2')
    expect(wrapper.vm.getValue()).toStrictEqual('2')
    expect(wrapper.emitted('action')).toStrictEqual([
      [
        {
          action: 'act',
          close: '0',
          extension: 'ext',
          id: 'ext/act',
          method: 'POST',
          modal: '1',
          name: 'edt1',
          no_check: true,
          params: {
            val1: '2'
          },
          text: 'Modify',
          unique: '1'
        },
        false
      ]
    ])
  })
})
