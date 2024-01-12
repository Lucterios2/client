<script setup>
const color = "#888"
const items = [
        { title: 'Logoff', action: logoff },
        { title: 'Refresh' ,action: refresh },
        { title: 'About ...' ,action: about},
        { title: 'Help',action: help },
      ]
</script>
<script>
function logoff() {
  alert("logoff")
}
function refresh() {
  alert("refresh")
}
function about() {
  alert("about")
}
function help() {
  alert("help")
}
</script>

<template>
  <v-app-bar
    :color="color"
    density="compact"
  >
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click="$store.dispatch('toggle_summary')"></v-app-bar-nav-icon>
      <v-img :src="$store.state.server.logo_iconname" alt="Logo" height="32px" width="32px"></v-img>
    </template>

    
    <v-app-bar-title>{{ $store.state.server.login }}@{{ $store.state.server.instance_name }}</v-app-bar-title>

    <template v-slot:append>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, i) in items" :key="i">
            <v-list-item-title @click="item.action">{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-app-bar>
</template>

<style scoped>
</style>