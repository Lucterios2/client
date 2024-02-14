import { describe, it, expect, beforeEach, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'

import App from '@/App.vue'
import storage from '@/libs/datastorage.js'
import i18n from '@/libs/i18n.js'
import { nextTick } from 'vue'
import { callLucteriosAction, initialTransport } from '@/libs/transport.js'
import { clearComponent, initialObserver, factory } from '@/libs/observer'
import { sleep } from '@/libs/utils'

const default_obs = {
  context: {},
  meta: {
    extension: 'moke ext',
    title: 'moke title',
    action: 'moke action',
    observer: 'moke observer'
  },
  actions: [],
  close: null
}

beforeEach(() => {
  document.documentElement.innerHTML = '<html><body><div id="comp"></div></body></html>'
  console.warn = vi.fn()
  vi.mock('@/libs/observer.js', () => {
    return {
      initialObserver: vi.fn(() => true),
      clearComponent: vi.fn(() => true),
      factory: vi.fn(() => true)
    }
  })
  vi.mock('@/libs/transport.js', () => {
    return {
      initialTransport: vi.fn(() => true),
      callLucteriosAction: vi.fn(() => {
        return default_obs
      })
    }
  })
  vi.clearAllMocks()
})

describe('App', () => {
  it('empty', async () => {
    storage.commit('call_status', false)
    storage.commit('call_waiting', false)

    const wrapper = shallowMount(App, {
      global: {
        plugins: [storage, i18n]
      }
    })
    await nextTick()
    expect(wrapper.element.childElementCount).toBe(2)
    expect(wrapper.find('v-row').element.childElementCount).toBe(0)
    expect(wrapper.find('div').element.childElementCount).toBe(0)
    expect(wrapper.get('div').attributes('id')).toBe('comp')
    expect(initialObserver).toHaveBeenCalledTimes(1)
    expect(initialTransport).toHaveBeenCalledTimes(1)
    expect(callLucteriosAction).toHaveBeenCalledTimes(1)
    expect(callLucteriosAction).lastCalledWith({ id: 'CORE/authentification', method: 'POST' })
    expect(factory).toHaveBeenCalledTimes(1)
    expect(factory).lastCalledWith(default_obs, wrapper.vm.click_action)
    expect(clearComponent).toHaveBeenCalledTimes(0)
  }),
    it('status', async () => {
      storage.commit('call_status', true)
      storage.commit('call_waiting', false)

      const wrapper = shallowMount(App, {
        global: {
          plugins: [storage, i18n]
        }
      })
      await nextTick()
      expect(initialObserver).toHaveBeenCalledTimes(1)
      expect(initialTransport).toHaveBeenCalledTimes(1)
      expect(callLucteriosAction).toHaveBeenCalledTimes(1)
      expect(factory).toHaveBeenCalledTimes(1)
      expect(clearComponent).toHaveBeenCalledTimes(0)

      expect(wrapper.element.childElementCount).toBe(2)
      expect(wrapper.find('v-row').element.childElementCount).toBe(1)
      expect(wrapper.find('v-row > status-bar-stub').text()).toBe('')
      expect(wrapper.find('div').element.childElementCount).toBe(0)
      expect(wrapper.get('div').attributes('id')).toBe('comp')

      expect(wrapper.vm.show_about).toBe(false)
      await wrapper.find('v-row > status-bar-stub').trigger('about')
      expect(wrapper.vm.show_about).toBe(true)

      await wrapper.find('v-row > status-bar-stub').trigger('refresh')
      expect(initialObserver).toHaveBeenCalledTimes(1)
      expect(initialTransport).toHaveBeenCalledTimes(1)
      expect(callLucteriosAction).toHaveBeenCalledTimes(2)
      expect(callLucteriosAction).lastCalledWith({
        id: 'CORE/authentification',
        method: 'POST',
        params: { info: true }
      })
      expect(factory).toHaveBeenCalledTimes(2)
      expect(clearComponent).toHaveBeenCalledTimes(1)

      await wrapper.find('v-row > status-bar-stub').trigger('logoff')
      expect(clearComponent).toHaveBeenCalledTimes(2)
      expect(callLucteriosAction).toHaveBeenCalledTimes(2)
      await sleep(200)
      expect(initialObserver).toHaveBeenCalledTimes(1)
      expect(initialTransport).toHaveBeenCalledTimes(1)
      expect(callLucteriosAction).toHaveBeenCalledTimes(3)
      expect(callLucteriosAction).lastCalledWith({ id: 'CORE/exitConnection' })
      expect(factory).toHaveBeenCalledTimes(3)
      expect(clearComponent).toHaveBeenCalledTimes(2)

      await wrapper.find('v-row > status-bar-stub').trigger('login')
      expect(clearComponent).toHaveBeenCalledTimes(3)
      expect(callLucteriosAction).toHaveBeenCalledTimes(3)
      await sleep(200)
      expect(initialObserver).toHaveBeenCalledTimes(1)
      expect(initialTransport).toHaveBeenCalledTimes(1)
      expect(callLucteriosAction).toHaveBeenCalledTimes(4)
      expect(callLucteriosAction).lastCalledWith({ id: 'CORE/authentification', method: 'POST' })
      expect(factory).toHaveBeenCalledTimes(4)
      expect(clearComponent).toHaveBeenCalledTimes(3)
    }),
    it('waiting', async () => {
      storage.commit('call_status', false)
      storage.commit('call_waiting', true)

      const wrapper = shallowMount(App, {
        global: {
          plugins: [storage, i18n]
        }
      })
      expect(storage.state.show_waiting).toBe(true)
      expect(wrapper.element.childElementCount).toBe(3)
      expect(wrapper.find('v-row').element.childElementCount).toBe(0)
      expect(wrapper.find('waiting-frame-stub').text()).toBe('')
      expect(wrapper.find('div').element.childElementCount).toBe(0)
      expect(wrapper.find('div').attributes('id')).toBe('comp')
    }),
    it('about', async () => {
      storage.commit('call_status', false)
      storage.commit('call_waiting', false)
      const wrapper = shallowMount(App, {
        global: {
          plugins: [storage, i18n]
        }
      })
      expect(wrapper.element.childElementCount).toBe(2)
      expect(wrapper.find('v-row').element.childElementCount).toBe(0)
      expect(wrapper.find('div').element.childElementCount).toBe(0)
      expect(wrapper.find('div').attributes('id')).toBe('comp')
      wrapper.vm.show_about = true
      await nextTick()
      expect(wrapper.element.childElementCount).toBe(3)
      expect(wrapper.find('v-row').element.childElementCount).toBe(0)
      expect(wrapper.find('about-frame-stub').text()).toBe('')
      expect(wrapper.find('div').element.childElementCount).toBe(0)
      expect(wrapper.find('div').attributes('id')).toBe('comp')
    })
})
