import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { vuetify } from '@/plugins/vuetify'
import { nextTick } from 'vue'

import EditComp from '@/components/EditComp.vue'
import i18n from '@/libs/i18n.js'

describe('EditComp', () => {
  it('simple', async () => {
    const wrapper = mount(EditComp, {
      global: {
        plugins: [vuetify, i18n]
      },
      props: {
        value: 'aaa',
        component: {
          name: 'val1',
          component: 'AAA',
          x: 0,
          y: 0,
          colspan: 1,
          rowspan: 1,
          tab: 0,
          needed: false,
          size: -1,
          reg_expr: ''
        }
      }
    })
    await nextTick()
    expect(wrapper.element.childElementCount).toBe(2)
    expect(
      wrapper.find('.v-input__control > .v-field > .v-field__field > input').element.value
    ).toBe('aaa')
    expect(wrapper.find('.v-input__control > .v-field > .v-field__field > label').text()).toBe('')
    expect(wrapper.vm.is_valid()).toBe(true)
    await wrapper.find('.v-input__control > .v-field > .v-field__field > input').setValue('bbb')
    expect(wrapper.vm.is_valid()).toBe(true)
    expect(wrapper.vm.getValue()).toBe('bbb')
  })

  it('with description + needed', async () => {
    const wrapper = mount(EditComp, {
      global: {
        plugins: [vuetify, i18n]
      },
      props: {
        value: 'ccc',
        component: {
          name: 'val1',
          component: 'AAA',
          x: 0,
          y: 0,
          colspan: 1,
          rowspan: 1,
          tab: 0,
          description: 'title',
          needed: true,
          size: -1,
          reg_expr: ''
        }
      }
    })
    await nextTick()
    expect(wrapper.element.childElementCount).toBe(2)
    expect(
      wrapper.find('.v-input__control > .v-field > .v-field__field > input').element.value
    ).toBe('ccc')
    expect(wrapper.find('.v-input__control > .v-field > .v-field__field > label').text()).toBe(
      'title'
    )
    expect(wrapper.vm.is_valid()).toBe(true)
    await wrapper.find('.v-input__control > .v-field > .v-field__field > input').setValue('')
    expect(wrapper.vm.is_valid()).toBe('Ce champ est obligatoire!')
  })

  it('Too long', async () => {
    const wrapper = mount(EditComp, {
      global: {
        plugins: [vuetify, i18n]
      },
      props: {
        value: 'dddd',
        component: {
          name: 'val1',
          component: 'AAA',
          x: 0,
          y: 0,
          colspan: 1,
          rowspan: 1,
          tab: 0,
          description: '',
          needed: true,
          size: 10,
          reg_expr: ''
        }
      }
    })
    await nextTick()
    expect(wrapper.element.childElementCount).toBe(2)
    expect(
      wrapper.find('.v-input__control > .v-field > .v-field__field > input').element.value
    ).toBe('dddd')
    expect(wrapper.find('.v-input__control > .v-field > .v-field__field > label').text()).toBe('')
    expect(wrapper.vm.is_valid()).toBe(true)
    await wrapper
      .find('.v-input__control > .v-field > .v-field__field > input')
      .setValue('abcdefghijklmn')
    expect(wrapper.vm.is_valid()).toBe('Taille trop longue!')
  })

  it('reg exp', async () => {
    const wrapper = mount(EditComp, {
      global: {
        plugins: [vuetify, i18n]
      },
      props: {
        value: 'azerty',
        component: {
          name: 'val1',
          component: 'AAA',
          x: 0,
          y: 0,
          colspan: 1,
          rowspan: 1,
          tab: 0,
          description: '',
          needed: true,
          size: -1,
          reg_expr: '^[a-z]*$'
        }
      }
    })
    await nextTick()
    expect(wrapper.element.childElementCount).toBe(2)
    expect(
      wrapper.find('.v-input__control > .v-field > .v-field__field > input').element.value
    ).toBe('azerty')
    expect(wrapper.find('.v-input__control > .v-field > .v-field__field > label').text()).toBe('')
    expect(wrapper.vm.is_valid()).toBe(true)
    await wrapper.find('.v-input__control > .v-field > .v-field__field > input').setValue('abc123')
    expect(wrapper.vm.is_valid()).toBe('Format invalide!')
  })

  it('keyup enter', async () => {
    const wrapper = mount(EditComp, {
      global: {
        plugins: [vuetify, i18n]
      },
      props: {
        value: 'azerty',
        component: {
          name: 'val1',
          component: 'AAA',
          x: 0,
          y: 0,
          colspan: 1,
          rowspan: 1,
          tab: 0,
          description: '',
          needed: true,
          size: -1,
          reg_expr: ''
        }
      }
    })
    await nextTick()
    expect(wrapper.element.childElementCount).toBe(2)
    expect(
      wrapper.find('.v-input__control > .v-field > .v-field__field > input').element.value
    ).toBe('azerty')
    await wrapper.find('.v-input__control > .v-field > .v-field__field > input').setValue('abc123')
    expect(wrapper.vm.is_valid()).toBe(true)
    expect(wrapper.emitted('action')).toStrictEqual(undefined)
    await wrapper
      .find('.v-input__control > .v-field > .v-field__field > input')
      .trigger('keyup.enter')
    expect(wrapper.emitted('action')).toStrictEqual([[null]])
  })

  it('action', async () => {
    const wrapper = mount(EditComp, {
      global: {
        plugins: [vuetify, i18n]
      },
      props: {
        value: 'wxcvbn',
        component: {
          name: 'val1',
          component: 'AAA',
          x: 0,
          y: 0,
          colspan: 1,
          rowspan: 1,
          tab: 0,
          description: '',
          needed: true,
          size: -1,
          reg_expr: '',
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
    ).toBe('wxcvbn')
    expect(wrapper.find('.v-input__control > .v-field > .v-field__field > label').text()).toBe('')
    expect(wrapper.vm.is_valid()).toBe(true)
    expect(wrapper.emitted('action')).toStrictEqual(undefined)
    await wrapper.find('.v-input__control > .v-field > .v-field__field > input').setValue('wxcvbn')
    wrapper.find('.v-input__control > .v-field > .v-field__field > input').trigger('focusout')
    expect(wrapper.emitted('action')).toStrictEqual(undefined)
    await wrapper.find('.v-input__control > .v-field > .v-field__field > input').setValue('qsdfgh')
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
            val1: 'qsdfgh'
          },
          text: 'Modify',
          unique: '1'
        }
      ]
    ])
  })
})
