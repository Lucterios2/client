<script setup>
import { getFileNameWithoutForgottenChar, openBlob } from '@/tools/utils'

const props = defineProps({
  context: Object,
  close: Object,
  print: Object, // {title: String, extension: String, content: String}
  data: Object, // {message: String, type: Number}
  meta: Object // {extension: String, title: String, action: String, observer: String}
})
const emit = defineEmits(['close'])

function saveFile(aContent, aFileName) {
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

const filename = getFileNameWithoutForgottenChar(props.print.title) + props.print.extension
saveFile(props.print.content, filename)

emit('close')
</script>

<template>
  <div />
</template>

<style scoped></style>
