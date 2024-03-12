import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import i18n from '@/libs/i18n.js'

import GridComp from '@/components/GridComp.vue'
import { nextTick } from 'vue'

beforeEach(() => {
  console.warn = vi.fn()
})

const props_Data = {
  value: [
    {
      id: 1,
      val1: 'aaa',
      val2: 'bbb',
      __color_ref__: null
    },
    {
      id: 2,
      val1: 'ccc',
      val2: 'ddd',
      __color_ref__: null
    },
    {
      id: 3,
      val1: 'eee',
      val2: 'fff',
      __color_ref__: null
    },
    {
      id: 4,
      val1: 'ggg',
      val2: 'hhh',
      __color_ref__: null
    }
  ],
  component: {
    name: 'test',
    component: 'GRID',
    description: 'Test',
    page_max: 4,
    page_num: 2,
    order: null,
    headers: [
      ['val1', 'Value 1', null, 0, '%s'],
      ['val2', 'Value 2', null, 0, '%s']
    ],
    actions: [],
    size_by_page: 50,
    nb_lines: 104,
    no_pager: false
  },
  meta: {
    extension: 'ext',
    title: 'title',
    action: 'act',
    observer: 'core.custom',
    ismodal: false,
    method: 'GET'
  }
}

describe('GridComp', () => {
  it('simple empty', async () => {
    const wrapper = mount(GridComp, {
      propsData: {
        value: [],
        component: {
          name: 'test',
          component: 'GRID',
          description: 'Test',
          page_max: 1,
          page_num: 1,
          order: null,
          headers: [
            ['val1', 'Value 1', null, 0, '%s'],
            ['val2', 'Value 2', null, 0, '%s']
          ],
          actions: [],
          size_by_page: 25,
          nb_lines: 0,
          no_pager: false
        }
      },
      global: {
        plugins: [i18n]
      }
    })
    expect(wrapper.element.childElementCount).toBe(2)
    expect(wrapper.find('label').text()).toBe('Test')
    expect(wrapper.find('v-data-table-server').element.childElementCount).toBe(0)
    expect(wrapper.find('v-data-table-server').attributes()).toStrictEqual({
      headers: '[object Object],[object Object]',
      'item-value': 'id',
      items: '',
      'items-length': '0',
      'items-per-page': '25',
      'items-per-page-options':
        '[object Object],[object Object],[object Object],[object Object],[object Object]',
      'items-per-page-text': 'Résultats par page',
      'multi-sort': 'true',
      'no-data-text': 'Aucun resultat',
      page: '2',
      'page-text': 'Voir 26 à 0 sur 0 résultats'
    })
  })

  it('with data', async () => {
    const wrapper = mount(GridComp, {
      propsData: props_Data,
      global: {
        plugins: [i18n]
      }
    })
    wrapper.vm.firstload = false
    expect(wrapper.element.childElementCount).toBe(2)
    expect(wrapper.find('label').text()).toBe('Test')
    expect(wrapper.find('v-data-table-server').element.childElementCount).toBe(0)
    expect(wrapper.find('v-data-table-server').attributes()).toStrictEqual({
      headers: '[object Object],[object Object]',
      'item-value': 'id',
      items: '[object Object],[object Object],[object Object],[object Object]',
      'items-length': '104',
      'items-per-page': '50',
      'items-per-page-options':
        '[object Object],[object Object],[object Object],[object Object],[object Object]',
      'items-per-page-text': 'Résultats par page',
      'multi-sort': 'true',
      'no-data-text': 'Aucun resultat',
      page: '3',
      'page-text': 'Voir 101 à 104 sur 104 résultats'
    })
    expect(wrapper.emitted('action')).toStrictEqual(undefined)
  })

  it('loadItems', async () => {
    const wrapper = mount(GridComp, {
      propsData: props_Data,
      global: {
        plugins: [i18n]
      }
    })
    wrapper.vm.firstload = false
    expect(wrapper.element.childElementCount).toBe(2)
    expect(wrapper.emitted('action')).toStrictEqual(undefined)
    wrapper.vm.loadItems({
      page: 1,
      itemsPerPage: 100,
      sortBy: [
        { key: 'val1', order: 'asc' },
        { key: 'val2', order: 'des' }
      ]
    })
    expect(wrapper.emitted('action')).toStrictEqual([
      [
        {
          action: 'act',
          close: 0,
          extension: 'ext',
          id: 'ext/act',
          method: 'GET',
          modal: 2,
          params: {
            'GRID_ORDER%%test': '-val1,val2',
            'GRID_PAGE%%test': 1,
            'GRID_SIZE%%test': 100
          },
          unique: 1
        }
      ]
    ])
  })

  it('itemsPerPage', async () => {
    const wrapper = mount(GridComp, {
      propsData: props_Data,
      global: {
        plugins: [i18n]
      }
    })
    wrapper.vm.firstload = false
    expect(wrapper.element.childElementCount).toBe(2)
    expect(wrapper.emitted('action')).toStrictEqual(undefined)
    expect(wrapper.vm.itemsPerPage).toBe(50)
    wrapper.vm.itemsPerPage = 100
    expect(wrapper.emitted('action')).toStrictEqual([
      [
        {
          action: 'act',
          close: 0,
          extension: 'ext',
          id: 'ext/act',
          method: 'GET',
          modal: 2,
          params: {
            'GRID_PAGE%%test': 0,
            'GRID_SIZE%%test': 100
          },
          unique: 1
        }
      ]
    ])
  })

  it('with actions', async () => {
    const new_props = Object.assign({}, props_Data)
    new_props.component.actions = [
      {
        text: 'text none',
        id: 'ext/act_none',
        short_icon: 'icon_none',
        extension: 'ext',
        action: 'act_none',
        modal: '1',
        close: '0',
        unique: '1',
        method: 'POST',
        params: null
      },
      {
        text: 'text single',
        id: 'ext/act_single',
        short_icon: 'icon_single',
        extension: 'ext',
        action: 'act_single',
        modal: '1',
        close: '0',
        unique: '0',
        method: 'POST',
        params: null
      },
      {
        text: 'text multi',
        id: 'ext/act_multi',
        short_icon: 'icon_multi',
        extension: 'ext',
        action: 'act_multi',
        modal: '1',
        close: '0',
        unique: '2',
        method: 'POST',
        params: null
      }
    ]
    const wrapper = mount(GridComp, {
      propsData: new_props,
      global: {
        plugins: [i18n]
      }
    })
    wrapper.vm.firstload = false
    expect(wrapper.vm.selectItems.length).toStrictEqual(0)
    expect(wrapper.element.childElementCount).toBe(3)
    expect(wrapper.find('div > v-card-actions > div:nth-of-type(1) > v-btn > span').text()).toBe(
      'text none'
    )
    expect(wrapper.find('div > v-card-actions > div:nth-of-type(2) > v-btn > span').text()).toBe(
      'text single'
    )
    expect(wrapper.find('div > v-card-actions > div:nth-of-type(3) > v-btn > span').text()).toBe(
      'text multi'
    )
    expect(
      wrapper.find('div > v-card-actions > div:nth-of-type(1) > v-btn').attributes('disabled')
    ).toBe('false')
    expect(
      wrapper.find('div > v-card-actions > div:nth-of-type(2) > v-btn').attributes('disabled')
    ).toBe('true')
    expect(
      wrapper.find('div > v-card-actions > div:nth-of-type(3) > v-btn').attributes('disabled')
    ).toBe('true')
    wrapper.vm.click_row(null, { id: 2 })
    await nextTick()
    expect(wrapper.vm.selectItems.length).toStrictEqual(1)
    expect(
      wrapper.find('div > v-card-actions > div:nth-of-type(1) > v-btn').attributes('disabled')
    ).toBe('false')
    expect(
      wrapper.find('div > v-card-actions > div:nth-of-type(2) > v-btn').attributes('disabled')
    ).toBe('false')
    expect(
      wrapper.find('div > v-card-actions > div:nth-of-type(3) > v-btn').attributes('disabled')
    ).toBe('false')
    wrapper.vm.click_row(null, { id: 4 })
    await nextTick()
    expect(wrapper.vm.selectItems.length).toStrictEqual(2)
    expect(
      wrapper.find('div > v-card-actions > div:nth-of-type(1) > v-btn').attributes('disabled')
    ).toBe('false')
    expect(
      wrapper.find('div > v-card-actions > div:nth-of-type(2) > v-btn').attributes('disabled')
    ).toBe('true')
    expect(
      wrapper.find('div > v-card-actions > div:nth-of-type(3) > v-btn').attributes('disabled')
    ).toBe('false')
    wrapper.vm.click_row(null, { id: 2 })
    await nextTick()
    expect(wrapper.vm.selectItems.length).toStrictEqual(1)
    expect(
      wrapper.find('div > v-card-actions > div:nth-of-type(1) > v-btn').attributes('disabled')
    ).toBe('false')
    expect(
      wrapper.find('div > v-card-actions > div:nth-of-type(2) > v-btn').attributes('disabled')
    ).toBe('false')
    expect(
      wrapper.find('div > v-card-actions > div:nth-of-type(3) > v-btn').attributes('disabled')
    ).toBe('false')
    wrapper.vm.click_row(null, { id: 4 })
    await nextTick()
    expect(wrapper.vm.selectItems.length).toStrictEqual(0)
    expect(
      wrapper.find('div > v-card-actions > div:nth-of-type(1) > v-btn').attributes('disabled')
    ).toBe('false')
    expect(
      wrapper.find('div > v-card-actions > div:nth-of-type(2) > v-btn').attributes('disabled')
    ).toBe('true')
    expect(
      wrapper.find('div > v-card-actions > div:nth-of-type(3) > v-btn').attributes('disabled')
    ).toBe('true')
    wrapper.vm.click_row(null, { id: 1 })
    wrapper.vm.click_row(null, { id: 3 })
    await nextTick()
    expect(
      wrapper.find('div > v-card-actions > div:nth-of-type(1) > v-btn').attributes('disabled')
    ).toBe('false')
    expect(
      wrapper.find('div > v-card-actions > div:nth-of-type(2) > v-btn').attributes('disabled')
    ).toBe('true')
    expect(
      wrapper.find('div > v-card-actions > div:nth-of-type(3) > v-btn').attributes('disabled')
    ).toBe('false')
    expect(wrapper.emitted('action')).toStrictEqual(undefined)
    wrapper.find('div > v-card-actions > div:nth-of-type(3) > v-btn').trigger('click')
    await nextTick()
    expect(wrapper.emitted('action')).toStrictEqual([
      [
        {
          action: 'act_multi',
          close: '0',
          disabled: false,
          extension: 'ext',
          id: 'ext/act_multi',
          method: 'POST',
          modal: '1',
          num: 17,
          params: {
            test: '1;3'
          },
          short_icon: 'icon_multi',
          text: 'text multi',
          unique: '2'
        }
      ]
    ])
  })
})
