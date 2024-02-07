<script setup>
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import ButtonAction from './ButtonAction.vue'
import { convertLuctoriosFormatToHtml } from '@/tools/utils'
const FAILURE = 0
const CRITIC = 1
const GRAVE = 2
const IMPORTANT = 3
const MINOR = 4
const emit = defineEmits(['close'])
const i18n = useI18n()
const props = defineProps({
  context: Object,
  close: Object,
  exception: Object, // {type: String, debug: String, message: String, code: Number, request: String, response: String }
  meta: Object // {extension: String, title: String, action: String, observer: String}
})
const tab = defineModel('tab')
const visible = true
const more = defineModel('more', { type: Boolean, default: false })
function toggle_more() {
  more.value = !more.value
}
const action_list = computed(() => {
  return [{ text: i18n.t('close'), id: '', icon: 'mdi:mdi-close', close: '0' }]
})
function click_close(action) {
  if (Number(action.close) === 0) {
    emit('close')
  }
}

const except_icon = computed(() => {
  switch (props.exception.code) {
    case FAILURE:
      return 'mdi:mdi-alert-circle'
    case CRITIC:
      return 'mdi:mdi-alert-box'
    case GRAVE:
      return 'mdi:mdi-alert'
    case IMPORTANT:
      return 'mdi:mdi-alert-outline'
    case MINOR:
      return 'mdi:mdi-help-circle-outline'
    default:
      return 'mdi:mdi-alert-circle'
  }
})

const except_title = computed(() => {
  switch (props.exception.code) {
    case FAILURE:
      return i18n.t('Failure')
    case CRITIC:
      return i18n.t('Error')
    case GRAVE:
    case IMPORTANT:
      return i18n.t('Warning')
    case MINOR:
      return i18n.t('Information')
    default:
      return i18n.t('Error')
  }
})
const callstack = computed(() => {
  var stackText = ''
  const stackTexts = props.exception.debug.split('{[br/]}')
  for (var sIdx = 0; sIdx < stackTexts.length; sIdx++) {
    stackText += stackTexts[sIdx]
    stackText += '\n'
  }
  return stackText.trim()
})
const response_ex = computed(() => {
  try {
    const value = JSON.parse(props.exception.response)
    return JSON.stringify(value, null, 4)
  } catch (e) {
    return props.exception.response
  }
})
</script>

<template>
  <v-dialog v-model="visible" activator="parent" persistent min-width="250px" max-width="600px">
    <v-card>
      <v-card-title class="bg-grey-lighten-3"> {{ except_title }} </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="2">
            <v-icon size="40">{{ except_icon }}</v-icon>
          </v-col>
          <v-col cols="max">
            <span v-html="convertLuctoriosFormatToHtml(exception.message)"></span>
          </v-col>
          <v-col
            cols="2"
            v-if="
              exception.code === FAILURE || exception.code === CRITIC || exception.code === GRAVE
            "
          >
            <v-btn
              :icon="more ? 'mdi:mdi-chevron-double-left' : 'mdi:mdi-chevron-double-right'"
              @click="toggle_more()"
            ></v-btn>
          </v-col>
          <v-col cols="12" v-if="more">
            <v-card>
              <v-tabs v-model="tab">
                <v-tab value="callstack">{{ $t('Call-stack') }}</v-tab>
                <v-tab value="extra">{{ $t('Extra') }}</v-tab>
                <v-tab
                  value="request"
                  v-if="exception.request !== '' && exception.request !== undefined"
                  >{{ $t('Request') }}</v-tab
                >
                <v-tab
                  value="response"
                  v-if="exception.response !== '' && exception.response !== undefined"
                  >{{ $t('Response') }}</v-tab
                >
              </v-tabs>
              <v-card-text>
                <v-window v-model="tab">
                  <v-window-item value="callstack">
                    <pre class="overflow-auto">{{ callstack }}</pre>
                  </v-window-item>
                  <v-window-item value="extra">
                    <label>{{ exception.type }}</label>
                  </v-window-item>
                  <v-window-item value="request">
                    <pre class="overflow-auto">{{ exception.request }}</pre>
                  </v-window-item>
                  <v-window-item value="response">
                    <pre class="overflow-auto">{{ response_ex }}</pre>
                  </v-window-item>
                </v-window>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="bg-grey-lighten-3">
        <v-spacer></v-spacer>
        <div v-for="action in action_list" :key="action.id">
          <ButtonAction :action="action" @click="click_close(action)" />
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
pre {
  font-size: 9px;
  line-height: 11px;
}
</style>
