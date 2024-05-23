<script>
import AbstractObserver from '@/observers/AbstractObserver.vue'
import FrameDlg from '@/libs/FrameDlg.vue'
import { convertLuctoriosFormatToHtml } from '@/libs/convert'
import { XFER_DBOX_CONFIRMATION, XFER_DBOX_ERROR, XFER_DBOX_WARNING } from '@/libs/utils'
export default {
  name: 'DialogBox',
  extends: AbstractObserver,
  components: { FrameDlg },
  data: () => ({
    visible: true
  }),
  computed: {
    icon() {
      this.forceRecompute
      if (Number(this.data.type) === XFER_DBOX_CONFIRMATION) {
        return 'mdi:mdi-help-circle-outline'
      } else if (Number(this.data.type) === XFER_DBOX_WARNING) {
        return 'mdi:mdi-alert'
      } else if (Number(this.data.type) === XFER_DBOX_ERROR) {
        return 'mdi:mdi-alert-circle'
      }
      return 'mdi:mdi-information-outline'
    },
    message() {
      this.forceRecompute
      return convertLuctoriosFormatToHtml(this.data.text)
    }
  },
  methods: {
    click_dlg_action(action, no_owner) {
      this.$options.FrameInterface.save_dlg()
      this.click_action(action, no_owner)
    },
    updateObserver() {
      this.$forceUpdate()
      this.forceRecompute++
      this.$nextTick(() => {
        this.$options.FrameInterface.load_dlg()
      })
    },
    getFrameInterface(FrameInterface) {
      this.$options.FrameInterface = FrameInterface
    }
  }
}
</script>

<template>
  <FrameDlg
    :id="id"
    :meta="meta"
    :actions="actions"
    :close="close"
    :key="forceRecompute"
    @action="click_dlg_action"
    @close="onClose"
    @interface="getFrameInterface"
  >
    <v-row>
      <v-col cols="2">
        <v-icon size="64">{{ icon }}</v-icon>
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
  font-weight: bold;
}
</style>
