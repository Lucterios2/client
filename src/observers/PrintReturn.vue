<script>
import AbstractObserver from '@/observers/AbstractObserver.vue'
import { getFileNameWithoutForgottenChar, openBlob } from '@/libs/utils'

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
      const sliceSize = 512
      const byteCharacters = window.atob(aContent)
      var byteNumbers
      var slice
      const byteArrays = new [].constructor()
      for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        slice = byteCharacters.slice(offset, offset + sliceSize)
        byteNumbers = new [].constructor(slice.length)
        for (var idx = 0; idx < slice.length; idx++) {
          byteNumbers[idx] = slice.charCodeAt(idx)
        }
        byteArrays.push(new Uint8Array(byteNumbers))
      }
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
