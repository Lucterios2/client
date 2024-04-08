import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { vuetify } from '@/plugins/vuetify'
import { nextTick } from 'vue'

import CheckComp from '@/components/CheckComp.vue'
import i18n from '@/libs/i18n.js'

beforeEach(() => {
  console.warn = vi.fn()
})

describe('CheckComp', () => {
  it('simple check', async () => {
    const wrapper = mount(CheckComp, {
      global: {
        plugins: [vuetify, i18n]
      },
      props: {
        value: 1,
        component: {
          name: 'val1',
          component: 'CHECK',
          x: 0,
          y: 0,
          colspan: 1,
          rowspan: 1,
          tab: 0,
          needed: true
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
    ).toBe('mdi-checkbox-marked mdi v-icon notranslate v-theme--light v-icon--size-default')
    expect(wrapper.find('.v-input__control > .v-selection-control').element.childElementCount).toBe(
      1
    )
    expect(wrapper.vm.is_valid()).toBe(true)
    await wrapper
      .find(
        '.v-input__control > .v-selection-control > .v-selection-control__wrapper > .v-selection-control__input > input'
      )
      .setValue(false)
    expect(wrapper.vm.is_valid()).toBe(true)
    expect(wrapper.vm.getValue()).toBe(false)
  })

  it('action', async () => {
    const wrapper = mount(CheckComp, {
      global: {
        plugins: [vuetify, i18n]
      },
      props: {
        value: 0,
        component: {
          name: 'val1',
          component: 'CHECK',
          x: 0,
          y: 0,
          colspan: 1,
          rowspan: 1,
          tab: 0,
          description: 'check',
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
        },
        false
      ]
    ])
  })
})
