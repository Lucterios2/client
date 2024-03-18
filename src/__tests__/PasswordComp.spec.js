import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { vuetify } from '@/plugins/vuetify'
import { nextTick } from 'vue'

import PasswordComp from '@/components/PasswordComp.vue'
import i18n from '@/libs/i18n.js'

beforeEach(() => {
  console.warn = vi.fn()
})

describe('PasswordComp', () => {
  it('simple', async () => {
    const wrapper = mount(PasswordComp, {
      global: {
        plugins: [vuetify, i18n]
      },
      props: {
        value: '',
        component: {
          name: 'val1',
          component: 'PASSWD',
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
      wrapper.find('.v-input__control > .v-field > .v-field__field > input').element.value
    ).toBe('')
    expect(wrapper.find('.v-input__control > .v-field > .v-field__field > label').text()).toBe('')
    expect(wrapper.vm.is_valid()).toBe('Mot de passe trop court!')
    await wrapper.find('.v-input__control > .v-field > .v-field__field > input').setValue('bbb')
    expect(wrapper.vm.is_valid()).toBe('Mot de passe trop court!')
    await wrapper.find('.v-input__control > .v-field > .v-field__field > input').setValue('abcdefg')
    expect(wrapper.vm.is_valid()).toBe('Mot de passe trop simple!')
    await wrapper
      .find('.v-input__control > .v-field > .v-field__field > input')
      .setValue('abcde123AAA')
    expect(wrapper.vm.is_valid()).toBe(true)
    expect(wrapper.vm.getValue()).toBe('abcde123AAA')
  })

  it('no need', async () => {
    const wrapper = mount(PasswordComp, {
      global: {
        plugins: [vuetify, i18n]
      },
      props: {
        value: '',
        component: {
          name: 'val1',
          component: 'PASSWD',
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
    ).toBe('')
    expect(wrapper.find('.v-input__control > .v-field > .v-field__field > label').text()).toBe('')
    expect(wrapper.vm.is_valid()).toBe(true)
    await wrapper.find('.v-input__control > .v-field > .v-field__field > input').setValue('bbb')
    expect(wrapper.vm.is_valid()).toBe('Mot de passe trop court!')
    await wrapper.find('.v-input__control > .v-field > .v-field__field > input').setValue('abcdefg')
    expect(wrapper.vm.is_valid()).toBe('Mot de passe trop simple!')
    await wrapper
      .find('.v-input__control > .v-field > .v-field__field > input')
      .setValue('abcde123AAA')
    expect(wrapper.vm.is_valid()).toBe(true)
    expect(wrapper.vm.getValue()).toBe('abcde123AAA')
  })

  it('keyup enter', async () => {
    const wrapper = mount(PasswordComp, {
      global: {
        plugins: [vuetify, i18n]
      },
      props: {
        value: '',
        component: {
          name: 'val1',
          component: 'PASSWD',
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
    ).toBe('')
    await wrapper
      .find('.v-input__control > .v-field > .v-field__field > input')
      .setValue('abc123XYZ')
    expect(wrapper.vm.is_valid()).toBe(true)
    expect(wrapper.emitted('action')).toStrictEqual(undefined)
    await wrapper
      .find('.v-input__control > .v-field > .v-field__field > input')
      .trigger('keyup.enter')
    expect(wrapper.emitted('action')).toStrictEqual([[null]])
  })

  it('action', async () => {
    const wrapper = mount(PasswordComp, {
      global: {
        plugins: [vuetify, i18n]
      },
      props: {
        value: '',
        component: {
          name: 'val1',
          component: 'PASSWD',
          x: 0,
          y: 0,
          colspan: 1,
          rowspan: 1,
          tab: 0,
          description: 'password',
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
    ).toBe('')
    expect(wrapper.find('.v-input__control > .v-field > .v-field__field > label').text()).toBe(
      'password'
    )
    expect(wrapper.vm.is_valid()).toBe('Mot de passe trop court!')
    expect(wrapper.emitted('action')).toStrictEqual(undefined)
    await wrapper
      .find('.v-input__control > .v-field > .v-field__field > input')
      .setValue('abcd1234XYZ')
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
            val1: 'abcd1234XYZ'
          },
          text: 'Modify',
          unique: '1'
        }
      ]
    ])
  })
})
