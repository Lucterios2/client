<script>
export default {
  mounted() {
    document.title = this.$store.state.server.title + ' - ' + this.$store.state.server.sub_title
  }
}
</script>
<script setup>
import { getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import StatusBar from './components/StatusBar.vue'
import LoginBox from './components/LoginBox.vue'
import MainMenu from './components/MainMenu.vue'
import WaitingFrame from './components/WaitingFrame.vue'
import AboutFrame from './components/AboutFrame.vue'
import DialogBox from './components/DialogBox.vue'
import ExceptionBox from './components/ExceptionBox.vue'
import { example_logon_actions, example_menu_data, example_server_data } from './__tests__/tools.js'
import { mountComponent } from './tools/utils.js'
const store = useStore()
const i18n = useI18n()
const show_about = defineModel('show_about', { type: Boolean, default: false })
const logon_data = defineModel('logon_data', { type: String, default: '' })
const logon_actions = defineModel('logon_actions', { type: Array, default: [] })
const menu_data = defineModel('menu_data', { type: Array, default: [] })
const app = getCurrentInstance().appContext.app

var refreshIntervalId = 0

function login() {
  console.log('login')
  store.commit('call_waiting', false)
  store.commit('call_status', true)
  store.commit('call_menu', true)
  store.commit('call_login', false)
  if (refreshIntervalId !== 0) {
    clearInterval(refreshIntervalId)
    refreshIntervalId = 0
  }
}
function logoff() {
  console.log('logoff')
  store.commit('call_status', false)
  store.commit('call_menu', false)
  store.commit('call_login', true)
}
function logon(username, password) {
  store.commit('call_login', false)
  store.commit('call_waiting', true)
  console.log('logon', username, password)
  refreshIntervalId = setInterval(login, 2 * 1000) // 2 sec
}
function refresh() {
  alert('refresh')
}
function help() {
  var win = window.open('Docs', '_blank')
  win.focus()
}
function click_action(action) {
  const result = action.result
  var current_comp = null
  switch (result.meta.observer) {
    case 'core.exception':
      current_comp = ExceptionBox
      break
    case 'core.dialogbox':
      current_comp = DialogBox
      break
    default:
      current_comp = null
  }
  if (current_comp !== null) {
    mountComponent(
      current_comp,
      result,
      {
        clickaction: click_action
      },
      app
    )
  }
}

store.commit('change_server', example_server_data)
i18n.locale.value = 'fr'
logon_data.value = 'NEEDAUTH'
logon_actions.value = example_logon_actions
menu_data.value = example_menu_data
</script>

<template>
  <v-app>
    <v-row align="start">
      <StatusBar
        v-if="$store.state.show_status"
        @login="logoff"
        @logoff="logoff"
        @refresh="refresh"
        @help="help"
        @about="show_about = true"
      />
    </v-row>
    <v-row align="start">
      <MainMenu v-if="$store.state.show_menu" :data="menu_data" @clickaction="click_action" />
    </v-row>
    <LoginBox
      v-if="$store.state.show_login"
      :data="logon_data"
      :actions="logon_actions"
      @logon="logon"
      @logoff="login"
      @clickaction="click_action"
    />
    <AboutFrame v-if="show_about" @close="show_about = false" :key="show_about" />
    <WaitingFrame v-if="$store.state.show_waiting" />
    <div id="comp"></div>
  </v-app>
</template>

<style scoped></style>
