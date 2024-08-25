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

const SELECTORS = [
  { name: 'name', description: 'nom', type: 'str', extra: [] },
  { name: 'value', description: 'valeur', type: 'float', extra: [0, 10, 1] },
  { name: 'check', description: 'contrôle', type: 'bool', extra: [] },
  { name: 'date', description: 'date', type: 'date', extra: [] },
  { name: 'time', description: 'time', type: 'time', extra: [] },
  {
    name: 'select',
    description: 'sélection',
    type: 'list',
    extra: [
      ['1', 'aaa'],
      ['2', 'bbb'],
      ['3', 'ccc']
    ]
  },
  {
    name: 'multiselect',
    description: 'multi-sélection',
    type: 'listmult',
    extra: [
      ['10', 'wwww'],
      ['20', 'xxxx'],
      ['30', 'yyyy'],
      ['40', 'zzzz']
    ]
  }
]

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
          selectors: SELECTORS
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
    expect(wrapper.element.childElementCount).toBe(2)
    expect(wrapper.find('label').text()).toBe('title')
    expect(wrapper.find('.v-field_abstract').element.childElementCount).toBe(2)
    expect(wrapper.find('.search_select').element.childElementCount).toBe(4)
    expect(
      wrapper
        .findAll('.search_select > v-col:nth-of-type(1) > select > option')
        .map((opt) => [opt.attributes('value'), opt.text()])
    ).toStrictEqual([
      ['name', 'nom'],
      ['value', 'valeur'],
      ['check', 'contrôle'],
      ['date', 'date'],
      ['time', 'time'],
      ['select', 'sélection'],
      ['multiselect', 'multi-sélection']
    ])
    expect(wrapper.find('.search_select > v-col:nth-of-type(1) > select').element.value).toBe(
      'name'
    )
  })

  it('selectors str', async () => {
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
          description: 'title',
          needed: true,
          selectors: SELECTORS
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

    await wrapper.find('.search_select > .v-col:nth-of-type(1) > select').setValue('name')
    await nextTick()
    expect(wrapper.findAll('.search_select > .v-col:nth-of-type(1) > select > option').length).toBe(
      7
    )
    expect(wrapper.find('.search_select > .v-col:nth-of-type(1) > select').element.value).toBe(
      'name'
    )
    expect(
      wrapper
        .findAll('.search_select > .v-col:nth-of-type(2) > select > option')
        .map((opt) => [opt.attributes('value'), opt.text()])
    ).toStrictEqual([
      ['5', 'contenu'],
      ['1', 'égal'],
      ['2', 'différent'],
      ['6', 'commence par'],
      ['7', 'fini par']
    ])
    expect(wrapper.find('.search_select > .v-col:nth-of-type(2) > select').element.value).toBe('5')
    expect(
      wrapper
        .find(
          '.search_select > .v-col:nth-of-type(3) > .v-input > .v-input__control > .v-field > .v-field__field > input'
        )
        .exists()
    ).toBe(true)
    expect(wrapper.find('.search_select > .v-col:nth-of-type(4) > button').exists()).toBe(true)
    expect(wrapper.find('.search_result').element.childElementCount).toBe(1)
    expect(wrapper.find('.search_result > .v-col > label').text()).toBe(
      'Pas de critère de recherche'
    )
    wrapper.find('.search_select > .v-col:nth-of-type(2) > select').setValue('6')
    const input = wrapper.find(
      '.search_select > .v-col:nth-of-type(3) > .v-input > .v-input__control > .v-field > .v-field__field > input'
    )
    input.setValue('abc123')
    expect(wrapper.vm.getValue(true)).toStrictEqual('[["name",6,"abc123"]]')
  })

  it('selectors float', async () => {
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
          description: 'title',
          needed: true,
          selectors: SELECTORS
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

    await wrapper.find('.search_select > .v-col:nth-of-type(1) > select').setValue('value')
    await nextTick()
    expect(wrapper.findAll('.search_select > .v-col:nth-of-type(1) > select > option').length).toBe(
      7
    )
    expect(wrapper.find('.search_select > .v-col:nth-of-type(1) > select').element.value).toBe(
      'value'
    )
    expect(
      wrapper
        .findAll('.search_select > .v-col:nth-of-type(2) > select > option')
        .map((opt) => [opt.attributes('value'), opt.text()])
    ).toStrictEqual([
      ['1', 'égal'],
      ['2', 'différent'],
      ['3', 'inférieur'],
      ['4', 'supérieur']
    ])
    expect(wrapper.find('.search_select > .v-col:nth-of-type(2) > select').element.value).toBe('1')
    expect(
      wrapper
        .find(
          '.search_select > .v-col:nth-of-type(3) > .v-input > .v-input__control > .v-field > .v-field__field > input'
        )
        .exists()
    ).toBe(true)
    expect(wrapper.find('.search_select > .v-col:nth-of-type(4) > button').exists()).toBe(true)
    expect(wrapper.find('.search_result').element.childElementCount).toBe(1)
    expect(wrapper.find('.search_result > .v-col > label').text()).toBe(
      'Pas de critère de recherche'
    )
    wrapper.find('.search_select > .v-col:nth-of-type(2) > select').setValue('3')
    const input = wrapper.find(
      '.search_select > .v-col:nth-of-type(3) > .v-input > .v-input__control > .v-field > .v-field__field > input'
    )
    input.setValue('8.7')
    expect(wrapper.vm.getValue(true)).toStrictEqual('[["value",3,"8.7"]]')
  })

  it('selectors bool', async () => {
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
          description: 'title',
          needed: true,
          selectors: SELECTORS
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
    await wrapper.find('.search_select > .v-col:nth-of-type(1) > select').setValue('check')
    await nextTick()
    expect(wrapper.findAll('.search_select > .v-col:nth-of-type(1) > select > option').length).toBe(
      7
    )
    expect(wrapper.find('.search_select > .v-col:nth-of-type(1) > select').element.value).toBe(
      'check'
    )
    expect(
      wrapper
        .findAll('.search_select > .v-col:nth-of-type(2) > select > option')
        .map((opt) => [opt.attributes('value'), opt.text()])
    ).toStrictEqual([['1', 'égal']])
    expect(wrapper.find('.search_select > .v-col:nth-of-type(2) > select').element.value).toBe('1')
    expect(
      wrapper
        .find(
          '.search_select > .v-col:nth-of-type(3) > .v-input > .v-input__control > .v-selection-control > .v-selection-control__wrapper > .v-selection-control__input > input'
        )
        .exists()
    ).toBe(true)
    expect(wrapper.find('.search_select > .v-col:nth-of-type(4) > button').exists()).toBe(true)
    expect(wrapper.find('.search_result').element.childElementCount).toBe(1)
    expect(wrapper.find('.search_result > .v-col > label').text()).toBe(
      'Pas de critère de recherche'
    )
    wrapper.find('.search_select > .v-col:nth-of-type(2) > select').setValue('1')
    const input = wrapper.find(
      '.search_select > .v-col:nth-of-type(3) > .v-input > .v-input__control > .v-selection-control > .v-selection-control__wrapper > .v-selection-control__input > input'
    )
    input.setValue(true)
    expect(wrapper.vm.getValue(true)).toStrictEqual('[["check",1,true]]')
  })

  it('selectors date', async () => {
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
          description: 'title',
          needed: true,
          selectors: SELECTORS
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
    await wrapper.find('.search_select > .v-col:nth-of-type(1) > select').setValue('date')
    await nextTick()
    expect(wrapper.findAll('.search_select > .v-col:nth-of-type(1) > select > option').length).toBe(
      7
    )
    expect(wrapper.find('.search_select > .v-col:nth-of-type(1) > select').element.value).toBe(
      'date'
    )
    expect(
      wrapper
        .findAll('.search_select > .v-col:nth-of-type(2) > select > option')
        .map((opt) => [opt.attributes('value'), opt.text()])
    ).toStrictEqual([
      ['1', 'égal'],
      ['2', 'différent'],
      ['3', 'inférieur'],
      ['4', 'supérieur']
    ])
    expect(wrapper.find('.search_select > .v-col:nth-of-type(2) > select').element.value).toBe('1')
    expect(
      wrapper
        .find(
          '.search_select > .v-col:nth-of-type(3) > .v-input > .v-input__control > .v-field > .v-field__field > input'
        )
        .exists()
    ).toBe(true)
    expect(wrapper.find('.search_select > .v-col:nth-of-type(4) > button').exists()).toBe(true)
    expect(wrapper.find('.search_result').element.childElementCount).toBe(1)
    expect(wrapper.find('.search_result > .v-col > label').text()).toBe(
      'Pas de critère de recherche'
    )
    wrapper.find('.search_select > .v-col:nth-of-type(2) > select').setValue('2')
    const input = wrapper.find(
      '.search_select > .v-col:nth-of-type(3) > .v-input > .v-input__control > .v-field > .v-field__field > input'
    )
    input.setValue('2018-07-21')
    expect(wrapper.vm.getValue(true)).toStrictEqual('[["date",2,"2018-07-21"]]')
  })

  it('selectors time', async () => {
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
          description: 'title',
          needed: true,
          selectors: SELECTORS
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
    await wrapper.find('.search_select > .v-col:nth-of-type(1) > select').setValue('time')
    await nextTick()
    expect(wrapper.findAll('.search_select > .v-col:nth-of-type(1) > select > option').length).toBe(
      7
    )
    expect(wrapper.find('.search_select > .v-col:nth-of-type(1) > select').element.value).toBe(
      'time'
    )
    expect(
      wrapper
        .findAll('.search_select > .v-col:nth-of-type(2) > select > option')
        .map((opt) => [opt.attributes('value'), opt.text()])
    ).toStrictEqual([
      ['1', 'égal'],
      ['2', 'différent'],
      ['3', 'inférieur'],
      ['4', 'supérieur']
    ])
    expect(wrapper.find('.search_select > .v-col:nth-of-type(2) > select').element.value).toBe('1')
    expect(
      wrapper
        .find(
          '.search_select > .v-col:nth-of-type(3) > .v-input > .v-input__control > .v-field > .v-field__field > input'
        )
        .exists()
    ).toBe(true)
    expect(wrapper.find('.search_select > .v-col:nth-of-type(4) > button').exists()).toBe(true)
    expect(wrapper.find('.search_result').element.childElementCount).toBe(1)
    expect(wrapper.find('.search_result > .v-col > label').text()).toBe(
      'Pas de critère de recherche'
    )
    wrapper.find('.search_select > .v-col:nth-of-type(2) > select').setValue('4')
    const input = wrapper.find(
      '.search_select > .v-col:nth-of-type(3) > .v-input > .v-input__control > .v-field > .v-field__field > input'
    )
    input.setValue('12:45')
    expect(wrapper.vm.getValue(true)).toStrictEqual('[["time",4,"12:45"]]')
  })

  it('selectors list', async () => {
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
          description: 'title',
          needed: true,
          selectors: SELECTORS
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
    await wrapper.find('.search_select > .v-col:nth-of-type(1) > select').setValue('select')
    await nextTick()
    expect(wrapper.findAll('.search_select > .v-col:nth-of-type(1) > select > option').length).toBe(
      7
    )
    expect(wrapper.find('.search_select > .v-col:nth-of-type(1) > select').element.value).toBe(
      'select'
    )
    expect(
      wrapper
        .findAll('.search_select > .v-col:nth-of-type(2) > select > option')
        .map((opt) => [opt.attributes('value'), opt.text()])
    ).toStrictEqual([['8', 'ou']])
    expect(wrapper.find('.search_select > .v-col:nth-of-type(2) > select').element.value).toBe('8')
    expect(
      wrapper
        .findAll('.search_select > .v-col:nth-of-type(3) > select > option')
        .map((opt) => [opt.attributes('value'), opt.text()])
    ).toStrictEqual([
      ['1', 'aaa'],
      ['2', 'bbb'],
      ['3', 'ccc']
    ])
    expect(wrapper.find('.search_select > .v-col:nth-of-type(4) > button').exists()).toBe(true)
    expect(wrapper.find('.search_result').element.childElementCount).toBe(1)
    expect(wrapper.find('.search_result > .v-col > label').text()).toBe(
      'Pas de critère de recherche'
    )
    wrapper.find('.search_select > .v-col:nth-of-type(2) > select').setValue('8')
    const input = wrapper.find('.search_select > .v-col:nth-of-type(3) > select')
    input.setValue(['1', '3'])
    expect(wrapper.vm.getValue(true)).toStrictEqual('[["select",8,"1;3"]]')
  })

  it('selectors list addone', async () => {
    const wrapper = mount(SearchComp, {
      global: {
        plugins: [vuetify, i18n]
      },
      props: {
        value: [['select', 8, '1;2']],
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
          selectors: SELECTORS
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
    await wrapper.find('.search_select > .v-col:nth-of-type(1) > select').setValue('select')
    await nextTick()
    expect(wrapper.findAll('.search_select > .v-col:nth-of-type(1) > select > option').length).toBe(
      7
    )
    expect(wrapper.find('.search_select > .v-col:nth-of-type(1) > select').element.value).toBe(
      'select'
    )
    expect(
      wrapper
        .findAll('.search_select > .v-col:nth-of-type(2) > select > option')
        .map((opt) => [opt.attributes('value'), opt.text()])
    ).toStrictEqual([['8', 'ou']])
    expect(wrapper.find('.search_select > .v-col:nth-of-type(2) > select').element.value).toBe('8')
    expect(
      wrapper
        .findAll('.search_select > .v-col:nth-of-type(3) > select > option')
        .map((opt) => [opt.attributes('value'), opt.text()])
    ).toStrictEqual([
      ['1', 'aaa'],
      ['2', 'bbb'],
      ['3', 'ccc']
    ])
    expect(wrapper.find('.search_select > .v-col:nth-of-type(4) > button').exists()).toBe(true)
    expect(wrapper.find('.search_result').element.childElementCount).toBe(2)
    expect(wrapper.find('.search_result > .search_title').text()).toBe('Votre critère de recherche')
    expect(wrapper.findAll('.search_result > .v-col > .search_result').length).toBe(1)
    expect(
      wrapper.find('.search_result > .v-col > .search_result:nth-of-type(1)').element
        .childElementCount
    ).toBe(2)
    expect(
      wrapper
        .find(
          '.search_result > .v-col > .search_result:nth-of-type(1) > .v-col:nth-of-type(1) > label'
        )
        .text()
    ).toBe('sélection égal "aaa" ou "bbb"')
    expect(
      wrapper
        .find(
          '.search_result > .v-col > .search_result:nth-of-type(1) > .v-col:nth-of-type(2) > button'
        )
        .exists()
    ).toBe(true)

    wrapper.find('.search_select > .v-col:nth-of-type(2) > select').setValue('8')
    const input = wrapper.find('.search_select > .v-col:nth-of-type(3) > select')
    input.setValue('3')
    expect(wrapper.vm.getValue(true)).toStrictEqual('[["select",8,"1;2;3"]]')
  })

  it('selectors listmult', async () => {
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
          description: 'title',
          needed: true,
          selectors: SELECTORS
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
    await wrapper.find('.search_select > .v-col:nth-of-type(1) > select').setValue('multiselect')
    await nextTick()
    expect(wrapper.findAll('.search_select > .v-col:nth-of-type(1) > select > option').length).toBe(
      7
    )
    expect(wrapper.find('.search_select > .v-col:nth-of-type(1) > select').element.value).toBe(
      'multiselect'
    )
    expect(
      wrapper
        .findAll('.search_select > .v-col:nth-of-type(2) > select > option')
        .map((opt) => [opt.attributes('value'), opt.text()])
    ).toStrictEqual([
      ['8', 'ou'],
      ['9', 'et']
    ])
    expect(wrapper.find('.search_select > .v-col:nth-of-type(2) > select').element.value).toBe('8')
    expect(
      wrapper
        .findAll('.search_select > .v-col:nth-of-type(3) > select > option')
        .map((opt) => [opt.attributes('value'), opt.text()])
    ).toStrictEqual([
      ['10', 'wwww'],
      ['20', 'xxxx'],
      ['30', 'yyyy'],
      ['40', 'zzzz']
    ])
    expect(wrapper.find('.search_select > .v-col:nth-of-type(4) > button').exists()).toBe(true)
    expect(wrapper.find('.search_result').element.childElementCount).toBe(1)
    expect(wrapper.find('.search_result > .v-col > label').text()).toBe(
      'Pas de critère de recherche'
    )
    wrapper.find('.search_select > .v-col:nth-of-type(2) > select').setValue('9')
    const input = wrapper.find('.search_select > .v-col:nth-of-type(3) > select')
    input.setValue(['20', '40'])
    expect(wrapper.vm.getValue(true)).toStrictEqual('[["multiselect",9,"20;40"]]')
  })

  it('show one str', async () => {
    const wrapper = mount(SearchComp, {
      global: {
        plugins: [vuetify, i18n]
      },
      props: {
        value: [['name', 6, 'abc123']],
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
          selectors: SELECTORS
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
    expect(wrapper.find('.search_result').element.childElementCount).toBe(2)
    expect(wrapper.find('.search_result > .search_title').text()).toBe('Votre critère de recherche')
    expect(wrapper.findAll('.search_result > .v-col > .search_result').length).toBe(1)
    expect(
      wrapper.find('.search_result > .v-col > .search_result:nth-of-type(1)').element
        .childElementCount
    ).toBe(2)
    expect(
      wrapper
        .find(
          '.search_result > .v-col > .search_result:nth-of-type(1) > .v-col:nth-of-type(1) > label'
        )
        .text()
    ).toBe('nom commence par "abc123"')
    expect(
      wrapper
        .find(
          '.search_result > .v-col > .search_result:nth-of-type(1) > .v-col:nth-of-type(2) > button'
        )
        .exists()
    ).toBe(true)
  })

  it('show many float', async () => {
    const wrapper = mount(SearchComp, {
      global: {
        plugins: [vuetify, i18n]
      },
      props: {
        value: [['value', 1, ['4.5', '7.2', '9.9']]],
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
          selectors: SELECTORS
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
    expect(wrapper.find('.search_result').element.childElementCount).toBe(2)
    expect(wrapper.find('.search_result > .search_title').text()).toBe('Votre critère de recherche')
    expect(wrapper.findAll('.search_result > .v-col > .search_result').length).toBe(1)
    expect(
      wrapper.find('.search_result > .v-col > .search_result:nth-of-type(1)').element
        .childElementCount
    ).toBe(2)
    expect(
      wrapper
        .find(
          '.search_result > .v-col > .search_result:nth-of-type(1) > .v-col:nth-of-type(1) > label'
        )
        .text()
    ).toBe('valeur égal 4.5 ou 7.2 ou 9.9')
    expect(
      wrapper
        .find(
          '.search_result > .v-col > .search_result:nth-of-type(1) > .v-col:nth-of-type(2) > button'
        )
        .exists()
    ).toBe(true)
  })

  it('show all item', async () => {
    const wrapper = mount(SearchComp, {
      global: {
        plugins: [vuetify, i18n]
      },
      props: {
        value: [
          ['name', 6, 'abc123'],
          ['value', 3, '8.7'],
          ['check', 1, true],
          ['date', 2, '2018-07-21'],
          ['time', 4, '12:45'],
          ['select', 8, '1;3'],
          ['multiselect', 9, '20;40']
        ],
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
          selectors: SELECTORS
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
    expect(wrapper.find('.search_result').element.childElementCount).toBe(2)
    expect(wrapper.find('.search_result > .search_title').text()).toBe('Votre critère de recherche')
    expect(wrapper.findAll('.search_result > .v-col > .search_result').length).toBe(7)
    expect(
      wrapper.find('.search_result > .v-col > .search_result:nth-of-type(1)').element
        .childElementCount
    ).toBe(2)
    expect(
      wrapper
        .find(
          '.search_result > .v-col > .search_result:nth-of-type(1) > .v-col:nth-of-type(1) > label'
        )
        .text()
    ).toBe('nom commence par "abc123"')
    expect(
      wrapper
        .find(
          '.search_result > .v-col > .search_result:nth-of-type(1) > .v-col:nth-of-type(2) > button'
        )
        .exists()
    ).toBe(true)
    expect(
      wrapper
        .find(
          '.search_result > .v-col > .search_result:nth-of-type(2) > .v-col:nth-of-type(1) > label'
        )
        .text()
    ).toBe('valeur inférieur 8.7')
    expect(
      wrapper
        .find(
          '.search_result > .v-col > .search_result:nth-of-type(2) > .v-col:nth-of-type(2) > button'
        )
        .exists()
    ).toBe(true)
    expect(
      wrapper
        .find(
          '.search_result > .v-col > .search_result:nth-of-type(3) > .v-col:nth-of-type(1) > label'
        )
        .text()
    ).toBe('contrôle égal Oui')
    expect(
      wrapper
        .find(
          '.search_result > .v-col > .search_result:nth-of-type(3) > .v-col:nth-of-type(2) > button'
        )
        .exists()
    ).toBe(true)
    expect(
      wrapper
        .find(
          '.search_result > .v-col > .search_result:nth-of-type(4) > .v-col:nth-of-type(1) > label'
        )
        .text()
    ).toBe('date différent 2018-07-21')
    expect(
      wrapper
        .find(
          '.search_result > .v-col > .search_result:nth-of-type(4) > .v-col:nth-of-type(2) > button'
        )
        .exists()
    ).toBe(true)
    expect(
      wrapper
        .find(
          '.search_result > .v-col > .search_result:nth-of-type(5) > .v-col:nth-of-type(1) > label'
        )
        .text()
    ).toBe('time supérieur 12:45')
    expect(
      wrapper
        .find(
          '.search_result > .v-col > .search_result:nth-of-type(5) > .v-col:nth-of-type(2) > button'
        )
        .exists()
    ).toBe(true)
    expect(
      wrapper
        .find(
          '.search_result > .v-col > .search_result:nth-of-type(6) > .v-col:nth-of-type(1) > label'
        )
        .text()
    ).toBe('sélection égal "aaa" ou "ccc"')
    expect(
      wrapper
        .find(
          '.search_result > .v-col > .search_result:nth-of-type(6) > .v-col:nth-of-type(2) > button'
        )
        .exists()
    ).toBe(true)
    expect(
      wrapper
        .find(
          '.search_result > .v-col > .search_result:nth-of-type(7) > .v-col:nth-of-type(1) > label'
        )
        .text()
    ).toBe('multi-sélection égal "xxxx" et "zzzz"')
    expect(
      wrapper
        .find(
          '.search_result > .v-col > .search_result:nth-of-type(7) > .v-col:nth-of-type(2) > button'
        )
        .exists()
    ).toBe(true)

    await wrapper
      .find(
        '.search_result > .v-col > .search_result:nth-of-type(4) > .v-col:nth-of-type(2) > button'
      )
      .trigger('click')
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
          short_icon: 'mdi:mdi-delete-outline',
          text: 'delete',
          no_check: true,
          unique: 1
        },
        false
      ]
    ])
    expect(wrapper.vm.getValue(true)).toStrictEqual(
      '[["name",6,"abc123"],["value",3,"8.7"],["check",1,true],["time",4,"12:45"],["select",8,"1;3"],["multiselect",9,"20;40"]]'
    )
  })
})
