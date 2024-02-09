import { describe, it, expect, beforeEach, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'

import WaitingFrame from '@/components/WaitingFrame.vue'

beforeEach(() => {
  console.warn = vi.fn()
})

describe('LoginBox', () => {
  it('Simple', async () => {
    const wrapper = shallowMount(WaitingFrame, {})
    expect(wrapper.find('v-dialog').element.childElementCount).toBe(1)
    expect(wrapper.find('v-dialog > v-row').element.childElementCount).toBe(1)
    expect(wrapper.find('v-dialog > v-row > v-col').element.childElementCount).toBe(1)
    expect(wrapper.find('v-dialog > v-row > v-col > v-progress-circular').attributes('size')).toBe(
      '120'
    )
    expect(wrapper.find('v-dialog > v-row > v-col > v-progress-circular').attributes('width')).toBe(
      '10'
    )
    expect(
      wrapper.find('v-dialog > v-row > v-col > v-progress-circular').attributes('model-value')
    ).toBe('10')
  })
})
