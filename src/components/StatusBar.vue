<script setup>
const color = '#888'
const items = [
  { title: 'Refresh', action: refresh, icon: 'mdi:mdi-refresh' },
  { title: 'Help', action: help, icon: 'mdi:mdi-help' },
  { title: 'About ...', action: about, icon: 'mdi:mdi-information-variant' },
  { title: 'Logoff', action: logoff, icon: 'mdi:mdi-logout' }
]
</script>
<script>
function logoff() {
  alert('logoff')
}
function refresh() {
  alert('refresh')
}
function about() {
  alert('about')
}
function help() {
  alert('help')
}
</script>

<template>
  <v-app-bar :color="color" density="compact">
    <div class="v-toolbar__prepend">
      <v-app-bar-nav-icon @click="$store.dispatch('toggle_summary')"></v-app-bar-nav-icon>
      <v-img
        id="logo"
        :src="$store.state.server.logo_iconname"
        alt="Logo"
        height="32px"
        width="32px"
      ></v-img>
    </div>

    <v-app-bar-title
      >{{ $store.state.server.login }}@{{ $store.state.server.instance_name }}</v-app-bar-title
    >

    <div class="v-toolbar__append">
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, i) in items" :key="i">
            <v-list-item-title @click="item.action">
              <v-icon :icon="item.icon"></v-icon>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </v-app-bar>
</template>

<style scoped></style>
