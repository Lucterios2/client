import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { vuetify } from '@/plugins/vuetify'
import { nextTick } from 'vue'

import DateTimeComp from '@/components/DateTimeComp.vue'
import i18n from '@/libs/i18n.js'

beforeEach(() => {
  console.warn = vi.fn()
})

describe('DateTimeComp', () => {
  it('simple', async () => {
    const wrapper = mount(DateTimeComp, {
      global: {
        plugins: [vuetify, i18n]
      },
      props: {
        value: '2019-04-12 08:24:34',
        component: {
          name: 'val1',
          component: 'DATETIME',
          x: 0,
          y: 0,
          colspan: 1,
          rowspan: 1,
          tab: 0,
          needed: false
        }
      }
    })
    await nextTick()
    expect(wrapper.element.childElementCount).toBe(2)
    expect(
      wrapper.find('.v-input__control > .v-field > .v-field__field > input').element.value
    ).toBe('2019-04-12T08:24')
    expect(wrapper.find('.v-input__control > .v-field > .v-field__field > label').text()).toBe('')
    expect(wrapper.vm.is_valid()).toBe(true)
    expect(wrapper.vm.getValue(true)).toBe('2019-04-12 08:24')
    await wrapper
      .find('.v-input__control > .v-field > .v-field__field > input')
      .setValue('2021-11-27 20:46')
    expect(wrapper.vm.is_valid()).toBe(true)
    expect(wrapper.vm.getValue(true)).toBe('2021-11-27 20:46')
  })

  it('with description + needed', async () => {
    const wrapper = mount(DateTimeComp, {
      global: {
        plugins: [vuetify, i18n]
      },
      props: {
        value: '2019-04-12 08:24:34',
        component: {
          name: 'val1',
          component: 'DATETIME',
          x: 0,
          y: 0,
          colspan: 1,
          rowspan: 1,
          tab: 0,
          description: 'title',
          needed: true
        }
      }
    })
    await nextTick()
    expect(wrapper.element.childElementCount).toBe(2)
    expect(
      wrapper.find('.v-input__control > .v-field > .v-field__field > input').element.value
    ).toBe('2019-04-12T08:24')
    expect(wrapper.find('.v-input__control > .v-field > .v-field__field > label').text()).toBe(
      'title'
    )
    expect(wrapper.vm.is_valid()).toBe(true)
    await wrapper.find('.v-input__control > .v-field > .v-field__field > input').setValue('')
    expect(wrapper.vm.getValue(true)).toBe('NULL')
    expect(wrapper.vm.is_valid()).toBe('Ce champ est obligatoire!')
  })

  it('keyup enter', async () => {
    const wrapper = mount(DateTimeComp, {
      global: {
        plugins: [vuetify, i18n]
      },
      props: {
        value: '2019-04-12 08:24:34',
        component: {
          name: 'val1',
          component: 'DATETIME',
          x: 0,
          y: 0,
          colspan: 1,
          rowspan: 1,
          tab: 0,
          description: '',
          needed: true
        }
      }
    })
    await nextTick()
    expect(wrapper.element.childElementCount).toBe(2)
    expect(
      wrapper.find('.v-input__control > .v-field > .v-field__field > input').element.value
    ).toBe('2019-04-12T08:24')
    await wrapper
      .find('.v-input__control > .v-field > .v-field__field > input')
      .setValue('2021-09-01 04:57')
    expect(wrapper.vm.is_valid()).toBe(true)
    expect(wrapper.emitted('action')).toStrictEqual(undefined)
    await wrapper
      .find('.v-input__control > .v-field > .v-field__field > input')
      .trigger('keyup.enter')
    expect(wrapper.emitted('action')).toStrictEqual([[null, false]])
  })

  it('action', async () => {
    const wrapper = mount(DateTimeComp, {
      global: {
        plugins: [vuetify, i18n]
      },
      props: {
        value: '2019-04-12 08:24:34',
        component: {
          name: 'val1',
          component: 'DATETIME',
          x: 0,
          y: 0,
          colspan: 1,
          rowspan: 1,
          tab: 0,
          description: '',
          needed: true,
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
      wrapper.find('.v-input__control > .v-field > .v-field__field > input').element.value
    ).toBe('2019-04-12T08:24')
    expect(wrapper.find('.v-input__control > .v-field > .v-field__field > label').text()).toBe('')
    expect(wrapper.vm.is_valid()).toBe(true)
    expect(wrapper.emitted('action')).toStrictEqual(undefined)
    await wrapper
      .find('.v-input__control > .v-field > .v-field__field > input')
      .setValue('2019-04-12 08:24')
    wrapper.find('.v-input__control > .v-field > .v-field__field > input').trigger('focusout')
    expect(wrapper.emitted('action')).toStrictEqual(undefined)
    await wrapper
      .find('.v-input__control > .v-field > .v-field__field > input')
      .setValue('2022-01-29 14:08')
    wrapper.find('.v-input__control > .v-field > .v-field__field > input').trigger('focusout')
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
            val1: '2022-01-29 14:08'
          },
          text: 'Modify',
          unique: '1'
        },
        false
      ]
    ])
  })
})
