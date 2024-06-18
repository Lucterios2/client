<script>
import JSZip from 'jszip'
import AbstractComp from '@/components/AbstractComp.vue'
import { getFileContent } from '@/libs/transport'
import { openBlob } from '@/libs/utils'
import { convertToBytes } from '@/libs/convert'
export default {
  name: 'DownloadComp',
  extends: AbstractComp,
  components: { AbstractComp },
  methods: {
    async openFile() {
      const file_returned = await getFileContent(this.component.filename)
      if (this.component.compress && file_returned.size !== 0) {
        const zipFileLoaded = new JSZip()
        const self = this
        await zipFileLoaded.loadAsync(file_returned.data).then(function (zip) {
          zip.forEach(async function (relativePath, zipEntry) {
            await zipEntry.async('base64').then(function (fileData) {
              openBlob(new Blob(convertToBytes(window.atob(fileData))), self.value)
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
    <v-btn
      prepend-icon="mdi:mdi-content-save"
      ref="tofocus"
      :name="component.name"
      @focusin="savefocusin"
      @click="openFile"
      >{{ $t('Save as...') }}</v-btn
    >
  </AbstractComp>
</template>

<style scoped></style>
