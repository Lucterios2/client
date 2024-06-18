import { describe, it, expect, beforeEach, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'

import AboutFrame from '@/libs/AboutFrame.vue'
import storage from '@/libs/datastorage.js'
import i18n from '@/libs/i18n.js'

beforeEach(() => {
  console.warn = vi.fn()
})

describe('AboutFrame', () => {
  it('show about', async () => {
    storage.commit('change_client', {
      jsversion: '2.8.99.01234'
    })
    storage.commit('change_server', {
      title: 'Lucterios',
      subtitle: 'sub-title',
      version: '2.x.yy.zzzzzzzz',
      serverversion: '2.u.vv.wwwwwww',
      clientversion: '2.8.99.01234',
      copyright: '(c) GPL Licence',
      info_server: [
        'Cœur Lucterios=2.u.vv.wwwwww1',
        'Contacts Lucterios=2.u.vv.wwwwww2',
        'Documents Lucterios=2.u.vv.wwwwww3',
        '',
        "{[i]}Linux x86_64 4.xx.x-x - Python 3.10 - Django 3.2 - langage 'en'{[/i]}"
      ],
      support_email: 'support@lucterios.org',
      support_html: '{[div]}{[b]}Support{[/b]}{[/div]}',
      logoname: 'public/lucterios.png',
      background: '',
      style: '',
      login: 'admin',
      real_name: '',
      instance: 'lucterios-test',
      message_before: '',
      mode: 0,
      login_field: 'username',
      language: 'en',
      only_admin: false
    })

    const wrapper = shallowMount(AboutFrame, {
      global: {
        plugins: [storage, i18n]
      }
    })
    expect(wrapper.find('v-card-title').text()).toBe('A propos...')
    expect(
      wrapper
        .find('v-card-text > v-row:nth-of-type(1) > v-col:nth-of-type(1) > v-img')
        .attributes('src')
    ).toBe('public/lucterios.png')
    expect(
      wrapper.find('v-card-text > v-row:nth-of-type(1) > v-col:nth-of-type(2) > h2').text()
    ).toBe('Lucterios')
    expect(
      wrapper
        .find(
          'v-card-text > v-row:nth-of-type(1) > v-col:nth-of-type(2) > v-row > v-col:nth-of-type(1)'
        )
        .text()
    ).toBe('Version')
    expect(
      wrapper
        .find(
          'v-card-text > v-row:nth-of-type(1) > v-col:nth-of-type(2) > v-row > v-col:nth-of-type(2)'
        )
        .text()
    ).toBe('2.x.yy.zzzzzzzz')
    expect(
      wrapper
        .find(
          'v-card-text > v-row:nth-of-type(1) > v-col:nth-of-type(2) > v-row > v-col:nth-of-type(3)'
        )
        .text()
    ).toBe('(c) GPL Licence')
    expect(wrapper.find('v-card-text > v-row:nth-of-type(4) > v-col:nth-of-type(1)').text()).toBe(
      "Utilise le cadre d'application Lucterios"
    )
    expect(wrapper.find('v-card-text > v-row:nth-of-type(4) > v-col:nth-of-type(2)').text()).toBe(
      'Serveur'
    )
    expect(wrapper.find('v-card-text > v-row:nth-of-type(4) > v-col:nth-of-type(3)').text()).toBe(
      '2.u.vv.wwwwwww'
    )
    expect(wrapper.find('v-card-text > v-row:nth-of-type(4) > v-col:nth-of-type(4)').text()).toBe(
      'Client'
    )
    expect(wrapper.find('v-card-text > v-row:nth-of-type(4) > v-col:nth-of-type(5)').text()).toBe(
      '2.8.99.01234'
    )
    expect(wrapper.find('v-card-text > v-img').attributes('src')).toBe('LucteriosImage.png')
    expect(wrapper.find('v-card-text > v-row:nth-of-type(5) > v-col:nth-of-type(1)').text()).toBe(
      'Outil de gestion personnalisé sous licence GPL'
    )
    expect(
      wrapper.find('v-card-text > v-row:nth-of-type(5) > v-col:nth-of-type(2) > a').text()
    ).toBe('https://www.lucterios.org')
    expect(
      wrapper.find('v-card-text > v-row:nth-of-type(5) > v-col:nth-of-type(3) > a').text()
    ).toBe('https://www.sd-libre.fr')
    expect(wrapper.find('v-card-text > v-row:nth-of-type(5) > v-col:nth-of-type(4)').text()).toBe(
      'Merci de soutenir notre travail.'
    )
    expect(
      wrapper
        .find('v-card-text > v-row:nth-of-type(6) > v-col:nth-of-type(2) > form')
        .attributes('action')
    ).toBe('https://www.paypal.com/donate/')
    expect(
      wrapper
        .find(
          'v-card-text > v-row:nth-of-type(6) > v-col:nth-of-type(2) > form > input:nth-of-type(1)'
        )
        .attributes('value')
    ).toBe('A45MG9JYWHRNA')

    expect(
      wrapper
        .find('v-card-text > span:nth-of-type(1) > div:nth-of-type(1) > b:nth-of-type(1)')
        .text()
    ).toBe('Support')

    expect(wrapper.find('v-card-actions > v-btn:nth-of-type(1)').text()).toBe('Support')
    expect(wrapper.find('v-card-actions > v-btn:nth-of-type(2)').text()).toBe('Ok')

    await wrapper.find('v-card-text > v-img').trigger('click')
    expect(
      wrapper.find('v-card-text > div > v-row:nth-of-type(1) > v-col:nth-of-type(1)').text()
    ).toBe('Cœur Lucterios=2.u.vv.wwwwww1')
    expect(
      wrapper.find('v-card-text > div > v-row:nth-of-type(2) > v-col:nth-of-type(1)').text()
    ).toBe('Contacts Lucterios=2.u.vv.wwwwww2')
    expect(
      wrapper.find('v-card-text > div > v-row:nth-of-type(3) > v-col:nth-of-type(1)').text()
    ).toBe('Documents Lucterios=2.u.vv.wwwwww3')
    expect(
      wrapper.find('v-card-text > div > v-row:nth-of-type(5) > v-col:nth-of-type(1)').text()
    ).toBe("Linux x86_64 4.xx.x-x - Python 3.10 - Django 3.2 - langage 'en'")

    expect(wrapper.find('v-card-text > v-row:nth-of-type(5) > v-col:nth-of-type(1)').text()).toBe(
      'Outil de gestion personnalisé sous licence GPL'
    )

    expect(wrapper.emitted('close')).toStrictEqual(undefined)
    await wrapper.find('v-card-actions > v-btn:nth-of-type(2)').trigger('click')
    expect(wrapper.emitted('close')).toStrictEqual([[]])

    await wrapper.find('v-card-actions > v-btn:nth-of-type(1)').trigger('click')
    expect(window.location).toBe(
      "mailto:support@lucterios.org?subject=Rapport%20de%20bogue&body=%0AD%C3%A9crivez%20le%20plus%20pr%C3%A9cis%C3%A9ment%20possible%2C%20comment%20vous%20avez%20obtenu%20ce%20probl%C3%A8me.%0AMerci%20de%20votre%20aide.%0A%0A__________________________________________%0A%23%23%23%23%20Lucterios%20%23%23%23%23%0AVersion%20%3A%202.x.yy.zzzzzzzz%0AServeur%20%3A%202.u.vv.wwwwwww%0AClient%20%3A%202.8.99.01234%0AConnexion%20%3A%20admin%40lucterios-test%0Ahttp%3A%2F%0A(c)%20GPL%20Licence%0A__________________________________________%0AC%C5%93ur%20Lucterios%3D2.u.vv.wwwwww1%0AContacts%20Lucterios%3D2.u.vv.wwwwww2%0ADocuments%20Lucterios%3D2.u.vv.wwwwww3%0A%0ALinux%20x86_64%204.xx.x-x%20-%20Python%203.10%20-%20Django%203.2%20-%20langage%20'en'%0A"
    )
  })

  it('show version client', async () => {
    storage.commit('change_client', {
      jsversion: '2.8.00.01234'
    })
    storage.commit('change_server', {
      clientversion: '2.8.99.01234'
    })
    const wrapper = shallowMount(AboutFrame, {
      global: {
        plugins: [storage, i18n]
      }
    })
    expect(wrapper.find('v-card-title').text()).toBe('A propos...')
    expect(wrapper.find('v-card-text > v-row:nth-of-type(4) > v-col:nth-of-type(5)').text()).toBe(
      '2.8.99.01234 (Client obsolète : Effectuer une mise à jour)'
    )
  })
})
