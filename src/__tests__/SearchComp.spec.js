import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { vuetify } from '@/plugins/vuetify'
import { nextTick } from 'vue'

import SearchComp from '@/components/SearchComp.vue'
import i18n from '@/libs/i18n.js'
import { convert_event_to_object } from './tools'

beforeEach(() => {
  console.warn = vi.fn()
})

describe('SearchComp', () => {
  it('empty', async () => {
    const wrapper = mount(SearchComp, {
      global: {
        plugins: [vuetify, i18n]
      },
      props: {
        value: [],
        component: {
          name: 'val1',
          component: 'AAA',
          x: 0,
          y: 0,
          colspan: 1,
          rowspan: 1,
          tab: 0,
          needed: false,
          selectors: []
        },
        meta: {
          id: 'truc/search',
          extension: 'truc',
          action: 'search',
          method: 'GET'
        }
      }
    })
    await nextTick()
    expect(wrapper.element.childElementCount).toBe(1)
    expect(wrapper.find('.v-field_abstract').element.childElementCount).toBe(2)
    expect(wrapper.find('.search_select').element.childElementCount).toBe(4)
    expect(
      wrapper.find('.search_select > .v-col:nth-of-type(1) > select').element.childElementCount
    ).toBe(0)
    expect(
      wrapper.find('.search_select > .v-col:nth-of-type(2) > select').element.childElementCount
    ).toBe(1)
    expect(wrapper.find('.search_select > .v-col:nth-of-type(3)').element.childElementCount).toBe(0)
    expect(
      wrapper.find('.search_select > .v-col:nth-of-type(4) > button').element.childElementCount
    ).toBe(3)
    expect(wrapper.find('.search_result').element.childElementCount).toBe(1)
    expect(wrapper.find('.search_result > div > label').text()).toBe('Pas de critère de recherche')

    await wrapper.find('.search_select > .v-col:nth-of-type(4) > button').trigger('click')
    expect(convert_event_to_object(wrapper.emitted('action'))).toStrictEqual([
      [
        {
          id: 'truc/search',
          extension: 'truc',
          action: 'search',
          method: 'GET',
          modal: 2,
          close: 0,
          params: {},
          short_icon: 'mdi:mdi-pencil-plus-outline',
          text: 'add',
          no_check: true,
          unique: 1
        },
        false
      ]
    ])
    expect(wrapper.vm.getValue(true)).toStrictEqual([])
  })

  it('with description + selectors', async () => {
    const wrapper = mount(SearchComp, {
      global: {
        plugins: [i18n]
      },
      props: {
        value: [],
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
          selectors: [
            { name: 'name', description: 'nom', type: 'str', extra: [] },
            { name: 'value', description: 'valeur', type: 'float', extra: [0, 10, 1] },
            { name: 'check', description: 'contrôle', type: 'bool', extra: [] },
            { name: 'date', description: 'date', type: 'date', extra: [] },
            { name: 'time', description: 'time', type: 'time', extra: [] },
            {
              name: 'select',
              description: 'selection',
              type: 'listmult',
              extra: [
                [0, 'aaa'],
                [1, 'bbb'],
                [2, 'ccc']
              ]
            }
          ]
        },
        meta: {
          id: 'truc/search',
          extension: 'truc',
          action: 'search',
          method: 'GET'
        }
      }
    })
    await nextTick()
    console.log(wrapper.html())
    expect(wrapper.element.childElementCount).toBe(2)
    expect(wrapper.find('label').text()).toBe('title')
    expect(wrapper.find('.v-field_abstract').element.childElementCount).toBe(2)
    expect(wrapper.find('.search_select').element.childElementCount).toBe(4)
    expect(
      wrapper.find('.search_select > v-col:nth-of-type(1) > select').element.childElementCount
    ).toBe(6)
    expect(
      wrapper.find('.search_select > v-col:nth-of-type(2) > select').element.childElementCount
    ).toBe(5)
    expect(wrapper.find('.search_select > v-col:nth-of-type(3)').element.childElementCount).toBe(1)
    expect(
      wrapper.find('.search_select > v-col:nth-of-type(4) > v-btn').element.childElementCount
    ).toBe(1)
    expect(wrapper.find('.search_result').element.childElementCount).toBe(1)
    expect(wrapper.find('.search_result > v-col > label').text()).toBe(
      'Pas de critère de recherche'
    )
  })
})
