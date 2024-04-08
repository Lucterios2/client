<script setup>
import SubMenu from '@/libs/SubMenu.vue'
import { convertLuctoriosFormatToHtml } from '@/libs/convert'
import { getUrlServer } from '@/libs/transport'
const emit = defineEmits(['clickaction'])
const props = defineProps({
  menu: Object,
  with_image: Boolean
})
const show_help = defineModel({ type: Boolean, default: false })
if (!props.with_image) {
  show_help.value = true
}
function card_class() {
  if (props.with_image) {
    return ''
  } else {
    return 'card_size overflow-y-auto'
  }
}
function get_size(submenu) {
  if (submenu.menus === undefined) {
    return 'auto'
  } else {
    return 12
  }
}
function click_action(menu, no_owner) {
  emit('clickaction', menu, no_owner)
}
function get_icon_url(menu) {
  return getUrlServer() + menu.icon
}
</script>

<template>
  <v-card :class="card_class()">
    <v-card-item>
      <v-toolbar color="#BBB" height="40" dark v-if="with_image">
        <v-img
          :src="get_icon_url(menu)"
          height="32"
          width="50"
          style="flex: inherit"
          :alt="menu.text"
          v-if="!menu.short_icon"
        ></v-img>
        <v-icon></v-icon>
        <v-icon v-if="menu.short_icon">{{ menu.short_icon }}</v-icon>
        <v-toolbar-title>{{ menu.text }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="show_help = !show_help" v-if="menu.help !== undefined">
          <v-icon size="x-small">mdi:mdi-help</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-title>
        <div
          class="show_help"
          v-if="show_help"
          v-html="convertLuctoriosFormatToHtml(menu.help)"
        ></div>
      </v-card-title>
      <v-spacer></v-spacer>
      <v-card-text>
        <v-row>
          <v-col
            v-for="(submenu_item, submenu_index) in menu.menus"
            :key="submenu_index"
            :cols="get_size(submenu_item)"
          >
            <SubMenu
              v-if="submenu_item.menus === undefined"
              :menu="submenu_item"
              @click="click_action"
            ></SubMenu>
            <SubMenus
              v-if="submenu_item.menus !== undefined"
              :menu="submenu_item"
              :with_image="true"
              @clickaction="click_action"
            ></SubMenus>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card-item>
  </v-card>
</template>

<style scoped>
.show_help {
  padding: 3px 5px;
  font-size: 12px;
  line-height: 13px;
  margin-top: 5px;
  background-color: #eee;
  border: 1px solid black;
}
</style>
