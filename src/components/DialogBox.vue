<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import ButtonAction from './ButtonAction.vue'
import { convertLuctoriosFormatToHtml } from '@/tools/utils'
const props = defineProps({
  context: Object,
  actions: Array,
  close: Object,
  data: Object, // {message: String, type: Number}
  meta: Object // {extension: String, title: String, action: String, observer: String}
})
const emit = defineEmits(['clickaction', 'close'])
const i18n = useI18n()
const visible = true
const action_list = computed(() => {
  if (props.actions.length > 0) {
    return props.actions
  } else {
    return [{ text: i18n.t('ok'), id: '', icon: 'mdi:mdi-check', close: '0' }]
  }
})
function merge_action_params(action) {
  if (action.params === undefined) {
    action.params = {}
  }
  action.params = Object.assign({}, action.params, props.context)
}
function click_action(action) {
  merge_action_params(action)
  if (action.id !== '') {
    emit('clickaction', action)
  }
  if (Number(action.close) === 0) {
    if (props.close !== null) {
      merge_action_params(props.close)
      emit('clickaction', props.close)
    }
    emit('close')
  }
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
      <v-card-title class="bg-grey-lighten-3"> {{ meta.title }} </v-card-title>
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
      <v-card-actions class="bg-grey-lighten-3">
        <v-spacer></v-spacer>
        <div v-for="action in action_list" :key="action.id">
          <ButtonAction :action="action" @click="click_action(action)" />
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>
