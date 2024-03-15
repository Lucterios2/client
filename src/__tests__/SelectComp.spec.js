import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { vuetify } from '@/plugins/vuetify'
import { nextTick } from 'vue'

import SelectComp from '@/components/SelectComp.vue'
import i18n from '@/libs/i18n.js'

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
    expect(wrapper.element.childElementCount).toBe(2)
    expect(
      wrapper
        .find(
          '.v-input__control > .v-field > .v-field__field > .v-field__input > .v-select__selection > span'
        )
        .text()
    ).toBe('abc')
    expect(wrapper.find('.v-input__control > .v-field > .v-field__field > label').text()).toBe('')
    expect(wrapper.vm.is_valid()).toBe(true)
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
    expect(
      wrapper
        .find(
          '.v-input__control > .v-field > .v-field__field > .v-field__input > .v-select__selection > span'
        )
        .text()
    ).toBe('ghij')
    expect(wrapper.find('.v-input__control > .v-field > .v-field__field > label').text()).toBe(
      'select'
    )
    expect(wrapper.emitted('action')).toStrictEqual(undefined)
  })
})
