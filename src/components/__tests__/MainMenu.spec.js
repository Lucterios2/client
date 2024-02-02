import { describe, it, expect } from 'vitest'
import { nextTick } from 'vue'
import { shallowMount } from '@vue/test-utils'

import MainMenu from '../MainMenu.vue'
import SubMenu from '../SubMenu.vue'
import SubMenus from '../SubMenus.vue'
import storage from '../../datastorage.js'

describe('MainMenu', () => {
  it('Empty', async () => {
    storage.commit('call_summary', false)
    const wrapper = shallowMount(MainMenu, {
      propsData: {
        data: []
      },
      global: {
        plugins: [storage]
      }
    })
    expect(wrapper.element.childElementCount).toBe(1)
    expect(wrapper.find('v-row').element.childElementCount).toBe(1)

    storage.commit('call_summary', true)
    await nextTick()
    expect(wrapper.element.childElementCount).toBe(1)
    expect(wrapper.find('v-row').element.childElementCount).toBe(1)
    expect(wrapper.find('v-row > v-col').element.childElementCount).toBe(1)
    expect(wrapper.find('v-row > v-col > v-card').element.childElementCount).toBe(2)
    expect(wrapper.find('v-row > v-col > v-card > v-tabs').element.childElementCount).toBe(0)
    expect(wrapper.find('v-row > v-col > v-card > v-tabs').text()).toBe('')
    expect(wrapper.find('v-row > v-col > v-card > v-card-text').element.childElementCount).toBe(1)
    expect(
      wrapper.find('v-row > v-col > v-card > v-card-text > v-window').element.childElementCount
    ).toBe(0)
    expect(wrapper.find('v-row > v-col > v-card > v-card-text > v-window').text()).toBe('')
  })

  it('Summary', async () => {
    storage.commit('call_summary', false)
    storage.commit('change_server', { support_html: '<div><b>Support</b></div>' })
    const wrapper = shallowMount(MainMenu, {
      propsData: {
        data: [
          {
            text: '',
            id: 'core.menu',
            modal: '1',
            close: '1',
            unique: '1',
            method: 'POST',
            params: null,
            menus: [
              {
                text: 'Résumé 1',
                id: 'CORE/statusMenu1',
                icon: '/static/lucterios.CORE/images/status.png',
                short_icon: '',
                extension: 'CORE',
                action: 'statusMenu1',
                help: 'Résumé 1',
                modal: '1',
                close: '1',
                unique: '1',
                method: 'GET',
                params: null
              },
              {
                text: 'Résumé 2',
                id: 'CORE/statusMenu2',
                icon: '/static/lucterios.CORE/images/status.png',
                short_icon: 'mdi:mdiInformation',
                extension: 'CORE',
                action: 'statusMenu2',
                help: 'Résumé 2',
                modal: '1',
                close: '1',
                unique: '1',
                method: 'GET',
                params: null
              }
            ]
          }
        ]
      },
      global: {
        plugins: [storage]
      }
    })

    expect(wrapper.element.childElementCount).toBe(1)
    expect(wrapper.find('v-row').element.childElementCount).toBe(1)

    storage.commit('call_summary', true)
    await nextTick()
    expect(wrapper.element.childElementCount).toBe(1)
    expect(wrapper.find('v-row').element.childElementCount).toBe(2)
    expect(wrapper.find('v-row > div > div > span > div').html()).toBe('<div><b>Support</b></div>')
    expect(wrapper.find('v-row > div > v-expansion-panels').element.childElementCount).toBe(2)
    expect(
      wrapper
        .find('v-row > div > v-expansion-panels > v-expansion-panel:nth-of-type(1)')
        .attributes('value')
    ).toBe('CORE/statusMenu1')
    expect(
      wrapper.find(
        'v-row > div > v-expansion-panels > v-expansion-panel:nth-of-type(1) > v-expansion-panel-title'
      ).element.childElementCount
    ).toBe(2)
    expect(
      wrapper
        .find(
          'v-row > div > v-expansion-panels > v-expansion-panel:nth-of-type(1) > v-expansion-panel-title > div > v-img'
        )
        .attributes('src')
    ).toBe('/static/lucterios.CORE/images/status.png')
    expect(
      wrapper
        .find(
          'v-row > div > v-expansion-panels > v-expansion-panel:nth-of-type(1) > v-expansion-panel-title > spam'
        )
        .text()
    ).toBe('Résumé 1')
    expect(
      wrapper
        .find(
          'v-row > div > v-expansion-panels > v-expansion-panel:nth-of-type(1) > v-expansion-panel-text'
        )
        .text()
    ).toBe('CORE - statusMenu1')

    expect(
      wrapper
        .find('v-row > div > v-expansion-panels > v-expansion-panel:nth-of-type(2)')
        .attributes('value')
    ).toBe('CORE/statusMenu2')
    expect(
      wrapper.find(
        'v-row > div > v-expansion-panels > v-expansion-panel:nth-of-type(2) > v-expansion-panel-title'
      ).element.childElementCount
    ).toBe(2)
    expect(
      wrapper
        .find(
          'v-row > div > v-expansion-panels > v-expansion-panel:nth-of-type(2) > v-expansion-panel-title > v-icon'
        )
        .text()
    ).toBe('mdi:mdiInformation')
    expect(
      wrapper
        .find(
          'v-row > div > v-expansion-panels > v-expansion-panel:nth-of-type(2) > v-expansion-panel-title > spam'
        )
        .text()
    ).toBe('Résumé 2')
    expect(
      wrapper
        .find(
          'v-row > div > v-expansion-panels > v-expansion-panel:nth-of-type(2) > v-expansion-panel-text'
        )
        .text()
    ).toBe('CORE - statusMenu2')

    expect(wrapper.find('v-row > v-col').element.childElementCount).toBe(1)
    expect(wrapper.find('v-row > v-col > v-card').element.childElementCount).toBe(2)
    expect(wrapper.find('v-row > v-col > v-card > v-tabs').element.childElementCount).toBe(0)
    expect(wrapper.find('v-row > v-col > v-card > v-card-text').element.childElementCount).toBe(1)
    expect(
      wrapper.find('v-row > v-col > v-card > v-card-text > v-window').element.childElementCount
    ).toBe(0)
  })

  it('menu', async () => {
    storage.commit('call_summary', false)
    const initial_data = [
      {
        text: 'Général',
        id: 'core.general',
        icon: '/static/lucterios.CORE/images/general.png',
        short_icon: 'mdi:mdi-home',
        help: "Ensemble d'actions génériques liées à l'utilisateur connecté.",
        modal: '1',
        close: '1',
        unique: '1',
        method: 'POST',
        params: null,
        menus: []
      },
      {
        text: 'Bureautique',
        id: 'office',
        icon: '/static/lucterios.contacts/images/office.png',
        short_icon: 'mdi:mdi-desktop-tower',
        help: "Ensemble d'outils de gestion génériques",
        modal: '1',
        close: '1',
        unique: '1',
        method: 'POST',
        params: null,
        menus: []
      },
      {
        text: 'Administration',
        id: 'core.admin',
        icon: '/static/lucterios.CORE/images/admin.png',
        short_icon: '',
        help: "Menu général permettant le réglage et la configuration de l'application.",
        modal: '1',
        close: '1',
        unique: '1',
        method: 'POST',
        params: null,
        menus: []
      }
    ]
    const wrapper = shallowMount(MainMenu, {
      propsData: {
        data: initial_data
      },
      global: {
        plugins: [storage]
      }
    })
    expect(wrapper.element.childElementCount).toBe(1)
    expect(wrapper.find('v-row').element.childElementCount).toBe(1)

    storage.commit('call_summary', true)
    await nextTick()
    expect(wrapper.element.childElementCount).toBe(1)
    expect(wrapper.find('v-row').element.childElementCount).toBe(1)
    expect(wrapper.find('v-row > v-col').element.childElementCount).toBe(1)
    expect(wrapper.find('v-row > v-col > v-card').element.childElementCount).toBe(2)
    expect(wrapper.find('v-row > v-col > v-card > v-tabs').element.childElementCount).toBe(3)
    expect(
      wrapper.find('v-row > v-col > v-card > v-tabs > v-tab:nth-of-type(1)').attributes('value')
    ).toBe('core.general')
    expect(
      wrapper.find('v-row > v-col > v-card > v-tabs > v-tab:nth-of-type(1)').element
        .childElementCount
    ).toBe(2)
    expect(
      wrapper.find('v-row > v-col > v-card > v-tabs > v-tab:nth-of-type(1) > v-icon').text()
    ).toBe('mdi:mdi-home')
    expect(
      wrapper.find('v-row > v-col > v-card > v-tabs > v-tab:nth-of-type(1) > span').text()
    ).toBe('Général')
    expect(
      wrapper.find('v-row > v-col > v-card > v-tabs > v-tab:nth-of-type(2)').attributes('value')
    ).toBe('office')
    expect(
      wrapper.find('v-row > v-col > v-card > v-tabs > v-tab:nth-of-type(2)').element
        .childElementCount
    ).toBe(2)
    expect(
      wrapper.find('v-row > v-col > v-card > v-tabs > v-tab:nth-of-type(2) > v-icon').text()
    ).toBe('mdi:mdi-desktop-tower')
    expect(
      wrapper.find('v-row > v-col > v-card > v-tabs > v-tab:nth-of-type(2) > span').text()
    ).toBe('Bureautique')
    expect(
      wrapper.find('v-row > v-col > v-card > v-tabs > v-tab:nth-of-type(3)').attributes('value')
    ).toBe('core.admin')
    expect(
      wrapper.find('v-row > v-col > v-card > v-tabs > v-tab:nth-of-type(3)').element
        .childElementCount
    ).toBe(2)
    expect(
      wrapper
        .find('v-row > v-col > v-card > v-tabs > v-tab:nth-of-type(3) > v-img')
        .attributes('src')
    ).toBe('/static/lucterios.CORE/images/admin.png')
    expect(
      wrapper.find('v-row > v-col > v-card > v-tabs > v-tab:nth-of-type(3) > span').text()
    ).toBe('Administration')
    expect(wrapper.find('v-row > v-col > v-card > v-card-text').element.childElementCount).toBe(1)
    expect(
      wrapper.find('v-row > v-col > v-card > v-card-text > v-window').element.childElementCount
    ).toBe(3)
    expect(
      wrapper
        .find('v-row > v-col > v-card > v-card-text > v-window > v-window-item:nth-of-type(1)')
        .attributes('value')
    ).toBe('core.general')
    expect(
      wrapper
        .find(
          'v-row > v-col > v-card > v-card-text > v-window > v-window-item:nth-of-type(1) > sub-menus-stub'
        )
        .getCurrentComponent().props.with_image
    ).toBe(false)
    expect(
      wrapper
        .find(
          'v-row > v-col > v-card > v-card-text > v-window > v-window-item:nth-of-type(1) > sub-menus-stub'
        )
        .getCurrentComponent().props.menu
    ).toStrictEqual(initial_data[0])
    expect(
      wrapper
        .find('v-row > v-col > v-card > v-card-text > v-window > v-window-item:nth-of-type(2)')
        .attributes('value')
    ).toBe('office')
    expect(
      wrapper
        .find(
          'v-row > v-col > v-card > v-card-text > v-window > v-window-item:nth-of-type(2) > sub-menus-stub'
        )
        .getCurrentComponent().props.with_image
    ).toBe(false)
    expect(
      wrapper
        .find(
          'v-row > v-col > v-card > v-card-text > v-window > v-window-item:nth-of-type(2) > sub-menus-stub'
        )
        .getCurrentComponent().props.menu
    ).toStrictEqual(initial_data[1])
    expect(
      wrapper
        .find('v-row > v-col > v-card > v-card-text > v-window > v-window-item:nth-of-type(3)')
        .attributes('value')
    ).toBe('core.admin')
    expect(
      wrapper
        .find(
          'v-row > v-col > v-card > v-card-text > v-window > v-window-item:nth-of-type(3) > sub-menus-stub'
        )
        .getCurrentComponent().props.with_image
    ).toBe(false)
    expect(
      wrapper
        .find(
          'v-row > v-col > v-card > v-card-text > v-window > v-window-item:nth-of-type(3) > sub-menus-stub'
        )
        .getCurrentComponent().props.menu
    ).toStrictEqual(initial_data[2])

    expect(wrapper.emitted('clickaction')).toStrictEqual(undefined)
    await wrapper
      .find(
        'v-row > v-col > v-card > v-card-text > v-window > v-window-item:nth-of-type(3) > sub-menus-stub'
      )
      .trigger('clickaction', { id: 'core.general' })
    expect(wrapper.emitted('clickaction').length).toStrictEqual(1)
    expect(wrapper.emitted('clickaction')[0].length).toStrictEqual(1)
    expect(wrapper.emitted('clickaction')[0][0].id).toStrictEqual('core.general')
  })

  it('submenu icon', async () => {
    const initial_menu = {
      text: 'Nos coordonnées',
      id: 'lucterios.contacts/currentStructure',
      icon: '',
      short_icon: 'mdi:mdi-account',
      extension: 'lucterios.contacts',
      action: 'currentStructure',
      help: 'Fiche de notre structure et de ses responsables',
      modal: '1',
      close: '1',
      unique: '1',
      method: 'GET',
      params: null
    }
    const wrapper = shallowMount(SubMenu, {
      propsData: {
        menu: initial_menu
      },
      global: {
        plugins: [storage]
      }
    })
    expect(wrapper.element.childElementCount).toBe(1)
    expect(wrapper.find('div').element.childElementCount).toBe(1)
    expect(wrapper.find('div > v-card').element.childElementCount).toBe(1)
    expect(wrapper.find('div > v-card > v-card-item').element.childElementCount).toBe(2)
    expect(wrapper.find('div > v-card > v-card-item > v-icon').text()).toBe('mdi:mdi-account')
    expect(
      wrapper.find('div > v-card > v-card-item > v-card-title').element.childElementCount
    ).toBe(2)
    expect(wrapper.find('div > v-card > v-card-item > v-card-title').text()).toBe('Nos coordonnées')
    expect(wrapper.find('div > v-card > v-card-item > v-card-title > br').text()).toBe('')
    expect(
      wrapper.find('div > v-card > v-card-item > v-card-title > v-tooltip').attributes('text')
    ).toBe('Fiche de notre structure et de ses responsables')
    expect(wrapper.emitted('click')).toStrictEqual(undefined)
    await wrapper.find('div > v-card').trigger('click')
    expect(wrapper.emitted('click')).toStrictEqual([[initial_menu]])
  })

  it('submenu img', async () => {
    const initial_menu = {
      text: 'Nos coordonnées',
      id: 'lucterios.contacts/currentStructure',
      icon: '/static/lucterios.contacts/images/ourDetails.png',
      short_icon: '',
      extension: 'lucterios.contacts',
      action: 'currentStructure',
      help: 'Fiche de notre structure et de ses responsables',
      modal: '1',
      close: '1',
      unique: '1',
      method: 'GET',
      params: null
    }
    const wrapper = shallowMount(SubMenu, {
      propsData: {
        menu: initial_menu
      },
      global: {
        plugins: [storage]
      }
    })
    expect(wrapper.element.childElementCount).toBe(1)
    expect(wrapper.find('div').element.childElementCount).toBe(1)
    expect(wrapper.find('div > v-card').element.childElementCount).toBe(1)
    expect(wrapper.find('div > v-card > v-card-item').element.childElementCount).toBe(2)
    expect(wrapper.find('div > v-card > v-card-item > v-img').attributes('src')).toBe(
      '/static/lucterios.contacts/images/ourDetails.png'
    )
    expect(
      wrapper.find('div > v-card > v-card-item > v-card-title').element.childElementCount
    ).toBe(1)
    expect(wrapper.find('div > v-card > v-card-item > v-card-title').text()).toBe('Nos coordonnées')
    expect(
      wrapper.find('div > v-card > v-card-item > v-card-title > v-tooltip').attributes('text')
    ).toBe('Fiche de notre structure et de ses responsables')
    expect(wrapper.emitted('click')).toStrictEqual(undefined)
    await wrapper.find('div > v-card').trigger('click')
    expect(wrapper.emitted('click')).toStrictEqual([[initial_menu]])
  })

  it('submenus with image - empty', async () => {
    const wrapper = shallowMount(SubMenus, {
      propsData: {
        menu: {
          text: 'Général',
          id: 'core.general',
          icon: '/static/lucterios.CORE/images/general.png',
          short_icon: '',
          help: "Ensemble d'actions génériques liées à l'utilisateur connecté.",
          modal: '1',
          close: '1',
          unique: '1',
          method: 'POST',
          params: null,
          menus: []
        },
        with_image: true
      },
      global: {
        plugins: [storage]
      }
    })
    expect(wrapper.element.childElementCount).toBe(1)
    expect(wrapper.find('v-card').element.childElementCount).toBe(1)
    expect(wrapper.find('v-card > v-card-item').element.childElementCount).toBe(4)
    expect(wrapper.find('v-card > v-card-item > v-toolbar').element.childElementCount).toBe(5)
    expect(wrapper.find('v-card > v-card-item > v-toolbar > v-img').attributes('src')).toBe(
      '/static/lucterios.CORE/images/general.png'
    )
    expect(
      wrapper.find('v-card > v-card-item > v-toolbar > v-toolbar-side-icon').element
        .childElementCount
    ).toBe(1)
    expect(
      wrapper.find('v-card > v-card-item > v-toolbar > v-toolbar-side-icon > v-icon').text()
    ).toBe('')
    expect(wrapper.find('v-card > v-card-item > v-toolbar > v-toolbar-title').text()).toBe(
      'Général'
    )
    expect(
      wrapper.find('v-card > v-card-item > v-toolbar > v-spacer').element.childElementCount
    ).toBe(0)
    expect(wrapper.find('v-card > v-card-item > v-toolbar > v-btn').element.childElementCount).toBe(
      1
    )
    expect(wrapper.find('v-card > v-card-item > v-toolbar > v-btn > v-icon').text()).toBe(
      'mdi:mdi-help'
    )
    expect(wrapper.find('v-card > v-card-item > v-card-title').element.childElementCount).toBe(0)
    expect(wrapper.find('v-card > v-card-item > v-spacer').element.childElementCount).toBe(0)
    expect(wrapper.find('v-card > v-card-item > v-card-text').element.childElementCount).toBe(1)
    expect(
      wrapper.find('v-card > v-card-item > v-card-text > v-row').element.childElementCount
    ).toBe(0)
    await wrapper.find('v-card > v-card-item > v-toolbar > v-btn').trigger('click')
    expect(wrapper.find('v-card > v-card-item > v-card-title').element.childElementCount).toBe(1)
    expect(wrapper.find('v-card > v-card-item > v-card-title > div').text()).toBe(
      "Ensemble d'actions génériques liées à l'utilisateur connecté."
    )
  })

  it('submenus with icon - empty', () => {
    const wrapper = shallowMount(SubMenus, {
      propsData: {
        menu: {
          text: 'Général',
          id: 'core.general',
          icon: '/static/lucterios.CORE/images/general.png',
          short_icon: 'mdi:mdi-home',
          help: "Ensemble d'actions génériques liées à l'utilisateur connecté.",
          modal: '1',
          close: '1',
          unique: '1',
          method: 'POST',
          params: null,
          menus: []
        },
        with_image: true
      },
      global: {
        plugins: [storage]
      }
    })
    expect(wrapper.element.childElementCount).toBe(1)
    expect(wrapper.find('v-card').element.childElementCount).toBe(1)
    expect(wrapper.find('v-card > v-card-item').element.childElementCount).toBe(4)
    expect(wrapper.find('v-card > v-card-item > v-toolbar').element.childElementCount).toBe(4)
    expect(
      wrapper.find('v-card > v-card-item > v-toolbar > v-toolbar-side-icon').element
        .childElementCount
    ).toBe(2)
    expect(
      wrapper
        .find('v-card > v-card-item > v-toolbar > v-toolbar-side-icon > v-icon:nth-of-type(1)')
        .text()
    ).toBe('')
    expect(
      wrapper
        .find('v-card > v-card-item > v-toolbar > v-toolbar-side-icon > v-icon:nth-of-type(2)')
        .text()
    ).toBe('mdi:mdi-home')
    expect(wrapper.find('v-card > v-card-item > v-toolbar > v-toolbar-title').text()).toBe(
      'Général'
    )
    expect(
      wrapper.find('v-card > v-card-item > v-toolbar > v-spacer').element.childElementCount
    ).toBe(0)
    expect(wrapper.find('v-card > v-card-item > v-toolbar > v-btn').element.childElementCount).toBe(
      1
    )
    expect(wrapper.find('v-card > v-card-item > v-toolbar > v-btn > v-icon').text()).toBe(
      'mdi:mdi-help'
    )
    expect(wrapper.find('v-card > v-card-item > v-card-title').element.childElementCount).toBe(0)
    // expect(wrapper.find('v-card > v-card-item > v-card-title > div').text()).toBe("Ensemble d'actions génériques liées à l'utilisateur connecté.")
    expect(wrapper.find('v-card > v-card-item > v-spacer').element.childElementCount).toBe(0)
    expect(wrapper.find('v-card > v-card-item > v-card-text').element.childElementCount).toBe(1)
    expect(
      wrapper.find('v-card > v-card-item > v-card-text > v-row').element.childElementCount
    ).toBe(0)
  })

  it('submenus without image -  empty', () => {
    const wrapper = shallowMount(SubMenus, {
      propsData: {
        menu: {
          text: 'Général',
          id: 'core.general',
          icon: '/static/lucterios.CORE/images/general.png',
          short_icon: 'mdi:mdi-home',
          help: "Ensemble d'actions génériques liées à l'utilisateur connecté.",
          modal: '1',
          close: '1',
          unique: '1',
          method: 'POST',
          params: null,
          menus: []
        },
        with_image: false
      },
      global: {
        plugins: [storage]
      }
    })
    expect(wrapper.element.childElementCount).toBe(1)
    expect(wrapper.find('v-card').element.childElementCount).toBe(1)
    expect(wrapper.find('v-card > v-card-item').element.childElementCount).toBe(3)
    expect(wrapper.find('v-card > v-card-item > v-card-title').element.childElementCount).toBe(1)
    expect(wrapper.find('v-card > v-card-item > v-card-title > div').text()).toBe(
      "Ensemble d'actions génériques liées à l'utilisateur connecté."
    )
    expect(wrapper.find('v-card > v-card-item > v-spacer').element.childElementCount).toBe(0)
    expect(wrapper.find('v-card > v-card-item > v-card-text').element.childElementCount).toBe(1)
    expect(
      wrapper.find('v-card > v-card-item > v-card-text > v-row').element.childElementCount
    ).toBe(0)
  })

  it('submenus without image - with submenu', async () => {
    const initial_menu = {
      text: 'Général',
      id: 'core.general',
      icon: '/static/lucterios.CORE/images/general.png',
      short_icon: 'mdi:mdi-home',
      help: "Ensemble d'actions génériques liées à l'utilisateur connecté.",
      modal: '1',
      close: '1',
      unique: '1',
      method: 'POST',
      params: null,
      menus: [
        {
          text: 'submenu 1',
          id: 'CORE/submenu1',
          icon: '',
          short_icon: 'mdi:mdi-information',
          extension: 'CORE',
          action: 'submenu1',
          help: 'submenu 1',
          modal: '1',
          close: '1',
          unique: '1',
          method: 'GET',
          params: null
        },
        {
          text: 'submenu 2',
          id: 'CORE/submenu2',
          icon: '',
          short_icon: 'mdi:mdi-information',
          extension: 'CORE',
          action: 'submenu2',
          help: 'submenu 2',
          modal: '1',
          close: '1',
          unique: '1',
          method: 'GET',
          params: null
        },
        {
          text: 'submenu 3',
          id: 'CORE/submenu3',
          icon: '',
          short_icon: 'mdi:mdi-information',
          extension: 'CORE',
          action: 'submenu3',
          help: 'submenu 3',
          modal: '1',
          close: '1',
          unique: '1',
          method: 'GET',
          params: null,
          menus: []
        },
        {
          text: 'submenu 4',
          id: 'CORE/submenu4',
          icon: '',
          short_icon: 'mdi:mdi-information',
          extension: 'CORE',
          action: 'submenu4',
          help: 'submenu 4',
          modal: '1',
          close: '1',
          unique: '1',
          method: 'GET',
          params: null
        },
        {
          text: 'submenu 5',
          id: 'CORE/submenu5',
          icon: '',
          short_icon: 'mdi:mdi-information',
          extension: 'CORE',
          action: 'submenu5',
          help: 'submenu 5',
          modal: '1',
          close: '1',
          unique: '1',
          method: 'GET',
          params: null,
          menus: []
        },
        {
          text: 'submenu 6',
          id: 'CORE/submenu6',
          icon: '',
          short_icon: 'mdi:mdi-information',
          extension: 'CORE',
          action: 'submenu6',
          help: 'submenu 6',
          modal: '1',
          close: '1',
          unique: '1',
          method: 'GET',
          params: null,
          menus: []
        },
        {
          text: 'submenu 7',
          id: 'CORE/submenu7',
          icon: '',
          short_icon: 'mdi:mdi-information',
          extension: 'CORE',
          action: 'submenu7',
          help: 'submenu 7',
          modal: '1',
          close: '1',
          unique: '1',
          method: 'GET',
          params: null
        }
      ]
    }
    const wrapper = shallowMount(SubMenus, {
      propsData: {
        menu: initial_menu,
        with_image: false
      },
      global: {
        plugins: [storage]
      }
    })
    expect(wrapper.element.childElementCount).toBe(1)
    expect(wrapper.find('v-card').element.childElementCount).toBe(1)
    expect(wrapper.find('v-card > v-card-item').element.childElementCount).toBe(3)
    expect(wrapper.find('v-card > v-card-item > v-card-title').element.childElementCount).toBe(1)
    expect(wrapper.find('v-card > v-card-item > v-card-title > div').text()).toBe(
      "Ensemble d'actions génériques liées à l'utilisateur connecté."
    )
    expect(wrapper.find('v-card > v-card-item > v-spacer').element.childElementCount).toBe(0)
    expect(wrapper.find('v-card > v-card-item > v-card-text').element.childElementCount).toBe(1)
    expect(
      wrapper.find('v-card > v-card-item > v-card-text > v-row').element.childElementCount
    ).toBe(7)
    expect(
      wrapper
        .find('v-card > v-card-item > v-card-text > v-row > v-col:nth-of-type(1)')
        .attributes('cols')
    ).toBe('auto')
    expect(
      wrapper
        .find('v-card > v-card-item > v-card-text > v-row > v-col:nth-of-type(1) > sub-menu-stub')
        .getCurrentComponent().props.menu
    ).toStrictEqual(initial_menu.menus[0])
    expect(
      wrapper
        .find('v-card > v-card-item > v-card-text > v-row > v-col:nth-of-type(2)')
        .attributes('cols')
    ).toBe('auto')
    expect(
      wrapper
        .find('v-card > v-card-item > v-card-text > v-row > v-col:nth-of-type(2) > sub-menu-stub')
        .getCurrentComponent().props.menu
    ).toStrictEqual(initial_menu.menus[1])
    expect(
      wrapper
        .find('v-card > v-card-item > v-card-text > v-row > v-col:nth-of-type(3)')
        .attributes('cols')
    ).toBe('12')
    expect(
      wrapper
        .find('v-card > v-card-item > v-card-text > v-row > v-col:nth-of-type(3) > sub-menus-stub')
        .getCurrentComponent().props.menu
    ).toStrictEqual(initial_menu.menus[2])
    expect(
      wrapper
        .find('v-card > v-card-item > v-card-text > v-row > v-col:nth-of-type(3) > sub-menus-stub')
        .getCurrentComponent().props.with_image
    ).toStrictEqual(true)
    expect(
      wrapper
        .find('v-card > v-card-item > v-card-text > v-row > v-col:nth-of-type(4)')
        .attributes('cols')
    ).toBe('auto')
    expect(
      wrapper
        .find('v-card > v-card-item > v-card-text > v-row > v-col:nth-of-type(4) > sub-menu-stub')
        .getCurrentComponent().props.menu
    ).toStrictEqual(initial_menu.menus[3])
    expect(
      wrapper
        .find('v-card > v-card-item > v-card-text > v-row > v-col:nth-of-type(5)')
        .attributes('cols')
    ).toBe('12')
    expect(
      wrapper
        .find('v-card > v-card-item > v-card-text > v-row > v-col:nth-of-type(5) > sub-menus-stub')
        .getCurrentComponent().props.menu
    ).toStrictEqual(initial_menu.menus[4])
    expect(
      wrapper
        .find('v-card > v-card-item > v-card-text > v-row > v-col:nth-of-type(5) > sub-menus-stub')
        .getCurrentComponent().props.with_image
    ).toStrictEqual(true)
    expect(
      wrapper
        .find('v-card > v-card-item > v-card-text > v-row > v-col:nth-of-type(6)')
        .attributes('cols')
    ).toBe('12')
    expect(
      wrapper
        .find('v-card > v-card-item > v-card-text > v-row > v-col:nth-of-type(6) > sub-menus-stub')
        .getCurrentComponent().props.menu
    ).toStrictEqual(initial_menu.menus[5])
    expect(
      wrapper
        .find('v-card > v-card-item > v-card-text > v-row > v-col:nth-of-type(6) > sub-menus-stub')
        .getCurrentComponent().props.with_image
    ).toStrictEqual(true)
    expect(
      wrapper
        .find('v-card > v-card-item > v-card-text > v-row > v-col:nth-of-type(7)')
        .attributes('cols')
    ).toBe('auto')
    expect(
      wrapper
        .find('v-card > v-card-item > v-card-text > v-row > v-col:nth-of-type(7) > sub-menu-stub')
        .getCurrentComponent().props.menu
    ).toStrictEqual(initial_menu.menus[6])

    expect(wrapper.emitted('clickaction')).toStrictEqual(undefined)
    await wrapper
      .find('v-card > v-card-item > v-card-text > v-row > v-col:nth-of-type(7) > sub-menu-stub')
      .trigger('click', { id: 'lucterios.contacts/currentStructure' })
    expect(wrapper.emitted('clickaction').length).toStrictEqual(1)
    expect(wrapper.emitted('clickaction')[0].length).toStrictEqual(1)
    expect(wrapper.emitted('clickaction')[0][0].id).toStrictEqual(
      'lucterios.contacts/currentStructure'
    )

    await wrapper
      .find('v-card > v-card-item > v-card-text > v-row > v-col:nth-of-type(5) > sub-menus-stub')
      .trigger('clickaction', { id: 'core.general' })
    expect(wrapper.emitted('clickaction').length).toStrictEqual(2)
    expect(wrapper.emitted('clickaction')[1].length).toStrictEqual(1)
    expect(wrapper.emitted('clickaction')[1][0].id).toStrictEqual('core.general')
  })
})
