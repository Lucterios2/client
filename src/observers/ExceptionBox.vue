<script>
import AbstractObserver from '@/observers/AbstractObserver.vue'
import ButtonsBar from '@/libs/ButtonsBar.vue'
import { convertLuctoriosFormatToHtml, Stringformat } from '@/libs/convert'
import { send_to_support, part_for_email } from '@/libs/utils'
import { getUrlServer } from '@/libs/transport'
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
        Number(this.exception.code) === FAILURE ||
        Number(this.exception.code) === CRITIC ||
        Number(this.exception.code) === GRAVE
      ) {
        actions.push({
          text: this.$t('support'),
          id: 'send',
          short_icon: 'mdi:mdi-mail',
          close: '0'
        })
      }
      actions.push({ text: this.$t('close'), id: '', short_icon: 'mdi:mdi-close', close: '1' })
      return actions
    },
    except_icon() {
      switch (Number(this.exception.code)) {
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
      switch (Number(this.exception.code)) {
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
      const stackTexts = this.exception.debug
        .replaceAll('{[br/]}', '{[br]}')
        .replaceAll('{[br]}', '\n')
        .split('\n')
      for (var sIdx = 0; sIdx < stackTexts.length; sIdx++) {
        const start_url_pos = stackTexts[sIdx].indexOf(getUrlServer())
        if (start_url_pos !== -1) {
          var stack_line_begin = stackTexts[sIdx].substring(0, start_url_pos).trim().split('/')
          stack_line_begin = stack_line_begin[stack_line_begin.length - 1]
          while (stack_line_begin.length < 45) {
            stack_line_begin = stack_line_begin + ' '
          }
          const stack_line_files = stackTexts[sIdx]
            .substring(start_url_pos + getUrlServer().length)
            .split(':')
          const stack_line_filename = stack_line_files[0].split('?')[0].split('/')
          stackText += Stringformat('{0} | {1} [{2}:{3}]', [
            stack_line_begin,
            stack_line_filename[stack_line_filename.length - 1],
            stack_line_files[1],
            stack_line_files[2]
          ])
        } else {
          stackText += stackTexts[sIdx]
        }
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
        Number(this.exception.code) === FAILURE ||
        Number(this.exception.code) === CRITIC ||
        Number(this.exception.code) === GRAVE
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
    execute_click(action) {
      if (action && action.id === 'send') {
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
                <v-tab value="request" v-if="exception.request">{{ $t('Request') }}</v-tab>
                <v-tab value="response" v-if="exception.response">{{ $t('Response') }}</v-tab>
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
      <ButtonsBar
        :actions="action_list"
        @clickaction="execute_click"
        @close="$emit('close', true)"
      />
    </v-card>
  </v-dialog>
</template>

<style scoped>
pre {
  font-size: 9px;
  line-height: 11px;
}
</style>
