<script setup>
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
const store = useStore()
const i18n = useI18n()
const emit = defineEmits(['login', 'logoff', 'refresh', 'help', 'about'])
const items = [
  {
    title: i18n.t('refresh'),
    action: () => {
      emit('refresh')
    },
    icon: 'mdi:mdi-refresh',
    condition: function () {
      return true
    }
  },
  {
    title: i18n.t('help'),
    action: () => {
      emit('help')
    },
    icon: 'mdi:mdi-help',
    condition: function () {
      return true
    }
  },
  {
    title: i18n.t('about'),
    action: () => {
      emit('about')
    },
    icon: 'mdi:mdi-information-variant',
    condition: function () {
      return true
    }
  },
  {
    title: i18n.t('login'),
    action: () => {
      emit('logoff')
    },
    icon: 'mdi:mdi-login',
    condition: function () {
      return store.state.server.mode == 1 && store.state.server.login === ''
    }
  },
  {
    title: i18n.t('logoff'),
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
  <v-app-bar color="#555" density="compact" id="status">
    <div class="v-toolbar__prepend">
      <v-app-bar-nav-icon
        icon="mdi:mdi-information-slab-box-outline"
        :color="$store.state.backcolor"
        @click="$store.dispatch('toggle_summary')"
      ></v-app-bar-nav-icon>
      <v-img
        id="logo"
        :src="$store.state.server.logoname"
        alt="Logo"
        height="32px"
        width="32px"
      ></v-img>
    </div>

    <v-app-bar-title id="statususer" v-if="$store.state.server.login !== ''"
      >{{ $store.state.server.realname }} ({{ $store.state.server.login }}@{{
        $store.state.server.instance
      }})</v-app-bar-title
    >

    <v-btn
      icon
      v-for="(item, index) in get_items()"
      :key="index"
      :value="index"
      @click="item.action"
      :title="item.title"
    >
      <v-tooltip activator="parent" location="bottom">{{ item.title }}</v-tooltip>
      <v-icon :icon="item.icon"></v-icon>
    </v-btn>
  </v-app-bar>
</template>

<style scoped></style>
