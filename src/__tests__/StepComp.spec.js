import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

import StepComp from '@/components/StepComp.vue'
import i18n from '@/libs/i18n.js'

beforeEach(() => {
  console.warn = vi.fn()
})

describe('StepComp', () => {
  it('simple Step', async () => {
    const wrapper = mount(StepComp, {
      global: {
        plugins: [i18n]
      },
      props: {
        value: '3',
        component: {
          name: 'val1',
          component: 'Step',
          x: 0,
          y: 0,
          colspan: 1,
          rowspan: 1,
          tab: 0,
          description: '',
          needed: true,
          max: 5
        }
      }
    })
    await nextTick()
    expect(wrapper.element.childElementCount).toBe(1)
    expect(wrapper.find('.v-field_abstract').element.childElementCount).toBe(3)
    expect(wrapper.find('.v-field_abstract > v-btn:nth-of-type(1)').attributes()).toEqual({
      class: 'step_btn',
      disabled: 'false',
      'prepend-icon': 'mdi mdi-chevron-left'
    })
    expect(wrapper.find('.v-field_abstract > v-rating').attributes()).toEqual({
      'empty-icon': 'mdi-square-outline',
      'full-icon': 'mdi-square',
      length: '5',
      modelvalue: '3',
      name: 'val1',
      readonly: ''
    })
    expect(wrapper.find('.v-field_abstract > v-btn:nth-of-type(2)').attributes()).toEqual({
      class: 'step_btn',
      disabled: 'false',
      'append-icon': 'mdi mdi-chevron-right'
    })
    expect(wrapper.vm.getValue()).toBe(3)

    wrapper.find('.v-field_abstract > v-btn:nth-of-type(1)').trigger('click')
    await nextTick()
    expect(wrapper.vm.getValue()).toBe(2)
    wrapper.find('.v-field_abstract > v-btn:nth-of-type(1)').trigger('click')
    await nextTick()
    expect(wrapper.vm.getValue()).toBe(1)
    wrapper.find('.v-field_abstract > v-btn:nth-of-type(1)').trigger('click')
    await nextTick()
    expect(wrapper.vm.getValue()).toBe(1)
    expect(wrapper.find('.v-field_abstract > v-btn:nth-of-type(1)').attributes()).toEqual({
      class: 'step_btn',
      disabled: 'true',
      'prepend-icon': 'mdi mdi-chevron-left'
    })

    wrapper.find('.v-field_abstract > v-btn:nth-of-type(2)').trigger('click')
    await nextTick()
    expect(wrapper.vm.getValue()).toBe(2)
    wrapper.find('.v-field_abstract > v-btn:nth-of-type(2)').trigger('click')
    await nextTick()
    expect(wrapper.vm.getValue()).toBe(3)
    wrapper.find('.v-field_abstract > v-btn:nth-of-type(2)').trigger('click')
    await nextTick()
    expect(wrapper.vm.getValue()).toBe(4)
    wrapper.find('.v-field_abstract > v-btn:nth-of-type(2)').trigger('click')
    await nextTick()
    expect(wrapper.vm.getValue()).toBe(5)
    wrapper.find('.v-field_abstract > v-btn:nth-of-type(2)').trigger('click')
    await nextTick()
    expect(wrapper.vm.getValue()).toBe(5)
    expect(wrapper.find('.v-field_abstract > v-btn:nth-of-type(2)').attributes()).toEqual({
      class: 'step_btn',
      disabled: 'true',
      'append-icon': 'mdi mdi-chevron-right'
    })
  })

  it('action', async () => {
    const wrapper = mount(StepComp, {
      global: {
        plugins: [i18n]
      },
      props: {
        value: '5',
        component: {
          name: 'val1',
          component: 'Step',
          x: 0,
          y: 0,
          colspan: 1,
          rowspan: 1,
          tab: 0,
          description: 'title',
          needed: true,
          max: 8,
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
    expect(wrapper.find('label').text()).toBe('title')
    expect(wrapper.find('.v-field_abstract').element.childElementCount).toBe(3)
    expect(wrapper.find('.v-field_abstract > v-btn:nth-of-type(1)').attributes()).toEqual({
      class: 'step_btn',
      disabled: 'false',
      'prepend-icon': 'mdi mdi-chevron-left'
    })
    expect(wrapper.find('.v-field_abstract > v-rating').attributes()).toEqual({
      'empty-icon': 'mdi-square-outline',
      'full-icon': 'mdi-square',
      length: '8',
      modelvalue: '5',
      name: 'val1',
      readonly: ''
    })
    expect(wrapper.find('.v-field_abstract > v-btn:nth-of-type(2)').attributes()).toEqual({
      class: 'step_btn',
      disabled: 'false',
      'append-icon': 'mdi mdi-chevron-right'
    })
    expect(wrapper.vm.getValue()).toBe(5)

    wrapper.find('.v-field_abstract > v-btn:nth-of-type(1)').trigger('click')
    await nextTick()
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
            val1: 4
          },
          text: 'Modify',
          unique: '1'
        },
        false
      ]
    ])
    wrapper.find('.v-field_abstract > v-btn:nth-of-type(2)').trigger('click')
    await nextTick()
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
            val1: 4
          },
          text: 'Modify',
          unique: '1'
        },
        false
      ],
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
            val1: 5
          },
          text: 'Modify',
          unique: '1'
        },
        false
      ]
    ])
  })
})
