import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { vuetify } from '@/plugins/vuetify'
import { nextTick } from 'vue'

import XMLComp from '@/components/XMLComp.vue'
import i18n from '@/libs/i18n.js'

beforeEach(() => {
  console.warn = vi.fn()
})

describe('XMLComp', () => {
  it('simple text', async () => {
    const wrapper = mount(XMLComp, {
      global: {
        plugins: [vuetify, i18n]
      },
      props: {
        value: 'Coucou les amis !\nBise',
        component: {
          name: 'val1',
          component: 'XML',
          description: 'xml',
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
    expect(wrapper.element.childElementCount).toBe(1)
    expect(
      wrapper.find('.v-input__control > .v-field > .v-field__field > textarea').element.value
    ).toBe('Coucou les amis !\nBise')
    expect(wrapper.find('.v-input__control > .v-field > .v-field__field > label').text()).toBe(
      'xml'
    )
    expect(wrapper.vm.is_valid()).toBe(true)
    await wrapper
      .find('.v-input__control > .v-field > .v-field__field > textarea')
      .setValue('Hello word!\nKiss')
    wrapper.find('.v-input__control > .v-field > .v-field__field > textarea').trigger('focusout')
    expect(wrapper.vm.is_valid()).toBe(true)
    expect(wrapper.vm.getValue(true)).toBe('Hello word!\nKiss')
  })

  it('action text', async () => {
    const wrapper = mount(XMLComp, {
      global: {
        plugins: [vuetify, i18n]
      },
      props: {
        value: 'Coucou les amis !\nBise',
        component: {
          name: 'val1',
          component: 'XML',
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
    expect(wrapper.element.childElementCount).toBe(1)
    expect(
      wrapper.find('.v-input__control > .v-field > .v-field__field > textarea').element.value
    ).toBe('Coucou les amis !\nBise')
    expect(wrapper.find('.v-input__control > .v-field > .v-field__field > label').text()).toBe('')
    expect(wrapper.vm.is_valid()).toBe(true)
    expect(wrapper.emitted('action')).toStrictEqual(undefined)
    await wrapper
      .find('.v-input__control > .v-field > .v-field__field > textarea')
      .setValue('Coucou les amis !\nBise')
    wrapper.find('.v-input__control > .v-field > .v-field__field > textarea').trigger('focusout')
    expect(wrapper.emitted('action')).toStrictEqual(undefined)
    await wrapper
      .find('.v-input__control > .v-field > .v-field__field > textarea')
      .setValue('Hello word!\nKiss')
    wrapper.find('.v-input__control > .v-field > .v-field__field > textarea').trigger('focusout')
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
            val1: 'Hello word!\nKiss'
          },
          text: 'Modify',
          unique: '1'
        }
      ]
    ])
  })
})
