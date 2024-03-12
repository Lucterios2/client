<script>
export default {
  mounted() {
    document.title = this.$store.state.server.title + ' - ' + this.$store.state.server.sub_title
  }
}
</script>
<script setup>
import { callLucteriosAction, initialTransport } from '@/libs/transport.js'
import { clearComponent, initialObserver, factory } from '@/libs/observer'
import StatusBar from '@/libs/StatusBar.vue'
import WaitingFrame from '@/libs/WaitingFrame.vue'
import AboutFrame from '@/libs/AboutFrame.vue'
import { FORMTYPE_REFRESH } from '@/libs/utils'
const show_about = defineModel('show_about', { type: Boolean, default: false })

initialObserver()
initialTransport()

function logoff() {
  clearComponent()
  var refreshIntervalId = setInterval(() => {
    click_action({ id: 'CORE/exitConnection' }, null)
    clearInterval(refreshIntervalId)
  }, 100)
}
function login() {
  clearComponent()
  var refreshIntervalId = setInterval(() => {
    click_action({ id: 'CORE/authentification', method: 'POST' }, null)
    clearInterval(refreshIntervalId)
  }, 100)
}

function refresh() {
  clearComponent()
  click_action(
    {
      id: 'CORE/authentification',
      method: 'POST',
      params: { info: true }
    },
    null
  )
}
function help() {
  var win = window.open('Docs', '_blank')
  win.focus()
}
async function click_action(action, source) {
  const result = await callLucteriosAction(action)
  await factory(result, click_action, source, Number(action.modal) == FORMTYPE_REFRESH)
}

click_action({ id: 'CORE/authentification', method: 'POST' }, null)
</script>

<template>
  <v-app>
    <v-row align="start">
      <StatusBar
        v-if="$store.state.show_status"
        @login="login"
        @logoff="logoff"
        @refresh="refresh"
        @help="help"
        @about="show_about = true"
      />
    </v-row>
    <AboutFrame v-if="show_about" @close="show_about = false" />
    <WaitingFrame v-if="$store.state.show_waiting" />
    <div id="comp"></div>
  </v-app>
</template>

<style scoped>
.v-application {
  background: none;
}
</style>
