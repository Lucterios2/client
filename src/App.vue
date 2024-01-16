<script>
export default {
  mounted() {
    document.title = this.$store.state.server.title + ' - ' + this.$store.state.server.sub_title
  }
}
</script>
<script setup>
import { useStore } from 'vuex'
import StatusBar from './components/StatusBar.vue'
import LoginBox from './components/LoginBox.vue'
import MainMenu from './components/MainMenu.vue'
import WaitingFrame from './components/WaitingFrame.vue'
import AboutFrame from './components/AboutFrame.vue'
const store = useStore()
const show_about = defineModel({ type: Boolean, default: false })

function logon(login, password) {
  store.commit('call_status', true)
  store.commit('call_login', false)
  console.log(login + ' - ' + password)
}
function login() {
  store.commit('call_status', false)
  store.commit('call_login', true)
}
function logoff() {
  store.commit('call_status', false)
  store.commit('call_login', true)
}
function refresh() {
  alert('refresh')
}
function help() {
  var win = window.open('Docs', '_blank')
  win.focus()
}
</script>

<template>
  <v-app>
    <StatusBar
      v-if="$store.state.show_status"
      @login="login"
      @logoff="logoff"
      @refresh="refresh"
      @help="help"
      @about="show_about = true"
    />
    <WaitingFrame v-if="$store.state.show_waiting" />
    <LoginBox v-if="$store.state.show_login" @logon="logon" @logoff="logoff" />
    <MainMenu v-if="$store.state.show_menu" />
    <AboutFrame v-if="show_about" @close="show_about = false" :key="show_about" />
  </v-app>
</template>

<style scoped></style>
