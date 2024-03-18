<script>
import JSZip from 'jszip'
import AbstractComp from '@/components/AbstractComp.vue'
import { getFileContent } from '@/libs/transport'
import { convertToBytes, openBlob } from '@/libs/utils'
export default {
  name: 'DownloadComp',
  extends: AbstractComp,
  components: { AbstractComp },
  methods: {
    async openFile() {
      const file_returned = await getFileContent(this.component.filename)
      if (this.component.compress && file_returned.size !== 0) {
        const self = this
        const zipFileLoaded = new JSZip()
        zipFileLoaded.loadAsync(file_returned).then(function (zip) {
          Object.keys(zip.files).forEach(function (filename) {
            zip.files[filename]
              .async(self.component.compresstype || 'string')
              .then(function (fileData) {
                openBlob(new Blob(convertToBytes(fileData)), self.value)
              })
          })
        })
      } else {
        openBlob(file_returned, this.value)
      }
    }
  }
}
</script>

<template>
  <AbstractComp :value="value" :component="component">
    <span> {{ value }} </span>
    <v-btn prepend-icon="mdi:mdi-content-save" @click="openFile">{{ $t('Save as...') }}</v-btn>
  </AbstractComp>
</template>

<style scoped></style>
