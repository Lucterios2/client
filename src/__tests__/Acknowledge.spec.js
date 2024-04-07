import { describe, it, expect, beforeEach, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'

import AcknowledgeReturn from '@/observers/AcknowledgeReturn.vue'
import { sleep } from '@/libs/utils'
import { nextTick } from 'vue'

beforeEach(() => {
  console.warn = vi.fn()
})

describe('Acknowledge', () => {
  it('basic', async () => {
    const wrapper = shallowMount(AcknowledgeReturn, {
      propsData: {
        action: null,
        close: null,
        meta: { extension: '', title: 'Simple title', action: '', observer: '' },
        context: { id: 123, text: 'abc' }
      }
    })
    await nextTick()
    await nextTick()
    expect(wrapper.element.childElementCount).toBe(0)
    expect(wrapper.emitted('clickaction')).toStrictEqual(undefined)
    expect(wrapper.emitted('close')).toStrictEqual([[true]])
  }),
    it('with action', async () => {
      const wrapper = shallowMount(AcknowledgeReturn, {
        propsData: {
          action: {
            id: 'def',
            text: 'action2',
            icon: 'icon2',
            close: '0',
            params: { value: 54.65 }
          },
          close: null,
          meta: { extension: '', title: 'Simple title', action: '', observer: '' },
          context: { id: 123, text: 'abc' }
        }
      })
      expect(wrapper.element.childElementCount).toBe(0)
      await sleep(200)
      expect(wrapper.emitted('clickaction')).toStrictEqual([
        [
          {
            id: 'def',
            text: 'action2',
            icon: 'icon2',
            close: '0',
            params: { value: 54.65, id: 123, text: 'abc' }
          },
          true
        ]
      ])
      expect(wrapper.emitted('close')).toStrictEqual([[false]])
    }),
    it('with close', async () => {
      const wrapper = shallowMount(AcknowledgeReturn, {
        propsData: {
          action: null,
          close: { id: 'abc', text: 'action1', icon: 'icon1', close: '1', params: { truc: true } },
          meta: { extension: '', title: 'Simple title', action: '', observer: '' },
          context: { id: 123, text: 'abc' }
        }
      })
      expect(wrapper.element.childElementCount).toBe(0)
      await sleep(200)
      expect(wrapper.emitted('clickaction')).toStrictEqual([
        [
          {
            id: 'abc',
            text: 'action1',
            icon: 'icon1',
            close: '1',
            params: { truc: true, id: 123, text: 'abc' }
          },
          true
        ]
      ])
      expect(wrapper.emitted('close')).toStrictEqual([[true]])
    }),
    it('both action & close', async () => {
      const wrapper = shallowMount(AcknowledgeReturn, {
        propsData: {
          action: {
            id: 'def',
            text: 'action2',
            icon: 'icon2',
            close: '0',
            params: { value: 54.65 }
          },
          close: { id: 'abc', text: 'action1', icon: 'icon1', close: '1', params: { truc: true } },
          meta: { extension: '', title: 'Simple title', action: '', observer: '' },
          context: { id: 123, text: 'abc' }
        }
      })
      expect(wrapper.element.childElementCount).toBe(0)
      await nextTick()
      await sleep(300)
      expect(wrapper.emitted('clickaction')).toStrictEqual([
        [
          {
            id: 'def',
            text: 'action2',
            icon: 'icon2',
            close: '0',
            params: { value: 54.65, id: 123, text: 'abc' }
          },
          true
        ],
        [
          {
            id: 'abc',
            text: 'action1',
            icon: 'icon1',
            close: '1',
            params: { truc: true, id: 123, text: 'abc' }
          },
          true
        ]
      ])
      expect(wrapper.emitted('close')).toStrictEqual([[false]])
    })
})
