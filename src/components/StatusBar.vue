<script setup>
import { useStore } from 'vuex'
const emit = defineEmits(['login', 'logoff', 'refresh', 'help', 'about'])
const store = useStore()
const color = '#888'
const items = [
  {
    title: 'Refresh',
    action: () => {
      emit('refresh')
    },
    icon: 'mdi:mdi-refresh',
    condition: function () {
      return true
    }
  },
  {
    title: 'Help',
    action: () => {
      emit('help')
    },
    icon: 'mdi:mdi-help',
    condition: function () {
      return true
    }
  },
  {
    title: 'About ...',
    action: () => {
      emit('about')
    },
    icon: 'mdi:mdi-information-variant',
    condition: function () {
      return true
    }
  },
  {
    title: 'Login',
    action: () => {
      emit('login')
    },
    icon: 'mdi:mdi-login',
    condition: function () {
      return store.state.server.mode === 1 && store.state.server.login === ''
    }
  },
  {
    title: 'Logoff',
    action: () => {
      emit('logoff')
    },
    icon: 'mdi:mdi-logout',
    condition: function () {
      return store.state.server.login !== ''
    }
  }
]
function get_items() {
  var new_items = []
  items.forEach((item) => {
    if (item.condition()) {
      new_items.push(item)
    }
  })
  return new_items
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

    <v-app-bar-title v-if="$store.state.server.login !== ''"
      >{{ $store.state.server.login }}@{{ $store.state.server.instance_name }}</v-app-bar-title
    >

    <div class="v-toolbar__append">
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in get_items()" :key="index" :value="index">
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
