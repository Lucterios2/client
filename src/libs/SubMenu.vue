<script setup>
import { convertLuctoriosFormatToHtml } from '@/libs/convert'
import { getUrlServer } from '@/libs/transport'

const emit = defineEmits(['click'])
const prop = defineProps({
  menu: Object
})
function click_action() {
  emit('click', prop.menu)
}
function get_icon_url(menu) {
  return getUrlServer() + menu.icon
}
</script>

<template>
  <div>
    <v-card
      class="mx-auto submenu"
      color="#888"
      cvariant="tonal"
      width="275px"
      height="50px"
      @click="click_action()"
    >
      <v-card-item>
        <v-toolbar color="#888" height="30">
          <v-img
            :src="get_icon_url(menu)"
            height="32"
            width="32"
            style="flex: inherit"
            :alt="menu.text"
            v-if="!menu.short_icon"
          ></v-img>
          <v-icon class="bg-menu" v-if="menu.short_icon">{{ menu.short_icon }}</v-icon>
          <v-toolbar-title class="menutext">{{ menu.text }}</v-toolbar-title>
          <v-tooltip
            :text="convertLuctoriosFormatToHtml(menu.help)"
            activator="parent"
            location="bottom"
          ></v-tooltip>
        </v-toolbar>
      </v-card-item>
    </v-card>
  </div>
</template>

<style scoped>
.submenu {
  border: 1px black solid;
}
.menutext {
  font-size: 12px;
  white-space: normal;
  color: black;
  line-height: 13px;
  margin-left: 3px;
}
.bg-menu {
  background-color: #bebebe;
  color: #000;
}
</style>
