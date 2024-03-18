import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'

import ImageComp from '@/components/ImageComp.vue'

beforeEach(() => {
  console.warn = vi.fn()
})

describe('ImageComp', () => {
  it('image no type', async () => {
    const wrapper = mount(ImageComp, {
      propsData: {
        value: 'aaa',
        component: { name: 'val1', component: 'AAA', x: 0, y: 0, colspan: 1, rowspan: 1, tab: 0 }
      }
    })
    expect(wrapper.element.childElementCount).toBe(1)
    expect(wrapper.find('img').attributes().src).toBe('data:image/*;base64,aaa')
  })

  it('image base64', async () => {
    const wrapper = mount(ImageComp, {
      propsData: {
        value: 'data:image/png;base64,bbb',
        component: { name: 'val1', component: 'AAA', x: 0, y: 0, colspan: 1, rowspan: 1, tab: 0 }
      }
    })
    expect(wrapper.element.childElementCount).toBe(1)
    expect(wrapper.find('img').attributes().src).toBe('data:image/png;base64,bbb')
  })

  it('image type jpg', async () => {
    const wrapper = mount(ImageComp, {
      propsData: {
        value: 'bbbbb',
        component: {
          name: 'val1',
          component: 'AAA',
          x: 0,
          y: 0,
          colspan: 1,
          rowspan: 1,
          tab: 0,
          type: 'jpg'
        }
      }
    })
    expect(wrapper.element.childElementCount).toBe(1)
    expect(wrapper.find('img').attributes().src).toBe('data:image/jpg;base64,bbbbb')
  })

  it('image type empty', async () => {
    const wrapper = mount(ImageComp, {
      propsData: {
        value: 'cccccc',
        component: {
          name: 'val1',
          component: 'AAA',
          x: 0,
          y: 0,
          colspan: 1,
          rowspan: 1,
          tab: 0,
          type: ''
        }
      }
    })
    expect(wrapper.element.childElementCount).toBe(1)
    expect(wrapper.find('img').attributes().src).toBe('http://localhost:3000/cccccc')
  })
  it('icon', async () => {
    const wrapper = mount(ImageComp, {
      propsData: {
        value: 'dddd',
        component: {
          name: 'val1',
          component: 'AAA',
          x: 0,
          y: 0,
          colspan: 1,
          rowspan: 1,
          tab: 0,
          type: '#'
        }
      }
    })
    expect(wrapper.element.childElementCount).toBe(1)
    expect(wrapper.find('v-icon').text()).toBe('dddd')
    expect(wrapper.find('v-icon').attributes().size).toBe('48px')
  })
})
