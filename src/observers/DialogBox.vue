<script setup>
import { computed } from 'vue'
import ButtonsBar from '@/libs/ButtonsBar.vue'
import { convertLuctoriosFormatToHtml } from '@/libs/utils'
const props = defineProps({
  context: Object,
  actions: Array,
  close: Object,
  data: Object, // {message: String, type: Number}
  meta: Object // {extension: String, title: String, action: String, observer: String}
})
const emit = defineEmits(['clickaction', 'close'])
const visible = true
function click_action(action) {
  if (action.params === undefined) {
    action.params = {}
  }
  action.params = Object.assign({}, action.params, props.context)
  emit('clickaction', action)
}
const icon = computed(() => {
  /*
	XFER_DBOX_INFORMATION = 1
	XFER_DBOX_CONFIRMATION = 2
	XFER_DBOX_WARNING = 3
	XFER_DBOX_ERROR = 4
	*/
  if (props.data.type == 2) {
    return 'mdi:mdi-help-circle-outline'
  } else if (props.data.type == 3) {
    return 'mdi:mdi-alert'
  } else if (props.data.type == 4) {
    return 'mdi:mdi-alert-circle'
  }
  return 'mdi:mdi-information-outline'
})
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
            <span v-html="convertLuctoriosFormatToHtml(data.message)"></span>
          </v-col>
        </v-row>
      </v-card-text>
      <ButtonsBar
        :actions="actions"
        :close="close"
        @clickaction="click_action"
        @close="emit('close')"
      />
    </v-card>
  </v-dialog>
</template>

<style scoped></style>
