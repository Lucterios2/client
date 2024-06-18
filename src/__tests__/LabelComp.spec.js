import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'

import LabelForm from '@/components/LabelForm.vue'
import LinkLabel from '@/components/LinkLabel.vue'
import { messages } from '@/libs/i18n-message.js'
import { useI18n } from 'vue-i18n'

beforeEach(() => {
  console.warn = vi.fn()
})

const locale = { value: 'fr' }
vi.mock('vue-i18n')

useI18n.mockReturnValue({
  locale: locale,
  t: (tKey) => {
    return messages[locale.value][tKey]
  }
})

describe('LabelComp', () => {
  it('simple', async () => {
    const wrapper = mount(LabelForm, {
      propsData: {
        value: 'aaa',
        component: { name: 'val1', component: 'AAA', x: 0, y: 0, colspan: 1, rowspan: 1, tab: 0 }
      }
    })
    expect(wrapper.element.childElementCount).toBe(1)
    expect(wrapper.find('span').html()).toBe('<span>aaa</span>')
  })

  it('format', async () => {
    const wrapper = mount(LabelForm, {
      propsData: {
        value: 'bbbb',
        component: {
          name: 'val1',
          component: 'AAA',
          x: 0,
          y: 0,
          colspan: 1,
          rowspan: 1,
          tab: 0,
          formatstr: '{[br/]}{[center]}{[u]}{[b]}%s{[/b]}{[/u]}{[/center]}'
        }
      }
    })
    expect(wrapper.element.childElementCount).toBe(1)
    expect(wrapper.find('span').html()).toBe('<span><br><center><u><b>bbbb</b></u></center></span>')
  })

  it('numeric', async () => {
    const wrapper = mount(LabelForm, {
      propsData: {
        value: 1234.5678,
        component: {
          name: 'val1',
          component: 'AAA',
          x: 0,
          y: 0,
          colspan: 1,
          rowspan: 1,
          tab: 0,
          formatnum: 'N2'
        }
      }
    })
    expect(wrapper.element.childElementCount).toBe(1)
    expect(wrapper.find('span').html()).toBe('<span>1 234,57</span>')
  })

  it('boolean', async () => {
    const wrapper = mount(LabelForm, {
      propsData: {
        value: true,
        component: {
          name: 'val1',
          component: 'AAA',
          x: 0,
          y: 0,
          colspan: 1,
          rowspan: 1,
          tab: 0,
          formatnum: 'B'
        }
      }
    })
    expect(wrapper.element.childElementCount).toBe(1)
    expect(wrapper.find('span').html()).toBe('<span>Oui</span>')
  })

  it('list', async () => {
    const wrapper = mount(LabelForm, {
      propsData: {
        value: [12.3, 4.56, 7890.1],
        component: {
          name: 'val1',
          component: 'AAA',
          x: 0,
          y: 0,
          colspan: 1,
          rowspan: 1,
          tab: 0,
          formatnum: 'N2',
          formatstr: '{0} / {1} = {2}'
        }
      }
    })
    expect(wrapper.element.childElementCount).toBe(1)
    expect(wrapper.find('span').html()).toBe('<span>12,30 / 4,56 = 7 890,10</span>')
  })

  it('with description', async () => {
    const wrapper = mount(LabelForm, {
      propsData: {
        value: 'cccc',
        component: {
          name: 'val1',
          component: 'AAA',
          x: 0,
          y: 0,
          colspan: 1,
          rowspan: 1,
          tab: 0,
          description: 'title'
        }
      }
    })
    expect(wrapper.element.childElementCount).toBe(2)
    expect(wrapper.find('label').text()).toBe('title')
    expect(wrapper.find('span').html()).toBe('<span>cccc</span>')
  })

  it('email', async () => {
    const wrapper = mount(LinkLabel, {
      propsData: {
        value: 'cccc',
        component: {
          name: 'val1',
          component: 'AAA',
          x: 0,
          y: 0,
          colspan: 1,
          rowspan: 1,
          tab: 0,
          description: 'email',
          link: 'https://www.diacamma.org'
        }
      }
    })
    expect(wrapper.element.childElementCount).toBe(2)
    expect(wrapper.find('label').text()).toBe('email')
    expect(wrapper.find('a').text()).toBe('cccc')
    expect(wrapper.find('a').attributes()).toStrictEqual({
      target: '_blank',
      name: 'val1',
      href: 'https://www.diacamma.org'
    })
  })
})
