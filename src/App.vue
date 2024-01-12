<script>
export default {  
  mounted() {  
    document.title = this.$store.state.server.title+ " - " + this.$store.state.server.sub_title
  }
}
</script>
<script setup>
import Status from './components/Status.vue'
import Waiting from './components/Waiting.vue'
import Login from './components/Login.vue'
import Menu from './components/Menu.vue'
</script>

<template>
  <v-app>
    <Status v-if="$store.state.show_status " />
    <Waiting v-if="$store.state.show_waiting" />
    <Login v-if="$store.state.show_login" />
    <Menu />
  </v-app>
</template>

<style scoped>
</style>
