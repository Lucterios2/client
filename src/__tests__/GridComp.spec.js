import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import i18n from '@/libs/i18n.js'

import GridComp from '@/components/GridComp.vue'

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
})
