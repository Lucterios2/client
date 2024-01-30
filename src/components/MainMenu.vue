<script setup>
import { useStore } from 'vuex'
import SubMenus from './SubMenus.vue'
const emit = defineEmits(['clickaction'])
const store = useStore()
const props = defineProps({
  data: Array
})
const tab = defineModel('tab')
const summary_menu = defineModel('summary_menu', { type: Array, default: [] })
const summary_selected = defineModel('summary_selected', { type: Object, default: null })
function click_action(menu) {
  emit('clickaction', menu)
}

props.data.forEach((item) => {
  if (item.text === '') {
    summary_menu.value = item.menus
    if (item.menus.length > 0) {
      summary_selected.value = item.menus[0].id
    }
  }
})
function nb_cols_tabs() {
  if (store.state.show_summary && summary_menu.value.length > 0) {
    return 10
  } else {
    return 12
  }
}
function tabs_menus() {
  const menus_of_tabs = []
  props.data.forEach((item) => {
    if (item.text !== '') {
      menus_of_tabs.push(item)
    }
  })
  return menus_of_tabs
}
</script>

<template>
  <div class="menu">
    <v-row>
      <v-col cols="2" v-if="nb_cols_tabs() == 10">
        <v-expansion-panels variant="accordion" v-model="summary_selected">
          <v-expansion-panel v-for="submenu in summary_menu" :key="submenu.id" :value="submenu.id">
            <v-expansion-panel-title color="#888">
              <v-img :src="submenu.icon" height="16" width="18" :alt="submenu.text">{{
                submenu.text
              }}</v-img>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              {{ submenu.extension }} - {{ submenu.action }}
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
        <div class="support_footer">
          <span v-html="$store.state.server.support_html"></span>
        </div>
      </v-col>
      <v-col :cols="nb_cols_tabs()">
        <v-card>
          <v-tabs v-model="tab" bg-color="#888" color="#000">
            <v-tab v-for="tabmenu in tabs_menus()" :key="tabmenu.id" :value="tabmenu.id"
              ><v-img :src="tabmenu.icon" height="16" width="22" :alt="tabmenu.text" v-if="tabmenu.short_icon===''"></v-img
              ><v-icon :icon="tabmenu.short_icon" v-if="tabmenu.short_icon!==''"></v-icon>{{ tabmenu.text }}</v-tab
            >
          </v-tabs>
          <v-card-text>
            <v-window v-model="tab">
              <v-window-item v-for="tabmenu in tabs_menus()" :key="tabmenu.id" :value="tabmenu.id">
                <SubMenus :menu="tabmenu" :with_image="false" @clickaction="click_action"></SubMenus>
              </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.menu {
  position: fixed;
  top: 75px;
  width: 98%;
  margin: 0px 1%;
}
.support_footer {
  margin-top:100px;
  padding: 5px;
  border: 1px black solid;
  border-radius: 10px;
}
</style>
