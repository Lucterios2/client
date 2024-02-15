<script setup>
import { createCompnent } from '@/libs/observer'
import * as Vue from 'vue'
import { first_element_by_class } from '@/libs/utils'
import { factory_components } from '@/components/tools'
const props = defineProps({
  data: Object,
  comp: Array,
  meta: Object
})
const emit = defineEmits(['action', 'close'])
const root = Vue.ref('root')
const tab = defineModel('tab')
const tablist = defineModel('tablist', { type: Array, default: [] })

function add_table(current_table, component_list) {
  current_table.innerHTML = ''
  var current_x = 0
  var current_y = 0
  var current_tr = document.createElement('tr')
  for (var comp_idx = 0; comp_idx < component_list.length; comp_idx++) {
    const comp_item = component_list[comp_idx]
    const comp_next = comp_idx < component_list.length - 1 ? component_list[comp_idx + 1] : null
    for (var rowadded = current_y; rowadded < comp_item.y; rowadded++) {
      current_table.appendChild(document.createElement('tr'))
    }
    if (comp_item.x - current_x > 0) {
      const empty_cell = document.createElement('td')
      empty_cell.setAttribute('colspan', comp_item.x - current_x)
      empty_cell.setAttribute('class', 'customcell')
      current_tr.appendChild(empty_cell)
    }
    const current_td = document.createElement('td')
    current_td.setAttribute('rowspan', comp_item.rowspan)
    current_td.setAttribute('colspan', comp_item.colspan)
    current_td.setAttribute('class', 'customcell')
    if (comp_item.rowspan > 1) {
      for (var sub_comp_idx = comp_idx + 1; sub_comp_idx < component_list.length; sub_comp_idx++) {
        const sub_comp_item = component_list[sub_comp_idx]
        if (
          sub_comp_item.x > comp_item.x &&
          sub_comp_item.y > comp_item.y &&
          sub_comp_item.y <= comp_item.y + comp_item.rowspan - 1
        ) {
          sub_comp_item.x = sub_comp_item.x - comp_item.colspan
        }
      }
    }
    const emits = {
      action: (action) => {
        emit('action', action)
      },
      close: () => {
        emit('close')
      }
    }
    createCompnent(
      current_td,
      factory_components(comp_item.component),
      {
        value: props.data[comp_item.name],
        component: comp_item,
        meta: props.meta
      },
      [],
      emits
    )
    current_tr.appendChild(current_td)
    if (comp_next == null || comp_next.y != comp_item.y) {
      current_table.appendChild(current_tr)
      current_tr = document.createElement('tr')
      current_x = 0
      current_y = comp_item.y + 1
    } else {
      current_x = comp_item.x + comp_item.colspan
      current_y = comp_item.y
    }
  }
}

function refresh() {
  add_table(
    first_element_by_class(root.value, 'root-row'),
    props.comp.filter((item) => item.tab == 0)
  )
  tablist.value.forEach((tab) => {
    const subtable = first_element_by_class(root.value, tab.name + '__row')
    if (subtable) {
      add_table(
        subtable,
        props.comp.filter((item) => item.tab == tab.tab && item.component != 'TAB')
      )
    }
  })
}
Vue.onMounted(() => {
  refresh()
})
Vue.onUpdated(() => {
  refresh()
})
tablist.value = props.comp.filter((item) => item.component == 'TAB')
</script>

<template>
  <div ref="root">
    <table class="root-row" width="100%"></table>
    <div class="tabroot" v-if="tablist.length > 0">
      <v-tabs v-model="tab" bg-color="#888" color="#000">
        <v-tab v-for="tab in tablist" :value="tab.name" :key="tab.tab" class="tabheader">{{
          data[tab.name]
        }}</v-tab>
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item v-for="tab in tablist" :value="tab.name" :key="tab.tab" class="tabcontent">
          <table :class="tab.name + '__row'" width="100%"></table>
        </v-window-item>
      </v-window>
    </div>
  </div>
</template>

<style>
.tabroot {
  border: 1px solid #888;
}
.tabheader {
  border: 1px solid #888;
}
.tabcontent {
  padding: 4px;
}

.customcell {
  padding: 1px 3px;
}
</style>
