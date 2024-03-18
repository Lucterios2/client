import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { vuetify } from '@/plugins/vuetify'
import * as utils from '@/libs/utils'
import * as transport from '@/libs/transport'

import DownloadComp from '@/components/DownloadComp.vue'
import i18n from '@/libs/i18n.js'
import { convertToBytes } from '@/libs/utils'
import { image_normal } from '@/__tests__/tools'
import { nextTick } from 'vue'
import JSZip from 'jszip'

var download_content = null
var last_content = null
var call_back_check = null

beforeEach(() => {
  console.warn = vi.fn()
  vi.spyOn(utils, 'openBlob')
  download_content = null
  last_content = null
  utils.openBlob.mockImplementation((lastblob, filename) => {
    console.log('openBlob', lastblob, filename)
    if (call_back_check) {
      call_back_check(lastblob, filename)
    }
    last_content = lastblob
    return true
  })
  vi.spyOn(transport, 'getFileContent')
  transport.getFileContent.mockImplementation(() => {
    return download_content
  })
})

describe('DownloadComp', () => {
  it('simple', async () => {
    download_content = new Blob(convertToBytes(window.atob(image_normal.replaceAll('\n', ''))))
    const wrapper = mount(DownloadComp, {
      global: {
        plugins: [vuetify, i18n]
      },
      propsData: {
        value: 'example.txt',
        component: {
          name: 'aaa',
          description: 'download',
          component: 'DOWNLOAD',
          x: 0,
          y: 0,
          colspan: 1,
          rowspan: 1,
          tab: 0,
          filename: 'folder/document',
          compress: false
        }
      }
    })
    expect(wrapper.element.childElementCount).toBe(2)
    expect(wrapper.find('label').text()).toBe('download')
    expect(wrapper.find('.v-field_abstract > span').text()).toBe('example.txt')
    expect(wrapper.find('.v-field_abstract > button').text()).toBe('Enregistrer sous...')
    wrapper.find('.v-field_abstract > button').trigger('click')
    expect(transport.getFileContent).toHaveBeenCalledTimes(1)
    expect(transport.getFileContent).lastCalledWith('folder/document')
    await nextTick()
    expect(utils.openBlob).toHaveBeenCalledTimes(1)
    expect(utils.openBlob).lastCalledWith(new Blob(), 'example.txt')
    expect(last_content.size).toBe(569)
  })

  it('compress - uncompress', async () => {
    const initial_text = window.atob(image_normal.replaceAll('\n', ''))
    const zip = new JSZip()
    zip.file('exemple', initial_text)
    const blob_compress = new Blob(convertToBytes(await zip.generateAsync({ type: 'string' })))

    var uncompress_text = ''
    const zipFileLoaded = new JSZip()
    const unzip_blob = await zipFileLoaded.loadAsync(blob_compress)
    unzip_blob.forEach(async function (relativePath, zipEntry) {
      uncompress_text = await zipEntry.async('string')
      console.log('relativePath', relativePath)
      expect(uncompress_text).toBe(initial_text)
    })
  })

  it('compress', async () => {
    var zip = new JSZip()
    zip.file('test', window.atob(image_normal.replaceAll('\n', '')))
    download_content = new Blob(convertToBytes(await zip.generateAsync({ type: 'string' })))

    const wrapper = mount(DownloadComp, {
      global: {
        plugins: [vuetify, i18n]
      },
      propsData: {
        value: 'example_compress.txt',
        component: {
          name: 'aaa',
          description: 'download',
          component: 'DOWNLOAD',
          x: 0,
          y: 0,
          colspan: 1,
          rowspan: 1,
          tab: 0,
          filename: 'folder/document',
          compress: true,
          compresstype: 'string'
        }
      }
    })
    call_back_check = function (lastblob, filename) {
      expect(utils.openBlob).toHaveBeenCalledTimes(1)
      expect(utils.openBlob).lastCalledWith(new Blob(), 'example_compress.txt')
      expect(lastblob.size).toBe(569)
      console.log('call_back_check', lastblob, filename)
    }

    expect(wrapper.element.childElementCount).toBe(2)
    expect(wrapper.find('label').text()).toBe('download')
    expect(wrapper.find('.v-field_abstract > span').text()).toBe('example_compress.txt')
    expect(wrapper.find('.v-field_abstract > button').text()).toBe('Enregistrer sous...')
    await wrapper.find('.v-field_abstract > button').trigger('click')
    expect(transport.getFileContent).toHaveBeenCalledTimes(1)
    expect(transport.getFileContent).lastCalledWith('folder/document')
    await nextTick()
  })
})
