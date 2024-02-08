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
import StatusBar from '@/components/StatusBar.vue'
import LoginBox from '@/components/LoginBox.vue'
import MainMenu from '@/components/MainMenu.vue'
import WaitingFrame from '@/components/WaitingFrame.vue'
import AboutFrame from '@/components/AboutFrame.vue'
import DialogBox from '@/components/DialogBox.vue'
import ExceptionBox from '@/components/ExceptionBox.vue'
import { clearComponent, mountComponent } from '@/tools/utils.js'
import { call_lucterios_action } from '@/tools/transport.js'
const store = useStore()
const show_about = defineModel('show_about', { type: Boolean, default: false })
const app = getCurrentInstance().appContext.app

function logoff() {
  clearComponent()
  var refreshIntervalId = setInterval(() => {
    click_action({ id: 'CORE/exitConnection' })
    clearInterval(refreshIntervalId)
  }, 100)
}
function refresh() {
  clearComponent()
  click_action({
    id: 'CORE/authentification',
    method: 'POST',
    params: { info: true }
  })
}
function help() {
  var win = window.open('Docs', '_blank')
  win.focus()
}
async function click_action(action) {
  const result = await call_lucterios_action(store, action)
  var current_comp = null
  switch (result.meta.observer) {
    case 'core.auth':
      current_comp = LoginBox
      break
    case 'core.menu':
      clearComponent()
      current_comp = MainMenu
      break
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
  } else {
    console.log('no component', action, result)
  }
}
click_action({ id: 'CORE/authentification' })
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
    <AboutFrame v-if="show_about" @close="show_about = false" :key="show_about" />
    <WaitingFrame v-if="$store.state.show_waiting" />
    <div id="comp"></div>
  </v-app>
</template>

<style scoped></style>
