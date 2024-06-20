import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { vuetify } from '@/plugins/vuetify'
import { nextTick } from 'vue'

import TimeComp from '@/components/TimeComp.vue'
import i18n from '@/libs/i18n.js'

beforeEach(() => {
  console.warn = vi.fn()
})

describe('TimeComp', () => {
  it('simple', async () => {
    const wrapper = mount(TimeComp, {
      global: {
        plugins: [vuetify, i18n]
      },
      props: {
        value: '11:25:00',
        component: {
          name: 'val1',
          component: 'TIME',
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
    ).toBe('11:25')
    expect(wrapper.find('.v-input__control > .v-field > .v-field__field > label').text()).toBe('')
    expect(wrapper.vm.is_valid()).toBe(true)
    expect(wrapper.vm.getValue(true)).toBe('11:25')
    await wrapper.find('.v-input__control > .v-field > .v-field__field > input').setValue('13:57')
    expect(wrapper.vm.is_valid()).toBe(true)
    expect(wrapper.vm.getValue(true)).toBe('13:57')
  })

  it('with description + needed', async () => {
    const wrapper = mount(TimeComp, {
      global: {
        plugins: [vuetify, i18n]
      },
      props: {
        value: '11:25:00',
        component: {
          name: 'val1',
          component: 'TIME',
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
    ).toBe('11:25')
    expect(wrapper.find('.v-input__control > .v-field > .v-field__field > label').text()).toBe(
      'title'
    )
    expect(wrapper.vm.is_valid()).toBe(true)
    await wrapper.find('.v-input__control > .v-field > .v-field__field > input').setValue('')
    expect(wrapper.vm.getValue(true)).toBe('NULL')
    expect(wrapper.vm.is_valid()).toBe('Ce champ est obligatoire!')
  })

  it('keyup enter', async () => {
    const wrapper = mount(TimeComp, {
      global: {
        plugins: [vuetify, i18n]
      },
      props: {
        value: '11:25:00',
        component: {
          name: 'val1',
          component: 'TIME',
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
    ).toBe('11:25')
    await wrapper.find('.v-input__control > .v-field > .v-field__field > input').setValue('23:02')
    expect(wrapper.vm.is_valid()).toBe(true)
    expect(wrapper.emitted('action')).toStrictEqual(undefined)
    await wrapper
      .find('.v-input__control > .v-field > .v-field__field > input')
      .trigger('keyup.enter')
    expect(wrapper.emitted('action')).toStrictEqual([[null, false]])
  })

  it('action', async () => {
    const wrapper = mount(TimeComp, {
      global: {
        plugins: [vuetify, i18n]
      },
      props: {
        value: '11:25:00',
        component: {
          name: 'val1',
          component: 'TIME',
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
    ).toBe('11:25')
    expect(wrapper.find('.v-input__control > .v-field > .v-field__field > label').text()).toBe('')
    expect(wrapper.vm.is_valid()).toBe(true)
    expect(wrapper.emitted('action')).toStrictEqual(undefined)
    await wrapper.find('.v-input__control > .v-field > .v-field__field > input').setValue('11:25')
    wrapper.find('.v-input__control > .v-field > .v-field__field > input').trigger('focusout')
    expect(wrapper.emitted('action')).toStrictEqual(undefined)
    await wrapper.find('.v-input__control > .v-field > .v-field__field > input').setValue('15:37')
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
            val1: '15:37'
          },
          text: 'Modify',
          unique: '1'
        },
        false
      ]
    ])
  })
})
