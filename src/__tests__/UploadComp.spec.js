import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { vuetify } from '@/plugins/vuetify'
import i18n from '@/libs/i18n.js'

import UploadComp from '@/components/UploadComp.vue'
import { image_normal, image_compress, logo_normal } from '@/__tests__/tools'
import { convertToBytes } from '@/libs/utils'
import { nextTick } from 'vue'

const test_example_blob = new Blob(convertToBytes(window.atob(image_normal)))
test_example_blob.name = 'example.txt'

const test_example_blobzipped = new Blob(convertToBytes(window.atob(image_compress)))

beforeEach(() => {
  console.warn = vi.fn()
})

describe('UploadComp', () => {
  it('no compress - no http', async () => {
    const wrapper = mount(UploadComp, {
      global: {
        plugins: [vuetify, i18n]
      },
      propsData: {
        value: '',
        component: {
          name: 'val1',
          component: 'UPLOAD',
          description: 'upload',
          x: 0,
          y: 0,
          colspan: 1,
          rowspan: 1,
          tab: 0,
          filter: ['.jpg', '.png', '.gif'],
          withcam: true,
          maxsize: 16777216,
          compress: false,
          httpFile: false
        }
      }
    })
    expect(wrapper.element.childElementCount).toBe(3)
    expect(
      wrapper.find('.v-input__control > .v-field > .v-field__field > input').element.value
    ).toBe('')
    expect(wrapper.find('.v-input__control > .v-field > .v-field__field > label').text()).toBe(
      'upload'
    )
    expect(wrapper.vm.is_valid()).toBe(true)
    wrapper.vm.selectedFile = test_example_blob
    await wrapper.vm.getFileContentBase64()
    expect(wrapper.vm.is_valid()).toBe(true)
    expect(wrapper.vm.getValue()).toBe('data:application/octet-stream;base64,' + image_normal)
    const params = {}
    wrapper.vm.add_parameters(params)
    expect(Object.keys(params)).toStrictEqual(['val1'])
  })

  it('no compress - http', async () => {
    const wrapper = mount(UploadComp, {
      global: {
        plugins: [vuetify, i18n]
      },
      propsData: {
        value: '',
        component: {
          name: 'val1',
          component: 'UPLOAD',
          x: 0,
          y: 0,
          colspan: 1,
          rowspan: 1,
          tab: 0,
          filter: ['.jpg', '.png', '.gif'],
          withcam: true,
          maxsize: 16777216,
          compress: false,
          httpFile: true
        }
      }
    })
    expect(wrapper.element.childElementCount).toBe(3)
    expect(
      wrapper.find('.v-input__control > .v-field > .v-field__field > input').element.value
    ).toBe('')
    expect(wrapper.find('.v-input__control > .v-field > .v-field__field > label').text()).toBe('')
    expect(wrapper.vm.is_valid()).toBe(true)
    wrapper.vm.selectedFile = test_example_blob
    await wrapper.vm.getFileContentBase64()
    expect(wrapper.vm.is_valid()).toBe(true)
    expect(wrapper.vm.getValue()).toBe(test_example_blob)
    const params = {}
    wrapper.vm.add_parameters(params)
    expect(Object.keys(params)).toStrictEqual(['val1'])
  })

  it('compress - no http', async () => {
    const wrapper = mount(UploadComp, {
      global: {
        plugins: [vuetify, i18n]
      },
      propsData: {
        value: '',
        component: {
          name: 'val1',
          component: 'UPLOAD',
          description: 'upload',
          x: 0,
          y: 0,
          colspan: 1,
          rowspan: 1,
          tab: 0,
          filter: ['.jpg', '.png', '.gif'],
          withcam: false,
          maxsize: 16777216,
          compress: true,
          httpFile: false
        }
      }
    })
    expect(wrapper.element.childElementCount).toBe(2)
    expect(
      wrapper.find('.v-input__control > .v-field > .v-field__field > input').element.value
    ).toBe('')
    expect(wrapper.find('.v-input__control > .v-field > .v-field__field > label').text()).toBe(
      'upload'
    )
    expect(wrapper.vm.is_valid()).toBe(true)
    wrapper.vm.selectedFile = test_example_blob
    await wrapper.vm.getFileContentBase64()
    expect(wrapper.vm.is_valid()).toBe(true)
    expect(wrapper.vm.getValue().substring(0, 31)).toBe('data:application/zip;base64,UEs')
    const params = {}
    wrapper.vm.add_parameters(params)
    expect(Object.keys(params)).toStrictEqual(['val1', 'val1_FILENAME'])
    expect(params.val1_FILENAME).toBe('example.txt')
  })

  it('compress - http', async () => {
    const wrapper = mount(UploadComp, {
      global: {
        plugins: [vuetify, i18n]
      },
      propsData: {
        value: '',
        component: {
          name: 'val1',
          component: 'UPLOAD',
          x: 0,
          y: 0,
          colspan: 1,
          rowspan: 1,
          tab: 0,
          filter: ['.jpg', '.png', '.gif'],
          withcam: false,
          maxsize: 16777216,
          compress: true,
          httpFile: true
        }
      }
    })
    expect(wrapper.element.childElementCount).toBe(2)
    expect(
      wrapper.find('.v-input__control > .v-field > .v-field__field > input').element.value
    ).toBe('')
    expect(wrapper.find('.v-input__control > .v-field > .v-field__field > label').text()).toBe('')
    expect(wrapper.vm.is_valid()).toBe(true)
    wrapper.vm.selectedFile = test_example_blob
    await wrapper.vm.load_miniature()
    await wrapper.vm.getFileContentBase64()
    expect(wrapper.vm.is_valid()).toBe(true)
    expect(wrapper.vm.getValue()).toStrictEqual(test_example_blobzipped)
    const params = {}
    wrapper.vm.add_parameters(params)
    expect(Object.keys(params)).toStrictEqual(['val1', 'val1_FILENAME'])
    expect(params.val1_FILENAME).toBe('example.txt')
    await nextTick()
    expect(wrapper.find('.v-col-2').attributes().style).toBe('display: none;')
  })

  it('image too long', async () => {
    const wrapper = mount(UploadComp, {
      global: {
        plugins: [vuetify, i18n]
      },
      propsData: {
        value: '',
        component: {
          name: 'val1',
          component: 'UPLOAD',
          x: 0,
          y: 0,
          colspan: 1,
          rowspan: 1,
          tab: 0,
          filter: ['.jpg', '.png', '.gif'],
          withcam: false,
          maxsize: 2048,
          compress: false,
          httpFile: true
        }
      }
    })
    expect(wrapper.element.childElementCount).toBe(2)
    expect(
      wrapper.find('.v-input__control > .v-field > .v-field__field > input').element.value
    ).toBe('')
    expect(wrapper.find('.v-input__control > .v-field > .v-field__field > label').text()).toBe('')
    expect(wrapper.vm.is_valid()).toBe(true)
    const favicon_blob = new Blob(convertToBytes(window.atob(logo_normal.replaceAll('\n', ''))), {
      type: 'image/ico'
    })
    favicon_blob.name = 'favicon.ico'
    wrapper.vm.selectedFile = favicon_blob
    await wrapper.vm.load_miniature()
    await wrapper.vm.getFileContentBase64()
    expect(wrapper.vm.is_valid()).toBe('Impossible: le fichier doit faire moins de 2.0 ko')
    await nextTick()
    expect(wrapper.find('.v-col-2').attributes().style).toBe('')
  })

  it('webcam', async () => {
    const wrapper = mount(UploadComp, {
      global: {
        plugins: [vuetify, i18n]
      },
      propsData: {
        value: '',
        component: {
          name: 'val1',
          component: 'UPLOAD',
          x: 0,
          y: 0,
          colspan: 1,
          rowspan: 1,
          tab: 0,
          filter: ['.jpg', '.png', '.gif'],
          withcam: true,
          maxsize: 2048,
          compress: false,
          httpFile: true
        }
      }
    })
    expect(wrapper.element.childElementCount).toBe(3)
    expect(
      wrapper.find('.v-input__control > .v-field > .v-field__field > input').element.value
    ).toBe('')
    expect(wrapper.find('.v-input__control > .v-field > .v-field__field > label').text()).toBe('')
    expect(wrapper.vm.is_valid()).toBe(true)
    //expect(wrapper.html()).toBe(true)
    expect(wrapper.findAll('.v-col-2')[0].attributes().style).toBe('display: none;')
    expect(
      wrapper.findAll('.v-col-2')[1].find('button > .v-btn__content > i').attributes().class
    ).toBe('mdi-camera mdi v-icon notranslate v-theme--light v-icon--size-default')
  })
})
