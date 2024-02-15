<script>
import AbstractObserver from '@/observers/AbstractObserver.vue'
import ButtonsBar from '@/libs/ButtonsBar.vue'
import { convertLuctoriosFormatToHtml, send_to_support, part_for_email } from '@/libs/utils'
const FAILURE = 0
const CRITIC = 1
const GRAVE = 2
const IMPORTANT = 3
const MINOR = 4
export default {
  name: 'ExceptionBox',
  extends: AbstractObserver,
  components: { ButtonsBar },
  props: {
    exception: Object
  },
  data: () => ({
    tab: null,
    visible: true,
    more: false
  }),
  computed: {
    action_list() {
      const actions = Array()
      if (
        this.exception.code === FAILURE ||
        this.exception.code === CRITIC ||
        this.exception.code === GRAVE
      ) {
        actions.push({ text: this.$t('support'), id: 'send', icon: 'mdi:mdi-mail', close: '1' })
      }
      actions.push({ text: this.$t('close'), id: '', icon: 'mdi:mdi-close', close: '0' })
      return actions
    },
    except_icon() {
      switch (this.exception.code) {
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
    },
    except_title() {
      switch (this.exception.code) {
        case FAILURE:
          return this.$t('Failure')
        case CRITIC:
          return this.$t('Error')
        case GRAVE:
        case IMPORTANT:
          return this.$t('Warning')
        case MINOR:
          return this.$t('Information')
        default:
          return this.$t('Error')
      }
    },
    callstack() {
      var stackText = ''
      const stackTexts = this.exception.debug.replaceAll('{[br/]}', '{[br]}').split('{[br]}')
      for (var sIdx = 0; sIdx < stackTexts.length; sIdx++) {
        stackText += stackTexts[sIdx]
        stackText += '\n'
      }
      return stackText.trim()
    },
    response_ex() {
      try {
        const value = JSON.parse(this.exception.response)
        return JSON.stringify(value, null, 4)
      } catch (e) {
        return this.exception.response
      }
    },
    showAdavanced() {
      return (
        this.exception.code === FAILURE ||
        this.exception.code === CRITIC ||
        this.exception.code === GRAVE
      )
    },
    message() {
      return convertLuctoriosFormatToHtml(this.exception.message)
    }
  },
  methods: {
    toggle_more() {
      this.more = !this.more
    },
    action_click(action) {
      if (action.id === 'send') {
        var complement = '\n### ' + convertLuctoriosFormatToHtml(this.exception.message) + ' ###\n'
        complement += part_for_email(this.$t('Call-stack'), this.exception.debug)
        complement += part_for_email(this.$t('Extra'), this.exception.type)
        complement += part_for_email(this.$t('Request'), this.exception.request)
        complement += part_for_email(this.$t('Response'), this.exception.response)
        send_to_support(this.$t, this.$store, complement)
      }
    }
  }
}
</script>

<template>
  <v-dialog v-model="visible" activator="parent" persistent min-width="250px" max-width="600px">
    <v-card>
      <v-card-title class="bg-grey-darken-1"> {{ except_title }} </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="2">
            <v-icon size="40">{{ except_icon }}</v-icon>
          </v-col>
          <v-col cols="max">
            <span v-html="message"></span>
          </v-col>
          <v-col cols="2" v-if="showAdavanced">
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
      <ButtonsBar :actions="action_list" @actionclick="action_click" @close="$emit('close')" />
    </v-card>
  </v-dialog>
</template>

<style scoped>
pre {
  font-size: 9px;
  line-height: 11px;
}
</style>
