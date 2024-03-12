import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import ButtonComp from '@/components/ButtonComp.vue'
import { convert_event_to_object } from '@/__tests__/tools.js'
import { nextTick } from 'vue'

describe('ButtonComp', () => {
  it('no action', async () => {
    const wrapper = mount(ButtonComp, {
      propsData: {
        value: '',
        component: { name: 'btn1', component: 'BUTTON', x: 0, y: 0, colspan: 1, rowspan: 1, tab: 0 }
      }
    })
    await nextTick()
    expect(wrapper.html()).toBe('<!--v-if-->')
  })

  it('simple action', async () => {
    const wrapper = mount(ButtonComp, {
      propsData: {
        value: '',
        component: {
          name: 'btn1',
          component: 'BUTTON',
          x: 0,
          y: 0,
          colspan: 1,
          rowspan: 1,
          tab: 0,
          action: {
            id: 'def',
            text: 'action btn',
            icon: 'icon',
            close: '0',
            params: { value: 54.65 }
          }
        }
      }
    })
    await nextTick()
    expect(wrapper.emitted('action')).toStrictEqual(undefined)
    expect(wrapper.element.childElementCount).toBe(1)
    expect(wrapper.find('div > v-btn > span').text()).toBe('action btn')
    expect(wrapper.find('div > v-btn > img').attributes('src')).toBe('http://localhost:3000/icon')
    await wrapper.find('div > v-btn').trigger('click')
    expect(convert_event_to_object(wrapper.emitted('action'))).toStrictEqual([
      [
        {
          id: 'def',
          text: 'action btn',
          icon: 'icon',
          close: '0',
          params: { value: 54.65 }
        }
      ]
    ])
  })
})
