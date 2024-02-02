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

function show_summary() {
  if (store.state.show_summary && summary_menu.value.length > 0) {
    return true
  } else {
    return false
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
      <div class="v-col v-col-2-xld v-col-3-ld v-col-4-md v-col-12-xsd" v-if="show_summary()">
        <v-expansion-panels variant="accordion" v-model="summary_selected">
          <v-expansion-panel v-for="submenu in summary_menu" :key="submenu.id" :value="submenu.id">
            <v-expansion-panel-title color="#888">
              <v-icon v-if="submenu.short_icon !== ''">{{ submenu.short_icon }}</v-icon>
              <div v-if="submenu.short_icon === ''">
                <v-img :src="submenu.icon" height="20" :width="20" :alt="submenu.text"></v-img>
              </div>
              <spam style="margin-left: 5px">{{ submenu.text }}</spam>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              {{ submenu.extension }} - {{ submenu.action }}
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
        <div class="support_footer">
          <span v-html="$store.state.server.support_html"></span>
        </div>
      </div>
      <v-col cols="max">
        <v-card>
          <v-tabs v-model="tab" bg-color="#888" color="#000">
            <v-tab v-for="tabmenu in tabs_menus()" :key="tabmenu.id" :value="tabmenu.id"
              ><v-img
                :src="tabmenu.icon"
                height="16"
                width="22"
                :alt="tabmenu.text"
                v-if="tabmenu.short_icon === ''"
              ></v-img
              ><v-icon v-if="tabmenu.short_icon !== ''">{{ tabmenu.short_icon }}</v-icon
              ><span>{{ tabmenu.text }}</span></v-tab
            >
          </v-tabs>
          <v-card-text>
            <v-window v-model="tab">
              <v-window-item v-for="tabmenu in tabs_menus()" :key="tabmenu.id" :value="tabmenu.id">
                <SubMenus
                  :menu="tabmenu"
                  :with_image="false"
                  @clickaction="click_action"
                ></SubMenus>
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
  margin-top: 100px;
  padding: 5px;
  border: 1px black solid;
  border-radius: 10px;
}

@media only screen and (min-width: 1400px) {
  .v-col-2-xld {
    flex: 0 0 16.6666666667%;
    max-width: 16.6666666667%;
  }
}
@media only screen and (min-width: 1000px) and (max-width: 1400px) {
  .v-col-3-ld {
    flex: 0 0 25%;
    max-width: 25%;
  }
}
@media only screen and (min-width: 800px) and (max-width: 1000px) {
  .v-col-4-md {
    flex: 0 0 33.333333%;
    max-width: 33.333333%;
  }
}
@media only screen and (max-width: 800px) {
  .v-col-12-xsd {
    flex: 0 0 100%;
    max-width: 100%;
  }
}
</style>
