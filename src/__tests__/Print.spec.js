import { describe, it, expect, beforeEach, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'

import * as utils from '@/libs/utils'
import PrintReturn from '@/observers/PrintReturn.vue'
import { nextTick } from 'vue'

beforeEach(() => {
  console.warn = vi.fn()
  vi.spyOn(utils, 'openBlob')
  utils.openBlob.mockImplementation(() => {
    return true
  })
})

describe('Print', () => {
  it('CSV file', async () => {
    const wrapper = shallowMount(PrintReturn, {
      propsData: {
        action: null,
        close: null,
        meta: { extension: '', title: 'Simple title', action: '', observer: '' },
        context: { id: 123, text: 'abc' },
        print: {
          title: "Example d'impression",
          extension: '.csv',
          content:
            'CiAgICAgICJFeGFtcGxlIgogICAgCiAgICAgIAogICAgICAibmFtZSIKICAgICAgImFhYWEiCiAgICAgICJ2YWx1ZSIKICAgICAgIjUiCiAgICAgICJwcmljZSIKICAgICAgIjEwMC4wMCIKICAgICAgImRhdGUiCiAgICAgICItLS0iCiAgICAgICJ0aW1lIgogICAgICAiMDA6MDAiCiAgICAgICJ2YWxpZCIKICAgICAgIk5vbiIKICAgICAgImNvbW1lbnQiCiAgICAgICJxcXFxIgogICAgCg=='
        }
      }
    })
    await nextTick()
    await nextTick()
    expect(wrapper.element.childElementCount).toBe(0)
    expect(wrapper.emitted('clickaction')).toStrictEqual([
      [{ id: '', close: 1, params: { id: 123, text: 'abc' } }, false, null]
    ])
    expect(utils.openBlob).toHaveBeenCalledTimes(1)
    expect(utils.openBlob).lastCalledWith(new Blob(), 'Example_d_impression.csv')
  })
})
