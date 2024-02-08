import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'

import ExceptionBox from '../ExceptionBox.vue'
import storage from '../../datastorage.js'
import i18n from '../../i18n.js'
import { nextTick } from 'vue'

describe('ExceptionBox', () => {
  it('minor', async () => {
    const wrapper = shallowMount(ExceptionBox, {
      propsData: {
        exception: {
          type: 'LucteriosException',
          debug: '',
          message: 'Error message',
          code: 4,
          request: '',
          response: ''
        },
        meta: { extension: '', title: '', action: '', observer: '' },
        close: null,
        context: { id: 123, text: 'abc' }
      },
      global: {
        plugins: [i18n]
      }
    })
    expect(wrapper.find('v-card').element.childElementCount).toBe(3)
    expect(wrapper.find('v-card > v-card-title').element.childElementCount).toBe(0)
    expect(wrapper.find('v-card > v-card-title').text()).toBe('Information')

    expect(wrapper.find('v-card > v-card-text > v-row').element.childElementCount).toBe(2)
    expect(
      wrapper.find('v-card > v-card-text > v-row > v-col:nth-of-type(1)').element.childElementCount
    ).toBe(1)
    expect(
      wrapper.find('v-card > v-card-text > v-row > v-col:nth-of-type(1) > v-icon').element
        .childElementCount
    ).toBe(0)
    expect(
      wrapper.find('v-card > v-card-text > v-row > v-col:nth-of-type(1) > v-icon').text()
    ).toBe('mdi:mdi-help-circle-outline')
    expect(
      wrapper.find('v-card > v-card-text > v-row > v-col:nth-of-type(2)').element.childElementCount
    ).toBe(1)
    expect(wrapper.find('v-card > v-card-text > v-row > v-col:nth-of-type(2) > span').text()).toBe(
      'Error message'
    )

    expect(
      wrapper.find('v-card > buttons-bar-stub').getCurrentComponent().props.actions
    ).toStrictEqual([{ id: '', text: 'Fermer', icon: 'mdi:mdi-close', close: '0' }])

    expect(wrapper.emitted('close')).toStrictEqual(undefined)
    await wrapper.find('v-card > buttons-bar-stub').trigger('close')
    expect(wrapper.emitted('close')).toStrictEqual([[]])
  })

  it('important', async () => {
    const wrapper = shallowMount(ExceptionBox, {
      propsData: {
        exception: {
          type: 'LucteriosException',
          debug: '',
          message: 'Warning message',
          code: 3,
          request: '',
          response: ''
        },
        meta: { extension: '', title: '', action: '', observer: '' },
        close: null,
        context: { id: 123, text: 'abc' }
      },
      global: {
        plugins: [i18n]
      }
    })
    expect(wrapper.find('v-card').element.childElementCount).toBe(3)
    expect(wrapper.find('v-card > v-card-title').element.childElementCount).toBe(0)
    expect(wrapper.find('v-card > v-card-title').text()).toBe('Avertissement')

    expect(wrapper.find('v-card > v-card-text > v-row').element.childElementCount).toBe(2)
    expect(
      wrapper.find('v-card > v-card-text > v-row > v-col:nth-of-type(1)').element.childElementCount
    ).toBe(1)
    expect(
      wrapper.find('v-card > v-card-text > v-row > v-col:nth-of-type(1) > v-icon').element
        .childElementCount
    ).toBe(0)
    expect(
      wrapper.find('v-card > v-card-text > v-row > v-col:nth-of-type(1) > v-icon').text()
    ).toBe('mdi:mdi-alert-outline')
    expect(
      wrapper.find('v-card > v-card-text > v-row > v-col:nth-of-type(2)').element.childElementCount
    ).toBe(1)
    expect(wrapper.find('v-card > v-card-text > v-row > v-col:nth-of-type(2) > span').text()).toBe(
      'Warning message'
    )

    expect(
      wrapper.find('v-card > buttons-bar-stub').getCurrentComponent().props.actions
    ).toStrictEqual([{ id: '', text: 'Fermer', icon: 'mdi:mdi-close', close: '0' }])
  })

  it('grave', async () => {
    const wrapper = shallowMount(ExceptionBox, {
      propsData: {
        exception: {
          type: 'LucteriosException',
          debug: 'First line{[br]}second line{[br]}...{[br/]}last line',
          message: 'Grave message',
          code: 2,
          request: '',
          response: ''
        },
        meta: { extension: '', title: '', action: '', observer: '' },
        close: null,
        context: { id: 123, text: 'abc' }
      },
      global: {
        plugins: [i18n]
      }
    })
    expect(wrapper.find('v-card').element.childElementCount).toBe(3)
    expect(wrapper.find('v-card > v-card-title').element.childElementCount).toBe(0)
    expect(wrapper.find('v-card > v-card-title').text()).toBe('Avertissement')

    expect(wrapper.find('v-card > v-card-text > v-row').element.childElementCount).toBe(3)
    expect(
      wrapper.find('v-card > v-card-text > v-row > v-col:nth-of-type(1)').element.childElementCount
    ).toBe(1)
    expect(
      wrapper.find('v-card > v-card-text > v-row > v-col:nth-of-type(1) > v-icon').element
        .childElementCount
    ).toBe(0)
    expect(
      wrapper.find('v-card > v-card-text > v-row > v-col:nth-of-type(1) > v-icon').text()
    ).toBe('mdi:mdi-alert')
    expect(
      wrapper.find('v-card > v-card-text > v-row > v-col:nth-of-type(2)').element.childElementCount
    ).toBe(1)
    expect(wrapper.find('v-card > v-card-text > v-row > v-col:nth-of-type(2) > span').text()).toBe(
      'Grave message'
    )
    expect(
      wrapper.find('v-card > v-card-text > v-row > v-col:nth-of-type(3)').element.childElementCount
    ).toBe(1)
    expect(
      wrapper.find('v-card > v-card-text > v-row > v-col:nth-of-type(3) > v-btn').attributes('icon')
    ).toBe('mdi:mdi-chevron-double-right')
    expect(
      wrapper.find('v-card > buttons-bar-stub').getCurrentComponent().props.actions
    ).toStrictEqual([
      { id: 'send', text: 'Support', icon: 'mdi:mdi-mail', close: '1' },
      { id: '', text: 'Fermer', icon: 'mdi:mdi-close', close: '0' }
    ])

    await wrapper
      .find('v-card > v-card-text > v-row > v-col:nth-of-type(3) > v-btn')
      .trigger('click')
    await nextTick()
    expect(wrapper.find('v-card > v-card-text > v-row').element.childElementCount).toBe(4)
    expect(
      wrapper.find('v-card > v-card-text > v-row > v-col:nth-of-type(3) > v-btn').attributes('icon')
    ).toBe('mdi:mdi-chevron-double-left')
    expect(
      wrapper.find('v-card > v-card-text > v-row > v-col:nth-of-type(4)').element.childElementCount
    ).toBe(1)
    expect(
      wrapper.find('v-card > v-card-text > v-row > v-col:nth-of-type(4) > v-card').element
        .childElementCount
    ).toBe(2)
    expect(
      wrapper.find('v-card > v-card-text > v-row > v-col:nth-of-type(4) > v-card > v-tabs').element
        .childElementCount
    ).toBe(2)
    expect(
      wrapper
        .find(
          'v-card > v-card-text > v-row > v-col:nth-of-type(4) > v-card > v-tabs > v-tab:nth-of-type(1)'
        )
        .text()
    ).toBe("Pile d'appel")
    expect(
      wrapper
        .find(
          'v-card > v-card-text > v-row > v-col:nth-of-type(4) > v-card > v-tabs > v-tab:nth-of-type(2)'
        )
        .text()
    ).toBe('Extra')

    expect(
      wrapper.find('v-card > v-card-text > v-row > v-col:nth-of-type(4) > v-card > v-card-text')
        .element.childElementCount
    ).toBe(1)
    expect(
      wrapper.find(
        'v-card > v-card-text > v-row > v-col:nth-of-type(4) > v-card > v-card-text > v-window'
      ).element.childElementCount
    ).toBe(4)
    expect(
      wrapper
        .find(
          'v-card > v-card-text > v-row > v-col:nth-of-type(4) > v-card > v-card-text > v-window > v-window-item:nth-of-type(1)'
        )
        .text()
    ).toBe('First line\nsecond line\n...\nlast line')
    expect(
      wrapper
        .find(
          'v-card > v-card-text > v-row > v-col:nth-of-type(4) > v-card > v-card-text > v-window > v-window-item:nth-of-type(2)'
        )
        .text()
    ).toBe('LucteriosException')
    expect(
      wrapper
        .find(
          'v-card > v-card-text > v-row > v-col:nth-of-type(4) > v-card > v-card-text > v-window > v-window-item:nth-of-type(3)'
        )
        .text()
    ).toBe('')
    expect(
      wrapper
        .find(
          'v-card > v-card-text > v-row > v-col:nth-of-type(4) > v-card > v-card-text > v-window > v-window-item:nth-of-type(4)'
        )
        .text()
    ).toBe('')
  })

  it('critic', async () => {
    const wrapper = shallowMount(ExceptionBox, {
      propsData: {
        exception: {
          type: 'LucteriosException',
          debug: 'First line{[br]}second line{[br]}...{[br/]}last line',
          message: 'Critic message',
          code: 1,
          request: 'truc/muche?id=1&value=12',
          response: ''
        },
        meta: { extension: '', title: '', action: '', observer: '' },
        close: null,
        context: { id: 123, text: 'abc' }
      },
      global: {
        plugins: [i18n]
      }
    })
    expect(wrapper.find('v-card').element.childElementCount).toBe(3)
    expect(wrapper.find('v-card > v-card-title').text()).toBe('Erreur')

    expect(wrapper.find('v-card > v-card-text > v-row').element.childElementCount).toBe(3)
    expect(
      wrapper.find('v-card > v-card-text > v-row > v-col:nth-of-type(1) > v-icon').text()
    ).toBe('mdi:mdi-alert-box')
    expect(wrapper.find('v-card > v-card-text > v-row > v-col:nth-of-type(2) > span').text()).toBe(
      'Critic message'
    )
    expect(
      wrapper.find('v-card > v-card-text > v-row > v-col:nth-of-type(3) > v-btn').attributes('icon')
    ).toBe('mdi:mdi-chevron-double-right')

    expect(
      wrapper.find('v-card > buttons-bar-stub').getCurrentComponent().props.actions
    ).toStrictEqual([
      { id: 'send', text: 'Support', icon: 'mdi:mdi-mail', close: '1' },
      { id: '', text: 'Fermer', icon: 'mdi:mdi-close', close: '0' }
    ])

    await wrapper
      .find('v-card > v-card-text > v-row > v-col:nth-of-type(3) > v-btn')
      .trigger('click')
    await nextTick()
    expect(wrapper.find('v-card > v-card-text > v-row').element.childElementCount).toBe(4)
    expect(
      wrapper.find('v-card > v-card-text > v-row > v-col:nth-of-type(3) > v-btn').attributes('icon')
    ).toBe('mdi:mdi-chevron-double-left')
    expect(
      wrapper.find('v-card > v-card-text > v-row > v-col:nth-of-type(4) > v-card > v-tabs').element
        .childElementCount
    ).toBe(3)
    expect(
      wrapper
        .find(
          'v-card > v-card-text > v-row > v-col:nth-of-type(4) > v-card > v-tabs > v-tab:nth-of-type(1)'
        )
        .text()
    ).toBe("Pile d'appel")
    expect(
      wrapper
        .find(
          'v-card > v-card-text > v-row > v-col:nth-of-type(4) > v-card > v-tabs > v-tab:nth-of-type(2)'
        )
        .text()
    ).toBe('Extra')
    expect(
      wrapper
        .find(
          'v-card > v-card-text > v-row > v-col:nth-of-type(4) > v-card > v-tabs > v-tab:nth-of-type(3)'
        )
        .text()
    ).toBe('Requête')

    expect(
      wrapper
        .find(
          'v-card > v-card-text > v-row > v-col:nth-of-type(4) > v-card > v-card-text > v-window > v-window-item:nth-of-type(1)'
        )
        .text()
    ).toBe('First line\nsecond line\n...\nlast line')
    expect(
      wrapper
        .find(
          'v-card > v-card-text > v-row > v-col:nth-of-type(4) > v-card > v-card-text > v-window > v-window-item:nth-of-type(2)'
        )
        .text()
    ).toBe('LucteriosException')
    expect(
      wrapper
        .find(
          'v-card > v-card-text > v-row > v-col:nth-of-type(4) > v-card > v-card-text > v-window > v-window-item:nth-of-type(3)'
        )
        .text()
    ).toBe('truc/muche?id=1&value=12')
    expect(
      wrapper
        .find(
          'v-card > v-card-text > v-row > v-col:nth-of-type(4) > v-card > v-card-text > v-window > v-window-item:nth-of-type(4)'
        )
        .text()
    ).toBe('')
  })

  it('failure', async () => {
    storage.commit('change_server', {
      support_email: 'support@lucterios.org'
    })
    const wrapper = shallowMount(ExceptionBox, {
      propsData: {
        exception: {
          type: 'LucteriosException',
          debug: 'First line{[br]}second line{[br]}...{[br/]}last line',
          message: 'Failure message',
          code: 0,
          request: 'truc/muche?id=1&value=12',
          response: '{"name":"aaa", "list":[12,45,98], "value": 36.82, "check":true}'
        },
        meta: { extension: '', title: '', action: '', observer: '' },
        close: null,
        context: { id: 123, text: 'abc' }
      },
      global: {
        plugins: [storage, i18n]
      }
    })
    expect(wrapper.find('v-card').element.childElementCount).toBe(3)
    expect(wrapper.find('v-card > v-card-title').text()).toBe('Échec')

    expect(wrapper.find('v-card > v-card-text > v-row').element.childElementCount).toBe(3)
    expect(
      wrapper.find('v-card > v-card-text > v-row > v-col:nth-of-type(1) > v-icon').text()
    ).toBe('mdi:mdi-alert-circle')
    expect(wrapper.find('v-card > v-card-text > v-row > v-col:nth-of-type(2) > span').text()).toBe(
      'Failure message'
    )
    expect(
      wrapper.find('v-card > v-card-text > v-row > v-col:nth-of-type(3) > v-btn').attributes('icon')
    ).toBe('mdi:mdi-chevron-double-right')

    await wrapper
      .find('v-card > v-card-text > v-row > v-col:nth-of-type(3) > v-btn')
      .trigger('click')
    await nextTick()
    expect(wrapper.find('v-card > v-card-text > v-row').element.childElementCount).toBe(4)
    expect(
      wrapper.find('v-card > v-card-text > v-row > v-col:nth-of-type(3) > v-btn').attributes('icon')
    ).toBe('mdi:mdi-chevron-double-left')
    expect(
      wrapper.find('v-card > v-card-text > v-row > v-col:nth-of-type(4) > v-card > v-tabs').element
        .childElementCount
    ).toBe(4)
    expect(
      wrapper
        .find(
          'v-card > v-card-text > v-row > v-col:nth-of-type(4) > v-card > v-tabs > v-tab:nth-of-type(1)'
        )
        .text()
    ).toBe("Pile d'appel")
    expect(
      wrapper
        .find(
          'v-card > v-card-text > v-row > v-col:nth-of-type(4) > v-card > v-tabs > v-tab:nth-of-type(2)'
        )
        .text()
    ).toBe('Extra')
    expect(
      wrapper
        .find(
          'v-card > v-card-text > v-row > v-col:nth-of-type(4) > v-card > v-tabs > v-tab:nth-of-type(3)'
        )
        .text()
    ).toBe('Requête')
    expect(
      wrapper
        .find(
          'v-card > v-card-text > v-row > v-col:nth-of-type(4) > v-card > v-tabs > v-tab:nth-of-type(4)'
        )
        .text()
    ).toBe('Reponse')

    expect(
      wrapper
        .find(
          'v-card > v-card-text > v-row > v-col:nth-of-type(4) > v-card > v-card-text > v-window > v-window-item:nth-of-type(1)'
        )
        .text()
    ).toBe('First line\nsecond line\n...\nlast line')
    expect(
      wrapper
        .find(
          'v-card > v-card-text > v-row > v-col:nth-of-type(4) > v-card > v-card-text > v-window > v-window-item:nth-of-type(2)'
        )
        .text()
    ).toBe('LucteriosException')
    expect(
      wrapper
        .find(
          'v-card > v-card-text > v-row > v-col:nth-of-type(4) > v-card > v-card-text > v-window > v-window-item:nth-of-type(3)'
        )
        .text()
    ).toBe('truc/muche?id=1&value=12')
    expect(
      wrapper
        .find(
          'v-card > v-card-text > v-row > v-col:nth-of-type(4) > v-card > v-card-text > v-window > v-window-item:nth-of-type(4)'
        )
        .text()
    ).toBe(
      '{\n    "name": "aaa",\n    "list": [\n        12,\n        45,\n        98\n    ],\n    "value": 36.82,\n    "check": true\n}'
    )

    expect(
      wrapper.find('v-card > buttons-bar-stub').getCurrentComponent().props.actions
    ).toStrictEqual([
      { id: 'send', text: 'Support', icon: 'mdi:mdi-mail', close: '1' },
      { id: '', text: 'Fermer', icon: 'mdi:mdi-close', close: '0' }
    ])

    expect(window.location.href).toBe('http://localhost:3000/')
    expect(wrapper.emitted('close')).toStrictEqual(undefined)
    await wrapper
      .find('v-card > buttons-bar-stub')
      .trigger('actionclick', { id: '', text: 'Fermer', icon: 'mdi:mdi-close', close: '0' })
    expect(window.location.href).toBe('http://localhost:3000/')
    expect(wrapper.emitted('close')).toStrictEqual(undefined)
    await wrapper.find('v-card > buttons-bar-stub').trigger('close')
    expect(window.location.href).toBe('http://localhost:3000/')
    expect(wrapper.emitted('close')).toStrictEqual([[]])
    await wrapper
      .find('v-card > buttons-bar-stub')
      .trigger('actionclick', { id: 'send', text: 'Support', icon: 'mdi:mdi-mail', close: '1' })
    expect(wrapper.emitted('close')).toStrictEqual([[]])
    expect(window.location).toBe(
      "mailto:support@lucterios.org?subject=Rapport%20de%20bogue&body=%0AD%C3%A9crivez%20le%20plus%20pr%C3%A9cis%C3%A9ment%20possible%2C%20comment%20vous%20avez%20obtenu%20ce%20probl%C3%A8me.%0AMerci%20de%20votre%20aide.%0A%0A%0A%23%23%23%20Failure%20message%20%23%23%23%0A**Pile%20d'appel**%0AFirst%20line%0Asecond%20line%0A...%0Alast%20line%0A%0A**Extra**%0ALucteriosException%0A%0A**Requ%C3%AAte**%0Atruc%2Fmuche%3Fid%3D1%26value%3D12%0A%0A**Reponse**%0A%7B%22name%22%3A%22aaa%22%2C%20%22list%22%3A%5B12%2C45%2C98%5D%2C%20%22value%22%3A%2036.82%2C%20%22check%22%3Atrue%7D%0A%0A__________________________________________%0A%23%23%23%23%20%20%23%23%23%23%0AVersion%20%3A%20%0AServeur%20%3A%20%0AClient%20%3A%20%0AConnection%20%3A%20%40%0Ahttp%3A%2F%2Flocalhost%3A3000%2F%0A%0A__________________________________________%0A%0A"
    )
  })
})
