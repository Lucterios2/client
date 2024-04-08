import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { vuetify } from '@/plugins/vuetify'
import { nextTick } from 'vue'

import CheckListComp from '@/components/CheckListComp.vue'
import i18n from '@/libs/i18n.js'

beforeEach(() => {
  console.warn = vi.fn()
})

describe('CheckListComp', () => {
  it('simple check', async () => {
    const wrapper = mount(CheckListComp, {
      global: {
        plugins: [vuetify, i18n]
      },
      props: {
        value: ['1', '3'],
        component: {
          name: 'val1',
          component: 'CHECKLIST',
          x: 0,
          y: 0,
          colspan: 1,
          rowspan: 1,
          tab: 0,
          needed: true,
          case: [
            ['1', 'abc'],
            ['2', 'def'],
            ['3', 'ghij'],
            ['4', 'klmn']
          ],
          simple: '0'
        }
      }
    })
    await nextTick()
    expect(wrapper.element.childElementCount).toBe(1)
    expect(wrapper.find('.v-field_abstract > .v-row').element.childElementCount).toBe(1)
    expect(wrapper.vm.current_value).toStrictEqual(['1', '3'])
    expect(wrapper.find('.v-field_abstract > .v-row > .v-col > select').element.value).toBe('1')
    const options = wrapper.findAll('option')
    expect(options.length).toBe(4)
    expect(wrapper.vm.is_valid()).toBe(true)
  })

  it('multi check', async () => {
    const wrapper = mount(CheckListComp, {
      global: {
        plugins: [vuetify, i18n]
      },
      props: {
        value: ['1', '3'],
        component: {
          name: 'val1',
          component: 'CHECKLIST',
          x: 0,
          y: 0,
          colspan: 1,
          rowspan: 1,
          tab: 0,
          needed: true,
          case: [
            ['1', 'abc'],
            ['2', 'def'],
            ['3', 'ghij'],
            ['4', 'klmn']
          ],
          simple: '2'
        }
      }
    })
    await nextTick()
    expect(wrapper.element.childElementCount).toBe(1)
    expect(wrapper.find('.v-field_abstract > .v-row').element.childElementCount).toBe(3)
    expect(
      wrapper.find('.v-field_abstract > .v-row > .v-col:nth-of-type(2)').element.childElementCount
    ).toBe(4)
    expect(wrapper.vm.current_value).toStrictEqual(['1', '3'])
    expect(
      wrapper
        .findAll('.v-field_abstract > .v-row > .v-col:nth-of-type(1) > select > option')
        .map((opt) => opt.element.value)
    ).toStrictEqual(['2', '4'])
    expect(
      wrapper
        .findAll('.v-field_abstract > .v-row > .v-col:nth-of-type(3) > select > option')
        .map((opt) => opt.element.value)
    ).toStrictEqual(['1', '3'])
    expect(wrapper.vm.is_valid()).toBe(true)
    await wrapper
      .find('.v-field_abstract > .v-row > .v-col:nth-of-type(2) > button:nth-of-type(4)')
      .trigger('click')
    expect(
      wrapper
        .findAll('.v-field_abstract > .v-row > .v-col:nth-of-type(1) > select > option')
        .map((opt) => opt.element.value)
    ).toStrictEqual(['1', '2', '3', '4'])
    expect(
      wrapper
        .findAll('.v-field_abstract > .v-row > .v-col:nth-of-type(3) > select > option')
        .map((opt) => opt.element.value)
    ).toStrictEqual([])
    await wrapper
      .find('.v-field_abstract > .v-row > .v-col:nth-of-type(2) > button:nth-of-type(1)')
      .trigger('click')
    expect(
      wrapper
        .findAll('.v-field_abstract > .v-row > .v-col:nth-of-type(1) > select > option')
        .map((opt) => opt.element.value)
    ).toStrictEqual([])
    expect(
      wrapper
        .findAll('.v-field_abstract > .v-row > .v-col:nth-of-type(3) > select > option')
        .map((opt) => opt.element.value)
    ).toStrictEqual(['1', '2', '3', '4'])
    expect(wrapper.vm.is_valid()).toBe(true)
    expect(wrapper.vm.getValue()).toStrictEqual(['1', '2', '3', '4'])
  })

  /*it('simple action', async () => {
    const wrapper = mount(CheckListComp, {
      global: {
        plugins: [vuetify, i18n]
      },
      props: {
        value: ['1', '3'],
        component: {
          name: 'val1',
          component: 'CHECKLIST',
          x: 0,
          y: 0,
          colspan: 1,
          rowspan: 1,
          tab: 0,
          description: 'check',
          needed: true,
          case: [
            ['1', 'abc'],
            ['2', 'def'],
            ['3', 'ghij'],
            ['4', 'klmn']
          ],
          simple: '0',
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
    expect(
      wrapper
        .find(
          '.v-input__control > .v-selection-control > .v-selection-control__wrapper > .v-selection-control__input > i'
        )
        .attributes().class
    ).toBe('mdi-checkbox-blank-outline mdi v-icon notranslate v-theme--light v-icon--size-default')
    expect(wrapper.find('.v-input__control > .v-selection-control > label').text()).toBe('check')
    expect(wrapper.vm.is_valid()).toBe(true)
    expect(wrapper.emitted('action')).toStrictEqual(undefined)
    await wrapper
      .find(
        '.v-input__control > .v-selection-control > .v-selection-control__wrapper > .v-selection-control__input > input'
      )
      .setValue(false)
    expect(wrapper.emitted('action')).toStrictEqual(undefined)
    await wrapper
      .find(
        '.v-input__control > .v-selection-control > .v-selection-control__wrapper > .v-selection-control__input > input'
      )
      .setValue(true)
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
          params: {
            val1: true
          },
          text: 'Modify',
          unique: '1'
        }
      ]
    ])
  })*/

  it('multi action', async () => {
    const wrapper = mount(CheckListComp, {
      global: {
        plugins: [vuetify, i18n]
      },
      props: {
        value: ['1', '3'],
        component: {
          name: 'val1',
          component: 'CHECKLIST',
          x: 0,
          y: 0,
          colspan: 1,
          rowspan: 1,
          tab: 0,
          description: 'check',
          needed: true,
          case: [
            ['1', 'abc'],
            ['2', 'def'],
            ['3', 'ghij'],
            ['4', 'klmn']
          ],
          simple: '2',
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
    expect(wrapper.find('label').text()).toBe('check')
    expect(wrapper.find('.v-field_abstract > .v-row').element.childElementCount).toBe(3)
    expect(
      wrapper.find('.v-field_abstract > .v-row > .v-col:nth-of-type(2)').element.childElementCount
    ).toBe(4)
    expect(wrapper.vm.current_value).toStrictEqual(['1', '3'])
    expect(wrapper.emitted('action')).toStrictEqual(undefined)
    await wrapper
      .find('.v-field_abstract > .v-row > .v-col:nth-of-type(2) > button:nth-of-type(1)')
      .trigger('click')
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
          params: {
            val1: '1;2;3;4'
          },
          text: 'Modify',
          unique: '1'
        },
        false
      ]
    ])
  })
})
