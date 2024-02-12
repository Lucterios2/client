<script setup>
import { createCompnent } from '@/libs/observer'
import * as Vue from 'vue'
import { VCol, VRow } from 'vuetify/lib/components/index.mjs'
import LabelForm from './LabelForm.vue'
const props = defineProps({
  data: Object,
  comp: Array
})
defineEmits(['action'])
const row = Vue.ref(null)
function create_row_components(root_row, component_list) {
  const el = document.createElement('div')
  const cols_list = Array()
  var colspan_sum = 0
  component_list.forEach((comp_item) => {
    colspan_sum += comp_item[0]
  })
  const classname = component_list.length > 1 || component_list[0][1] ? 'line' : 'empty'
  for (var comp_idx = 0; comp_idx < component_list.length; comp_idx++) {
    cols_list.push(
      createCompnent(
        null,
        VCol,
        {
          class: classname,
          cols:
            comp_idx == component_list.length - 1
              ? 'max'
              : Math.round((component_list[comp_idx][0] * colspan_sum) / 12.0)
        },
        [component_list[comp_idx][1]]
      )
    )
  }
  createCompnent(el, VRow, {}, cols_list)
  root_row.innerHTML += el.innerHTML
}

Vue.onMounted(() => {
  var root_row = null
  Array.from(row.value.getElementsByClassName('root-row')).forEach((item) => {
    root_row = item
  })
  root_row.innerHTML = ''
  Vue.render(null, row.value)
  const list_line = Array()
  var current_x = 0
  var current_y = 0
  for (var comp_idx = 0; comp_idx < props.comp.length; comp_idx++) {
    const comp_item = props.comp[comp_idx]
    const comp_next = comp_idx < props.comp.length - 1 ? props.comp[comp_idx + 1] : null
    const new_comp = createCompnent(null, LabelForm, {
      value: props.data[comp_item.name],
      component: comp_item
    })
    for (var rowadded = current_y; rowadded < comp_item.y; rowadded++) {
      create_row_components(root_row, [[1, '']])
    }
    const new_colspan = Math.min(12 - current_x, comp_item.colspan)
    list_line.push([new_colspan, new_comp])
    if (comp_next == null || comp_next.y != comp_item.y || current_x + new_colspan == 12) {
      create_row_components(root_row, list_line)
      list_line.splice(0, list_line.length)
      current_x = 0
      current_y++
    } else {
      current_x = current_x + new_colspan
    }
  }
  if (list_line.length > 0) {
    create_row_components(root_row, list_line)
  }
})
</script>

<template>
  <div ref="row">
    <div class="root-row"></div>
  </div>
</template>

<style scoped>
.v-col.v-col-max.line {
  padding: 3px 12px;
}
.v-col.v-col-max.empty {
  padding: 0px 12px;
}
</style>
