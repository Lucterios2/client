import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { vuetify } from '@/plugins/vuetify'
import { nextTick } from 'vue'

import FloatComp from '@/components/FloatComp.vue'
import i18n from '@/libs/i18n.js'

beforeEach(() => {
  console.warn = vi.fn()
})

describe('FloatComp', () => {
  it('simple float', async () => {
    const wrapper = mount(FloatComp, {
      global: {
        plugins: [vuetify, i18n]
      },
      props: {
        value: '123.456',
        component: {
          name: 'val1',
          component: 'FLOAT',
          x: 0,
          y: 0,
          colspan: 1,
          rowspan: 1,
          tab: 0,
          needed: true,
          min: 0.0,
          max: 10000.0,
          prec: 2
        }
      }
    })
    await nextTick()
    expect(wrapper.element.childElementCount).toBe(2)
    expect(
      wrapper.find('.v-input__control > .v-field > .v-field__field > input').element.value
    ).toBe('123.46')
    expect(wrapper.find('.v-input__control > .v-field > .v-field__field > label').text()).toBe('')
    expect(wrapper.vm.is_valid()).toBe(true)
    await wrapper.find('.v-input__control > .v-field > .v-field__field > input').setValue(657.7777)
    wrapper.find('.v-input__control > .v-field > .v-field__field > input').trigger('focusout')
    expect(wrapper.vm.is_valid()).toBe(true)
    expect(wrapper.vm.getValue()).toBe(657.78)
  })

  it('keyup enter', async () => {
    const wrapper = mount(FloatComp, {
      global: {
        plugins: [vuetify, i18n]
      },
      props: {
        value: '6.5',
        component: {
          name: 'val1',
          component: 'FLOAT',
          x: 0,
          y: 0,
          colspan: 1,
          rowspan: 1,
          tab: 0,
          description: 'Real',
          needed: true,
          min: 0.0,
          max: 10.0,
          prec: 1
        }
      }
    })
    await nextTick()
    expect(wrapper.element.childElementCount).toBe(2)
    expect(
      wrapper.find('.v-input__control > .v-field > .v-field__field > input').element.value
    ).toBe('6.5')
    expect(wrapper.find('.v-input__control > .v-field > .v-field__field > label').text()).toBe(
      'Real'
    )
    await wrapper.find('.v-input__control > .v-field > .v-field__field > input').setValue('7.4')
    expect(wrapper.vm.is_valid()).toBe(true)
    expect(wrapper.emitted('action')).toStrictEqual(undefined)
    await wrapper
      .find('.v-input__control > .v-field > .v-field__field > input')
      .trigger('keyup.enter')
    expect(wrapper.emitted('action')).toStrictEqual([[null]])
  })

  it('action', async () => {
    const wrapper = mount(FloatComp, {
      global: {
        plugins: [vuetify, i18n]
      },
      props: {
        value: '54.9',
        component: {
          name: 'val1',
          component: 'FLOAT',
          x: 0,
          y: 0,
          colspan: 1,
          rowspan: 1,
          tab: 0,
          description: '',
          needed: true,
          min: 10.0,
          max: 60.0,
          prec: 1,
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
    ).toBe('54.9')
    expect(wrapper.find('.v-input__control > .v-field > .v-field__field > label').text()).toBe('')
    expect(wrapper.vm.is_valid()).toBe(true)
    expect(wrapper.emitted('action')).toStrictEqual(undefined)
    await wrapper.find('.v-input__control > .v-field > .v-field__field > input').setValue(54.9)
    wrapper.find('.v-input__control > .v-field > .v-field__field > input').trigger('focusout')
    expect(wrapper.emitted('action')).toStrictEqual(undefined)
    await wrapper.find('.v-input__control > .v-field > .v-field__field > input').setValue(57.4)
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
          params: {
            val1: 57.4
          },
          text: 'Modify',
          unique: '1'
        }
      ]
    ])
  })
})
