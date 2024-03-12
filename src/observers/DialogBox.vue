<script>
import AbstractObserver from '@/observers/AbstractObserver.vue'
import ButtonsBar from '@/libs/ButtonsBar.vue'
import { convertLuctoriosFormatToHtml } from '@/libs/utils'
export default {
  name: 'AcknowledgeReturn',
  extends: AbstractObserver,
  components: { ButtonsBar },
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
  <v-dialog v-model="visible" activator="parent" persistent min-width="250px" max-width="600px">
    <v-card>
      <v-card-title class="bg-grey-darken-1"> {{ meta.title }} </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="2">
            <v-icon size="40">{{ icon }}</v-icon>
          </v-col>
          <v-col cols="10">
            <span v-html="message"></span>
          </v-col>
        </v-row>
      </v-card-text>
      <ButtonsBar
        :actions="actions"
        :close="close"
        @clickaction="click_action"
        @close="$emit('close')"
      />
    </v-card>
  </v-dialog>
</template>

<style scoped></style>
