import { describe, it, expect, beforeEach, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { createApp } from 'vue'

import CustomComponents from '@/components/CustomComponents.vue'
import { initialObserver } from '@/libs/observer'
import { factory_components } from '@/components/tools'
import storage from '@/libs/datastorage.js'
import i18n from '@/libs/i18n.js'

beforeEach(() => {
  document.documentElement.innerHTML = '<html><body><div id="app"></div></body></html>'
  console.warn = vi.fn()
  const app = createApp({})
  app.use(storage)
  app.use(i18n)
  app.mount('#app')
  initialObserver(app)
  vi.mock('@/components/tools', () => {
    return {
      factory_components: vi.fn(() => 'div')
    }
  })
})

describe('CustomComponents', () => {
  it('Simple labels', async () => {
    const wrapper = shallowMount(CustomComponents, {
      propsData: {
        data: { val1: 'aaa', val2: 'bbb' },
        comp: [
          { name: 'val1', component: 'AAA', x: 0, y: 0, colspan: 1, rowspan: 1, tab: 0 },
          { name: 'val2', component: 'BBB', x: 0, y: 1, colspan: 1, rowspan: 1, tab: 0 }
        ],
        meta: {}
      }
    })
    expect(wrapper.element.childElementCount).toBe(1)
    expect(wrapper.find('table').element.childElementCount).toBe(2)
    expect(wrapper.find('table > tr:nth-of-type(1)').element.childElementCount).toBe(1)
    expect(wrapper.find('table > tr:nth-of-type(1) > td').element.childElementCount).toBe(1)
    expect(wrapper.find('table > tr:nth-of-type(1) > td > div').attributes().value).toStrictEqual(
      'aaa'
    )
    expect(wrapper.find('table > tr:nth-of-type(2)').element.childElementCount).toBe(1)
    expect(wrapper.find('table > tr:nth-of-type(2) > td').element.childElementCount).toBe(1)
    expect(wrapper.find('table > tr:nth-of-type(2) > td > div').attributes().value).toStrictEqual(
      'bbb'
    )
    expect(factory_components).toHaveBeenCalledTimes(2)
    expect(factory_components).nthCalledWith(1, 'AAA')
    expect(factory_components).nthCalledWith(2, 'BBB')
  })
  it('span components', async () => {
    const wrapper = shallowMount(CustomComponents, {
      propsData: {
        data: { val1: 'aaa', val2: 'bbb', val3: 'ccc', val4: 'ddd', val5: 'eee' },
        comp: [
          { name: 'val1', component: 'AAA', x: 0, y: 0, colspan: 1, rowspan: 3, tab: 0 },
          { name: 'val2', component: 'BBB', x: 1, y: 0, colspan: 1, rowspan: 1, tab: 0 },
          { name: 'val3', component: 'CCC', x: 1, y: 1, colspan: 1, rowspan: 1, tab: 0 },
          { name: 'val4', component: 'DDD', x: 1, y: 2, colspan: 1, rowspan: 1, tab: 0 },
          { name: 'val5', component: 'EEE', x: 1, y: 3, colspan: 1, rowspan: 1, tab: 0 }
        ]
      }
    })
    expect(wrapper.element.childElementCount).toBe(1)
    expect(wrapper.find('table').element.childElementCount).toBe(4)
    expect(
      wrapper.find('table > tr:nth-of-type(1) > td:nth-of-type(1)').attributes()
    ).toStrictEqual({ class: 'customcell', colspan: '1', rowspan: '3' })
    expect(
      wrapper.find('table > tr:nth-of-type(1) > td:nth-of-type(1) > div').attributes().value
    ).toStrictEqual('aaa')
    expect(
      wrapper.find('table > tr:nth-of-type(1) > td:nth-of-type(2)').attributes()
    ).toStrictEqual({ class: 'customcell', colspan: '1', rowspan: '1' })
    expect(
      wrapper.find('table > tr:nth-of-type(1) > td:nth-of-type(2) > div').attributes().value
    ).toStrictEqual('bbb')
    expect(
      wrapper.find('table > tr:nth-of-type(2) > td:nth-of-type(1)').attributes()
    ).toStrictEqual({ class: 'customcell', colspan: '1', rowspan: '1' })
    expect(
      wrapper.find('table > tr:nth-of-type(2) > td:nth-of-type(1) > div').attributes().value
    ).toStrictEqual('ccc')
    expect(
      wrapper.find('table > tr:nth-of-type(3) > td:nth-of-type(1)').attributes()
    ).toStrictEqual({ class: 'customcell', colspan: '1', rowspan: '1' })
    expect(
      wrapper.find('table > tr:nth-of-type(3) > td:nth-of-type(1) > div').attributes().value
    ).toStrictEqual('ddd')
    expect(
      wrapper.find('table > tr:nth-of-type(4) > td:nth-of-type(1)').attributes()
    ).toStrictEqual({ class: 'customcell', colspan: '1' })
    expect(
      wrapper.find('table > tr:nth-of-type(4) > td:nth-of-type(1)').element.childElementCount
    ).toBe(0)
    expect(
      wrapper.find('table > tr:nth-of-type(4) > td:nth-of-type(2)').attributes()
    ).toStrictEqual({ class: 'customcell', colspan: '1', rowspan: '1' })
    expect(
      wrapper.find('table > tr:nth-of-type(4) > td:nth-of-type(2) > div').attributes().value
    ).toStrictEqual('eee')
  })
  it('components with tabls', async () => {
    const wrapper = shallowMount(CustomComponents, {
      propsData: {
        data: {
          val1: 'aaa',
          val2: 'bbb',
          val3: 'ccc',
          val4: 'ddd',
          tab__1: '111',
          tab__2: '222',
          tab__3: '333'
        },
        comp: [
          { name: 'val1', component: 'AAA', x: 0, y: 0, colspan: 1, rowspan: 1, tab: 0 },
          { name: 'tab__1', component: 'TAB', tab: 1 },
          { name: 'val2', component: 'BBB', x: 0, y: 0, colspan: 1, rowspan: 1, tab: 1 },
          { name: 'tab__2', component: 'TAB', tab: 2 },
          { name: 'val3', component: 'CCC', x: 0, y: 0, colspan: 1, rowspan: 1, tab: 2 },
          { name: 'tab__3', component: 'TAB', tab: 3 },
          { name: 'val4', component: 'EEE', x: 0, y: 0, colspan: 1, rowspan: 1, tab: 3 }
        ]
      }
    })
    expect(wrapper.element.childElementCount).toBe(2)
    expect(wrapper.find('table').element.childElementCount).toBe(1)
    expect(wrapper.find('table > tr > td').element.childElementCount).toBe(1)
    expect(wrapper.find('table > tr > td > div').attributes().value).toStrictEqual('aaa')
    expect(wrapper.find('div > v-tabs').element.childElementCount).toBe(3)
    expect(wrapper.find('div > v-tabs > v-tab:nth-of-type(1)').attributes('value')).toBe('tab__1')
    expect(wrapper.find('div > v-tabs > v-tab:nth-of-type(1)').text()).toBe('111')
    expect(wrapper.find('div > v-tabs > v-tab:nth-of-type(2)').attributes('value')).toBe('tab__2')
    expect(wrapper.find('div > v-tabs > v-tab:nth-of-type(2)').text()).toBe('222')
    expect(wrapper.find('div > v-tabs > v-tab:nth-of-type(3)').attributes('value')).toBe('tab__3')
    expect(wrapper.find('div > v-tabs > v-tab:nth-of-type(3)').text()).toBe('333')
    expect(wrapper.find('div > v-window').element.childElementCount).toBe(3)
    expect(wrapper.find('div > v-window > v-window-item:nth-of-type(1)').attributes('value')).toBe(
      'tab__1'
    )
    expect(
      wrapper.find('div > v-window > v-window-item:nth-of-type(1) > table > tr > td').element
        .childElementCount
    ).toBe(1)
    expect(
      wrapper
        .find('div > v-window > v-window-item:nth-of-type(1) > table > tr > td > div')
        .attributes().value
    ).toBe('bbb')
    expect(wrapper.find('div > v-window > v-window-item:nth-of-type(2)').attributes('value')).toBe(
      'tab__2'
    )
    expect(
      wrapper.find('div > v-window > v-window-item:nth-of-type(2) > table > tr > td').element
        .childElementCount
    ).toBe(1)
    expect(
      wrapper
        .find('div > v-window > v-window-item:nth-of-type(2) > table > tr > td > div')
        .attributes().value
    ).toBe('ccc')
    expect(wrapper.find('div > v-window > v-window-item:nth-of-type(3)').attributes('value')).toBe(
      'tab__3'
    )
    expect(
      wrapper.find('div > v-window > v-window-item:nth-of-type(3) > table > tr > td').element
        .childElementCount
    ).toBe(1)
    expect(
      wrapper
        .find('div > v-window > v-window-item:nth-of-type(3) > table > tr > td > div')
        .attributes().value
    ).toBe('ddd')
  })
})
