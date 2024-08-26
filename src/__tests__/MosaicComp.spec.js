import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import i18n from '@/libs/i18n.js'

import MosaicComp from '@/components/MosaicComp.vue'
import { nextTick } from 'vue'

beforeEach(() => {
  console.warn = vi.fn()
})

const props_Data = {
  value: [
    {
      id: 1,
      image: 'data:image/png;base64,aaa',
      name: 'aaaaa',
      info: '<b>AA</b> <i>11</i>',
      group: 1
    },
    {
      id: 2,
      image: 'data:image/png;base64,bbb',
      name: 'bbbbb',
      info: '<b>BB</b> <i>22</i>',
      group: 2
    },
    {
      id: 3,
      image: 'mdi:mdi-mailbox-up',
      name: 'ccccc',
      info: '<b>CC</b> <i>33</i>',
      group: 2
    },
    {
      id: 4,
      image: 'mdi:mdi-mailbox-up',
      name: 'ddddd',
      info: '<b>DD</b> <i>44</i>',
      group: 1
    }
  ],
  component: {
    name: 'test',
    component: 'MOSAIC',
    description: 'Test',
    page_max: 4,
    page_num: 2,
    order: 'val1',
    img_dim: 1,
    order_fields: [
      ['val1', 'Value 1 (Ascendant)'],
      ['-val1', 'Value 1 (Descendant)'],
      ['val2', 'Value 2 (Ascendant)'],
      ['-val2', 'Value 2 (Descendant)']
    ],
    actions: [],
    size_by_page: 50,
    nb_items: 194,
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

const spec_actions = [
  [
    null,
    [
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
        unique: '2',
        method: 'DELETE',
        params: null
      }
    ]
  ],
  [
    1,
    [
      {
        text: 'text multi 1',
        id: 'ext/act_multi1',
        short_icon: 'icon_multi',
        extension: 'ext',
        action: 'act_multi1',
        modal: '1',
        close: '0',
        unique: '1',
        method: 'GET',
        params: null
      }
    ]
  ],
  [
    2,
    [
      {
        text: 'text multi 2',
        id: 'ext/act_multi2',
        short_icon: 'icon_multi',
        extension: 'ext',
        action: 'act_multi2',
        modal: '1',
        close: '0',
        unique: '1',
        method: 'GET',
        params: null
      }
    ]
  ]
]

describe('MosaicComp', () => {
  it('simple empty', async () => {
    const wrapper = mount(MosaicComp, {
      propsData: {
        value: [],
        component: {
          name: 'test',
          component: 'MOSAIC',
          description: 'Test',
          page_max: 1,
          page_num: 0,
          order: 'val1',
          img_dim: 1,
          order_fields: [
            ['val1', 'Value 1 (Ascendant)'],
            ['-val1', 'Value 1 (Descendant)'],
            ['val2', 'Value 2 (Ascendant)'],
            ['-val2', 'Value 2 (Descendant)']
          ],
          actions: [],
          size_by_page: 25,
          nb_items: 0,
          no_pager: false
        }
      },
      global: {
        plugins: [i18n]
      }
    })
    await nextTick()
    expect(wrapper.element.childElementCount).toBe(2)
    expect(wrapper.find('label').text()).toBe('Test')
    expect(wrapper.find('.v-field_abstract').element.childElementCount).toBe(3)
    expect(wrapper.find('.mosaic_buttons').element.childElementCount).toBe(3)
    expect(wrapper.find('.mosaic_buttons > v-col:nth-of-type(1)').element.childElementCount).toBe(0)
    expect(wrapper.find('.mosaic_buttons > v-col:nth-of-type(2)').element.childElementCount).toBe(1)
    expect(
      wrapper.find('.mosaic_buttons > v-col:nth-of-type(2) > div > div > center > v-btn-toggle')
        .element.childElementCount
    ).toBe(3)
    expect(
      wrapper
        .find('.mosaic_buttons > v-col:nth-of-type(2) > div > div > center > v-btn-toggle')
        .attributes('modelvalue')
    ).toBe('1')
    expect(wrapper.find('.mosaic_buttons > v-col:nth-of-type(3)').element.childElementCount).toBe(1)
    expect(
      wrapper.findAll('.mosaic_buttons > v-col:nth-of-type(3) > div > div > select > option').length
    ).toBe(4)
    expect(
      wrapper.find('.mosaic_buttons > v-col:nth-of-type(3) > div > div > select').element.value
    ).toBe('val1')

    expect(wrapper.find('.v-field_abstract > v-row:nth-of-type(2)').element.childElementCount).toBe(
      1
    )
    expect(
      wrapper.find(
        '.v-field_abstract > v-row:nth-of-type(2) > div.mosaic_images > v-item-group > v-row'
      ).element.childElementCount
    ).toBe(0)

    expect(wrapper.find('.v-field_abstract > v-row:nth-of-type(3)').element.childElementCount).toBe(
      3
    )
    expect(
      wrapper.findAll(
        '.v-field_abstract > v-row:nth-of-type(3) > v-col:nth-of-type(1) > div > div > select > option'
      ).length
    ).toBe(5)
    expect(
      wrapper.find(
        '.v-field_abstract > v-row:nth-of-type(3) > v-col:nth-of-type(1) > div > div > select'
      ).element.value
    ).toBe('25')
    expect(
      wrapper.find('.v-field_abstract > v-row:nth-of-type(3) > v-col:nth-of-type(2)').text()
    ).toBe('1 à 0 (0 au total)')
    expect(
      wrapper
        .find('.v-field_abstract > v-row:nth-of-type(3) > v-col:nth-of-type(3) > v-pagination')
        .attributes('modelvalue')
    ).toBe('1')
    expect(
      wrapper
        .find('.v-field_abstract > v-row:nth-of-type(3) > v-col:nth-of-type(3) > v-pagination')
        .attributes('length')
    ).toBe('1')
  })

  it('with data', async () => {
    const wrapper = mount(MosaicComp, {
      propsData: props_Data,
      global: {
        plugins: [i18n]
      }
    })
    await nextTick()
    expect(wrapper.find('label').text()).toBe('Test')
    expect(wrapper.find('.v-field_abstract').element.childElementCount).toBe(3)
    expect(wrapper.find('.mosaic_buttons').element.childElementCount).toBe(3)
    expect(wrapper.find('.mosaic_buttons > v-col:nth-of-type(1)').element.childElementCount).toBe(0)
    expect(wrapper.find('.mosaic_buttons > v-col:nth-of-type(2)').element.childElementCount).toBe(1)
    expect(
      wrapper.find('.mosaic_buttons > v-col:nth-of-type(2) > div > div > center > v-btn-toggle')
        .element.childElementCount
    ).toBe(3)
    expect(
      wrapper
        .find('.mosaic_buttons > v-col:nth-of-type(2) > div > div > center > v-btn-toggle')
        .attributes('modelvalue')
    ).toBe('1')
    expect(wrapper.find('.mosaic_buttons > v-col:nth-of-type(3)').element.childElementCount).toBe(1)
    expect(
      wrapper.findAll('.mosaic_buttons > v-col:nth-of-type(3) > div > div > select > option').length
    ).toBe(4)
    expect(
      wrapper.find('.mosaic_buttons > v-col:nth-of-type(3) > div > div > select').element.value
    ).toBe('val1')

    expect(wrapper.find('.v-field_abstract > v-row:nth-of-type(2)').element.childElementCount).toBe(
      1
    )
    expect(
      wrapper.find(
        '.v-field_abstract > v-row:nth-of-type(2) > div.mosaic_images > v-item-group > v-row'
      ).element.childElementCount
    ).toBe(4)
    expect(
      wrapper
        .find(
          '.v-field_abstract > v-row:nth-of-type(2) > div.mosaic_images > v-item-group > v-row > v-col:nth-of-type(1) > v-item > v-btn'
        )
        .attributes('width')
    ).toBe('150')
    expect(
      wrapper
        .find(
          '.v-field_abstract > v-row:nth-of-type(2) > div.mosaic_images > v-item-group > v-row > v-col:nth-of-type(1) > v-item > v-btn > img'
        )
        .attributes('src')
    ).toBe('data:image/png;base64,aaa')
    expect(
      wrapper
        .find(
          '.v-field_abstract > v-row:nth-of-type(2) > div.mosaic_images > v-item-group > v-row > v-col:nth-of-type(1) > v-item > v-btn > label'
        )
        .text()
    ).toBe('aaaaa')
    expect(
      wrapper
        .find(
          '.v-field_abstract > v-row:nth-of-type(2) > div.mosaic_images > v-item-group > v-row > v-col:nth-of-type(1) > v-item > v-tooltip > span'
        )
        .html()
    ).toBe('<span><b>AA</b> <i>11</i></span>')

    expect(
      wrapper
        .find(
          '.v-field_abstract > v-row:nth-of-type(2) > div.mosaic_images > v-item-group > v-row > v-col:nth-of-type(2) > v-item > v-btn'
        )
        .attributes('width')
    ).toBe('150')
    expect(
      wrapper
        .find(
          '.v-field_abstract > v-row:nth-of-type(2) > div.mosaic_images > v-item-group > v-row > v-col:nth-of-type(2) > v-item > v-btn > img'
        )
        .attributes('src')
    ).toBe('data:image/png;base64,bbb')
    expect(
      wrapper
        .find(
          '.v-field_abstract > v-row:nth-of-type(2) > div.mosaic_images > v-item-group > v-row > v-col:nth-of-type(2) > v-item > v-btn > label'
        )
        .text()
    ).toBe('bbbbb')
    expect(
      wrapper
        .find(
          '.v-field_abstract > v-row:nth-of-type(2) > div.mosaic_images > v-item-group > v-row > v-col:nth-of-type(2) > v-item > v-tooltip > span'
        )
        .html()
    ).toBe('<span><b>BB</b> <i>22</i></span>')

    expect(
      wrapper
        .find(
          '.v-field_abstract > v-row:nth-of-type(2) > div.mosaic_images > v-item-group > v-row > v-col:nth-of-type(3) > v-item > v-btn'
        )
        .attributes('width')
    ).toBe('150')
    expect(
      wrapper
        .find(
          '.v-field_abstract > v-row:nth-of-type(2) > div.mosaic_images > v-item-group > v-row > v-col:nth-of-type(3) > v-item > v-btn > v-icon'
        )
        .text()
    ).toBe('mdi:mdi-mailbox-up')
    expect(
      wrapper
        .find(
          '.v-field_abstract > v-row:nth-of-type(2) > div.mosaic_images > v-item-group > v-row > v-col:nth-of-type(3) > v-item > v-btn > label'
        )
        .text()
    ).toBe('ccccc')
    expect(
      wrapper
        .find(
          '.v-field_abstract > v-row:nth-of-type(2) > div.mosaic_images > v-item-group > v-row > v-col:nth-of-type(3) > v-item > v-tooltip > span'
        )
        .html()
    ).toBe('<span><b>CC</b> <i>33</i></span>')

    expect(
      wrapper
        .find(
          '.v-field_abstract > v-row:nth-of-type(2) > div.mosaic_images > v-item-group > v-row > v-col:nth-of-type(4) > v-item > v-btn'
        )
        .attributes('width')
    ).toBe('150')
    expect(
      wrapper
        .find(
          '.v-field_abstract > v-row:nth-of-type(2) > div.mosaic_images > v-item-group > v-row > v-col:nth-of-type(4) > v-item > v-btn > v-icon'
        )
        .text()
    ).toBe('mdi:mdi-mailbox-up')
    expect(
      wrapper
        .find(
          '.v-field_abstract > v-row:nth-of-type(2) > div.mosaic_images > v-item-group > v-row > v-col:nth-of-type(4) > v-item > v-btn > label'
        )
        .text()
    ).toBe('ddddd')
    expect(
      wrapper
        .find(
          '.v-field_abstract > v-row:nth-of-type(2) > div.mosaic_images > v-item-group > v-row > v-col:nth-of-type(4) > v-item > v-tooltip > span'
        )
        .html()
    ).toBe('<span><b>DD</b> <i>44</i></span>')

    expect(wrapper.find('.v-field_abstract > v-row:nth-of-type(3)').element.childElementCount).toBe(
      3
    )
    expect(
      wrapper.findAll(
        '.v-field_abstract > v-row:nth-of-type(3) > v-col:nth-of-type(1) > div > div > select > option'
      ).length
    ).toBe(5)
    expect(
      wrapper.find(
        '.v-field_abstract > v-row:nth-of-type(3) > v-col:nth-of-type(1) > div > div > select'
      ).element.value
    ).toBe('50')
    expect(
      wrapper.find('.v-field_abstract > v-row:nth-of-type(3) > v-col:nth-of-type(2)').text()
    ).toBe('101 à 150 (194 au total)')
    expect(
      wrapper
        .find('.v-field_abstract > v-row:nth-of-type(3) > v-col:nth-of-type(3) > v-pagination')
        .attributes('modelvalue')
    ).toBe('3')
    expect(
      wrapper
        .find('.v-field_abstract > v-row:nth-of-type(3) > v-col:nth-of-type(3) > v-pagination')
        .attributes('length')
    ).toBe('4')
    expect(wrapper.emitted('action')).toStrictEqual(undefined)
  })

  it('loadItems', async () => {
    const wrapper = mount(MosaicComp, {
      propsData: props_Data,
      global: {
        plugins: [i18n]
      }
    })
    await nextTick()
    expect(wrapper.element.childElementCount).toBe(2)
    expect(wrapper.emitted('action')).toStrictEqual(undefined)

    wrapper.vm.$data.image_dim = 0
    wrapper.vm.$data.current_page = 1
    await wrapper
      .find('.mosaic_buttons > v-col:nth-of-type(3) > div > div > select')
      .setValue('-val2')
    await wrapper
      .find('.v-field_abstract > v-row:nth-of-type(3) > v-col:nth-of-type(1) > div > div > select')
      .setValue('100')
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
            'MOSAIC_DIM%test': 0,
            'MOSAIC_ORDER%test': '-val2',
            'MOSAIC_PAGE%test': 0,
            'MOSAIC_SIZE%test': 50
          },
          unique: 1
        },
        false
      ],
      [
        {
          action: 'act',
          close: 0,
          extension: 'ext',
          id: 'ext/act',
          method: 'GET',
          modal: 2,
          params: {
            'MOSAIC_DIM%test': 0,
            'MOSAIC_ORDER%test': '-val2',
            'MOSAIC_PAGE%test': 0,
            'MOSAIC_SIZE%test': 100
          },
          unique: 1
        },
        false
      ]
    ])
  })

  it('with actions', async () => {
    const new_props = Object.assign({}, props_Data)
    new_props.component.actions = spec_actions
    const wrapper = mount(MosaicComp, {
      propsData: new_props,
      global: {
        plugins: [i18n]
      }
    })
    await nextTick()
    expect(wrapper.find('label').text()).toBe('Test')
    expect(wrapper.find('.v-field_abstract').element.childElementCount).toBe(3)
    expect(wrapper.find('.mosaic_buttons').element.childElementCount).toBe(3)
    expect(wrapper.find('.mosaic_buttons > v-col:nth-of-type(1)').element.childElementCount).toBe(1)
    expect(
      wrapper.findAll('.mosaic_buttons > v-col:nth-of-type(1) > v-card-actions > div').length
    ).toBe(2)

    expect(wrapper.element.childElementCount).toBe(2)
    expect(
      wrapper
        .find(
          '.mosaic_buttons > v-col:nth-of-type(1) > v-card-actions > div:nth-of-type(1) > v-btn > span'
        )
        .text()
    ).toBe('text none')
    expect(
      wrapper
        .find(
          '.mosaic_buttons > v-col:nth-of-type(1) > v-card-actions > div:nth-of-type(2) > v-btn > span'
        )
        .text()
    ).toBe('text single')
    expect(
      wrapper
        .find(
          '.mosaic_buttons > v-col:nth-of-type(1) > v-card-actions > div:nth-of-type(1) > v-btn'
        )
        .attributes('disabled')
    ).toBe('false')
    expect(
      wrapper
        .find(
          '.mosaic_buttons > v-col:nth-of-type(1) > v-card-actions > div:nth-of-type(2) > v-btn'
        )
        .attributes('disabled')
    ).toBe('true')

    await wrapper
      .find(
        '.v-field_abstract > v-row:nth-of-type(2) > div.mosaic_images > v-item-group > v-row > v-col:nth-of-type(1) > v-item > v-btn'
      )
      .trigger('click')
    await wrapper
      .find(
        '.v-field_abstract > v-row:nth-of-type(2) > div.mosaic_images > v-item-group > v-row > v-col:nth-of-type(4) > v-item > v-btn'
      )
      .trigger('click')

    await nextTick()
    expect(
      wrapper
        .find(
          '.mosaic_buttons > v-col:nth-of-type(1) > v-card-actions > div:nth-of-type(1) > v-btn'
        )
        .attributes('disabled')
    ).toBe('false')
    expect(
      wrapper
        .find(
          '.mosaic_buttons > v-col:nth-of-type(1) > v-card-actions > div:nth-of-type(2) > v-btn'
        )
        .attributes('disabled')
    ).toBe('false')

    await wrapper
      .find('.mosaic_buttons > v-col:nth-of-type(1) > v-card-actions > div:nth-of-type(1) > v-btn')
      .trigger('click')
    await wrapper
      .find('.mosaic_buttons > v-col:nth-of-type(1) > v-card-actions > div:nth-of-type(2) > v-btn')
      .trigger('click')
    await nextTick()

    expect(wrapper.emitted('action')).toStrictEqual([
      [
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
          params: {},
          disabled: false,
          no_check: true,
          num: 4
        },
        false
      ],
      [
        {
          text: 'text single',
          id: 'ext/act_single',
          short_icon: 'icon_single',
          extension: 'ext',
          action: 'act_single',
          modal: '1',
          close: '0',
          unique: '2',
          method: 'DELETE',
          params: {
            test: '1;4'
          },
          disabled: false,
          no_check: true,
          num: 5
        },
        false
      ]
    ])
  })

  it('double click', async () => {
    const new_props = Object.assign({}, props_Data)
    new_props.component.actions = spec_actions
    const wrapper = mount(MosaicComp, {
      propsData: new_props,
      global: {
        plugins: [i18n]
      }
    })
    await nextTick()
    expect(wrapper.find('label').text()).toBe('Test')
    expect(wrapper.find('.v-field_abstract').element.childElementCount).toBe(3)

    await wrapper
      .find(
        '.v-field_abstract > v-row:nth-of-type(2) > div.mosaic_images > v-item-group > v-row > v-col:nth-of-type(1) > v-item > v-btn'
      )
      .trigger('dblclick')
    await wrapper
      .find(
        '.v-field_abstract > v-row:nth-of-type(2) > div.mosaic_images > v-item-group > v-row > v-col:nth-of-type(2) > v-item > v-btn'
      )
      .trigger('dblclick')

    await nextTick()
    expect(wrapper.emitted('action')).toStrictEqual([
      [
        {
          text: 'text multi 1',
          id: 'ext/act_multi1',
          short_icon: 'icon_multi',
          extension: 'ext',
          action: 'act_multi1',
          modal: '1',
          close: '0',
          unique: '1',
          method: 'GET',
          no_check: true,
          params: { test: 1 }
        },
        false
      ],
      [
        {
          text: 'text multi 2',
          id: 'ext/act_multi2',
          short_icon: 'icon_multi',
          extension: 'ext',
          action: 'act_multi2',
          modal: '1',
          close: '0',
          unique: '1',
          method: 'GET',
          no_check: true,
          params: { test: 2 }
        },
        false
      ]
    ])
  })
})
