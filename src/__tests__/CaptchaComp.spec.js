import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import i18n from '@/libs/i18n.js'
import CaptchaComp from '@/components/CaptchaComp.vue'
import { nextTick } from 'vue'

describe('CaptchaComp', () => {
  it('simple', async () => {
    const wrapper = mount(CaptchaComp, {
      propsData: {
        value: 'aaa',
        component: {
          name: 'val1',
          component: 'CAPTCHA',
          description: 'captcha',
          x: 0,
          y: 0,
          colspan: 1,
          rowspan: 1,
          tab: 0
        }
      },
      global: {
        plugins: [i18n]
      }
    })
    await nextTick()
    expect(wrapper.element.childElementCount).toBe(2)
    const num1 = wrapper.vm.num1
    const operationTxt = wrapper.vm.operationTxt
    const total = wrapper.vm.total
    expect(wrapper.get('div').attributes().class).toBe('in_error')
    expect(wrapper.find('label').text()).toBe('captcha')
    expect(wrapper.find('.v-field_abstract').element.childElementCount).toBe(4)
    expect(wrapper.find('.v-field_abstract > span:nth-of-type(1)').text()).toBe(String(num1))
    expect(wrapper.find('.v-field_abstract > span:nth-of-type(2)').text()).toBe(operationTxt)
    expect(wrapper.find('.v-field_abstract > input').element.value).toBe('')
    expect(wrapper.find('.v-field_abstract > span:nth-of-type(3)').text()).toBe(String(total))
    expect(wrapper.vm.is_valid()).toBe(false)
    expect(wrapper.find('.error-captcha').exists()).toBe(true)
    expect(wrapper.find('.error-captcha').text()).toBe('Mauvais Captcha!')
    if (operationTxt == '+') {
      wrapper.find('.v-field_abstract > input').setValue(String(total - num1))
    } else if (operationTxt == '-') {
      wrapper.find('.v-field_abstract > input').setValue(String(num1 - total))
    } else {
      wrapper.find('.v-field_abstract > input').setValue(String(total / num1))
    }
    await nextTick()
    expect(wrapper.get('div').attributes().class).toBe('')
    expect(wrapper.vm.is_valid()).toBe(true)
    expect(wrapper.find('.error-captcha').exists()).toBe(false)

    expect(wrapper.emitted('action')).toStrictEqual(undefined)
    await wrapper.find('.v-field_abstract > input').trigger('keyup.enter')
    expect(wrapper.emitted('action')).toStrictEqual([[null]])
  })
})
