<script>
export default {
  mounted() {
    document.title = this.$store.state.server.title + ' - ' + this.$store.state.server.sub_title
  }
}
</script>
<script setup>
import StatusBar from './components/StatusBar.vue'
import WaitingFrame from './components/WaitingFrame.vue'
import LoginBox from './components/LoginBox.vue'
import MainMenu from './components/MainMenu.vue'
</script>

<template>
  <v-app>
    <StatusBar v-if="$store.state.show_status" />
    <WaitingFrame v-if="$store.state.show_waiting" />
    <LoginBox v-if="$store.state.show_login" />
    <MainMenu />
  </v-app>
</template>

<style scoped></style>
