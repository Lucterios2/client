import { describe, it, expect, beforeEach, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { createApp } from 'vue'

import CustomComponents from '@/components/CustomComponents.vue'
import { initialObserver } from '@/libs/observer'
import { factory_components } from '@/components/tools'
import storage from '@/libs/datastorage.js'
import i18n from '@/libs/i18n.js'
import { Stringformat } from '@/libs/convert'

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
      Object.assign(
        {},
        wrapper.find('table > tr:nth-of-type(1) > td:nth-of-type(1)').attributes(),
        { id: 0 }
      )
    ).toStrictEqual({ class: 'customcell', colspan: '1', rowspan: '3', id: 0 })
    expect(
      wrapper.find('table > tr:nth-of-type(1) > td:nth-of-type(1) > div').attributes().value
    ).toStrictEqual('aaa')
    expect(
      Object.assign(
        {},
        wrapper.find('table > tr:nth-of-type(1) > td:nth-of-type(2)').attributes(),
        { id: 0 }
      )
    ).toStrictEqual({ class: 'customcell', colspan: '1', rowspan: '1', id: 0 })
    expect(
      wrapper.find('table > tr:nth-of-type(1) > td:nth-of-type(2) > div').attributes().value
    ).toStrictEqual('bbb')
    expect(
      Object.assign(
        {},
        wrapper.find('table > tr:nth-of-type(2) > td:nth-of-type(1)').attributes(),
        { id: 0 }
      )
    ).toStrictEqual({ class: 'customcell', colspan: '1', rowspan: '1', id: 0 })
    expect(
      wrapper.find('table > tr:nth-of-type(2) > td:nth-of-type(1) > div').attributes().value
    ).toStrictEqual('ccc')
    expect(
      Object.assign(
        {},
        wrapper.find('table > tr:nth-of-type(3) > td:nth-of-type(1)').attributes(),
        { id: 0 }
      )
    ).toStrictEqual({ class: 'customcell', colspan: '1', rowspan: '1', id: 0 })
    expect(
      wrapper.find('table > tr:nth-of-type(3) > td:nth-of-type(1) > div').attributes().value
    ).toStrictEqual('ddd')
    expect(
      Object.assign(
        {},
        wrapper.find('table > tr:nth-of-type(4) > td:nth-of-type(1)').attributes(),
        { id: 0 }
      )
    ).toStrictEqual({ class: 'customcell', colspan: '1', id: 0 })
    expect(
      wrapper.find('table > tr:nth-of-type(4) > td:nth-of-type(1)').element.childElementCount
    ).toBe(0)
    expect(
      Object.assign(
        {},
        wrapper.find('table > tr:nth-of-type(4) > td:nth-of-type(2)').attributes(),
        { id: 0 }
      )
    ).toStrictEqual({ class: 'customcell', colspan: '1', rowspan: '1', id: 0 })
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
  it('components multi-line', async () => {
    const wrapper = shallowMount(CustomComponents, {
      propsData: {
        data: {
          val1: 'aaa',
          val2: 'bbb',
          val3: 'ccc',
          val4: 'ddd',
          val5: 'eee',
          val6: 'fff',
          val7: 'ggg',
          val8: 'hhh',
          val9: 'iii',
          val10: 'jjj',
          val11: 'kkk',
          val12: 'lll'
        },
        comp: [
          {
            name: 'val1',
            component: 'AAA',
            description: '',
            tab: 0,
            x: 0,
            y: 0,
            colspan: 1,
            rowspan: 7
          },
          {
            name: 'val2',
            component: 'AAA',
            description: '',
            tab: 0,
            x: 1,
            y: 0,
            colspan: 1,
            rowspan: 7,
            VMin: 20,
            HMin: 200
          },
          {
            name: 'val3',
            component: 'AAA',
            description: '',
            tab: 0,
            x: 2,
            y: 0,
            colspan: 1,
            rowspan: 7,
            VMin: 20,
            HMin: 200
          },
          {
            name: 'val4',
            component: 'AAA',
            description: '',
            tab: 0,
            x: 4,
            y: 0,
            colspan: 1,
            rowspan: 7
          },
          {
            name: 'val5',
            component: 'AAA',
            description: '',
            tab: 0,
            x: 3,
            y: 1,
            colspan: 1,
            rowspan: 1,
            VMin: 20,
            HMin: 200
          },
          {
            name: 'val6',
            component: 'AAA',
            description: '',
            tab: 0,
            x: 3,
            y: 2,
            colspan: 1,
            rowspan: 1,
            VMin: 20,
            HMin: 200
          },
          {
            name: 'val7',
            component: 'AAA',
            description: '',
            tab: 0,
            x: 3,
            y: 3,
            colspan: 1,
            rowspan: 1,
            VMin: 20,
            HMin: 200
          },
          {
            name: 'val8',
            component: 'AAA',
            description: '',
            tab: 0,
            x: 3,
            y: 4,
            colspan: 1,
            rowspan: 1,
            VMin: 80,
            HMin: 200
          },
          {
            name: 'val9',
            component: 'AAA',
            description: '',
            tab: 0,
            x: 3,
            y: 5,
            colspan: 1,
            rowspan: 1,
            VMin: 20,
            HMin: 200
          },
          {
            name: 'val10',
            component: 'AAA',
            description: '',
            tab: 0,
            x: 3,
            y: 6,
            colspan: 1,
            rowspan: 1,
            VMin: 20,
            HMin: 200
          },
          {
            name: 'val11',
            component: 'AAA',
            description: '',
            tab: 0,
            x: 0,
            y: 7,
            colspan: 4,
            rowspan: 1
          },
          {
            name: 'val12',
            component: 'AAA',
            description: '',
            tab: 0,
            x: 3,
            y: 7,
            colspan: 1,
            rowspan: 1
          }
        ]
      }
    })
    function get_value(posY, posX) {
      const tditem = wrapper.find(
        Stringformat('table > tr:nth-of-type({0}) > td:nth-of-type({1})', [posY, posX])
      )
      return [
        Number(tditem.attributes().colspan),
        Number(tditem.attributes().rowspan),
        tditem.element.childElementCount > 0 ? tditem.find('div').attributes().value : null
      ]
    }
    expect(wrapper.element.childElementCount).toBe(1)
    expect(wrapper.find('table').element.childElementCount).toBe(8)
    expect(get_value(1, 1)).toStrictEqual([1, 7, 'aaa']) //val1 (x:0,y:0)
    expect(get_value(1, 2)).toStrictEqual([1, 7, 'bbb']) //val2 (x:1,y:0)
    expect(get_value(1, 3)).toStrictEqual([1, 7, 'ccc']) //val3 (x:2,y:0)
    expect(get_value(1, 4)).toStrictEqual([1, NaN, null])
    expect(get_value(1, 5)).toStrictEqual([1, 7, 'ddd']) //val4 (x:4,y:0)

    expect(get_value(2, 1)).toStrictEqual([1, 1, 'eee']) //val5 (x:3,y:1)
    expect(get_value(3, 1)).toStrictEqual([1, 1, 'fff']) //val6 (x:3,y:2)
    expect(get_value(4, 1)).toStrictEqual([1, 1, 'ggg']) //val7 (x:3,y:3)
    expect(get_value(5, 1)).toStrictEqual([1, 1, 'hhh']) //val8 (x:3,y:4)
    expect(get_value(6, 1)).toStrictEqual([1, 1, 'iii']) //val9 (x:3,y:5)
    expect(get_value(7, 1)).toStrictEqual([1, 1, 'jjj']) //val10 (x:3,y:6)

    expect(get_value(8, 1)).toStrictEqual([4, 1, 'kkk']) //val11 (x:0,y:7)
    expect(get_value(8, 2)).toStrictEqual([1, 1, 'lll']) //val12 (x:3,y:7)
  })
})
