<script>
import AbstractObserver from '@/observers/AbstractObserver.vue'
import { getFileNameWithoutForgottenChar, openBlob } from '@/libs/utils'
import { convertToBytes } from '../libs/utils'

export default {
  name: 'PrintReturn',
  extends: AbstractObserver,
  props: {
    print: Object // {title: String, extension: String, content: String}
  },
  data: () => ({
    tab: null,
    visible: true,
    more: false
  }),
  methods: {
    saveFile(aContent, aFileName) {
      const byteArrays = convertToBytes(window.atob(aContent))
      openBlob(new Blob(byteArrays, { type: 'application/x-json' }), aFileName)
    }
  },
  mounted() {
    const filename = getFileNameWithoutForgottenChar(this.print.title) + this.print.extension
    this.saveFile(this.print.content, filename)
    this.$emit('close')
  }
}
</script>

<template>
  <div />
</template>

<style scoped></style>
