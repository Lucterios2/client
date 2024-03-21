<script>
import AbstractObserver from '@/observers/AbstractObserver.vue'
import FrameDlg from '@/libs/FrameDlg.vue'
import { convertLuctoriosFormatToHtml } from '@/libs/convert'
export default {
  name: 'AcknowledgeReturn',
  extends: AbstractObserver,
  components: { FrameDlg },
  data: () => ({
    visible: true
  }),
  computed: {
    icon() {
      this.forceRecompute
      /*
      XFER_DBOX_INFORMATION = 1
      XFER_DBOX_CONFIRMATION = 2
      XFER_DBOX_WARNING = 3
      XFER_DBOX_ERROR = 4
      */
      if (this.data.type == 2) {
        return 'mdi:mdi-help-circle-outline'
      } else if (this.data.type == 3) {
        return 'mdi:mdi-alert'
      } else if (this.data.type == 4) {
        return 'mdi:mdi-alert-circle'
      }
      return 'mdi:mdi-information-outline'
    },
    message() {
      this.forceRecompute
      return convertLuctoriosFormatToHtml(this.data.message)
    }
  }
}
</script>

<template>
  <FrameDlg
    :meta="meta"
    :actions="actions"
    :close="close"
    :key="forceRecompute"
    @action="click_action"
    @close="$emit('close')"
  >
    <v-row>
      <v-col cols="2">
        <v-icon size="40">{{ icon }}</v-icon>
      </v-col>
      <v-col cols="10">
        <span v-html="message"></span>
      </v-col>
    </v-row>
  </FrameDlg>
</template>

<style scoped>
.v-card-text > .v-row > .v-col-10 > span {
  position: relative;
  top: 10px;
  margin-left: 15px;
}
</style>
