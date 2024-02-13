<script setup>
import { createCompnent } from '@/libs/observer'
import * as Vue from 'vue'
import { VCol, VRow } from 'vuetify/lib/components/index.mjs'
import LabelForm from './LabelForm.vue'
import LinkLabel from './LinkLabel.vue'
import ImageComp from './ImageComp.vue'
import { Stringformat } from '@/libs/utils'
const props = defineProps({
  data: Object,
  comp: Array
})
defineEmits(['action'])
const row = Vue.ref(null)
function create_row_components(root_row, component_list, max_cols) {
  const el = document.createElement('div')
  const cols_list = Array()
  const classname = component_list.length > 1 || component_list[0][1] ? 'line' : ' empty'
  for (var comp_idx = 0; comp_idx < component_list.length; comp_idx++) {
    const cols_value = Math.round((component_list[comp_idx][0] * 12.0) / max_cols)
    cols_list.push(
      createCompnent(
        null,
        VCol,
        {
          class: classname + Stringformat(' col-{0}', [cols_value]),
          cols: cols_value
        },
        [component_list[comp_idx][1]]
      )
    )
  }
  createCompnent(el, VRow, {}, cols_list)
  root_row.innerHTML += el.innerHTML
}

function factory_components(comp_item) {
  var current_comp
  switch (comp_item.component) {
    case 'LABELFORM':
      current_comp = LabelForm
      break
    case 'LINK':
      current_comp = LinkLabel
      break
    case 'IMAGE':
      current_comp = ImageComp
      break
    default:
      current_comp = 'span'
  }
  return current_comp
}

var root_row = null
function refresh() {
  root_row.innerHTML = ''
  Vue.render(null, row.value)
  const list_line = Array()
  var current_x = 0
  var current_y = 0
  var max_cols = 0
  props.comp.forEach((comp_item) => {
    max_cols = Math.max(max_cols, comp_item.x + comp_item.colspan)
  })
  max_cols = Math.min(max_cols, 12)
  console.log('max_cols', max_cols)
  for (var comp_idx = 0; comp_idx < props.comp.length; comp_idx++) {
    const comp_item = props.comp[comp_idx]
    const comp_next = comp_idx < props.comp.length - 1 ? props.comp[comp_idx + 1] : null
    const new_comp = createCompnent(null, factory_components(comp_item), {
      value: props.data[comp_item.name],
      component: comp_item
    })
    for (var rowadded = current_y; rowadded < comp_item.y; rowadded++) {
      create_row_components(root_row, [[1, '']], max_cols)
    }
    if (comp_item.x - current_x > 0) {
      list_line.push([comp_item.x - current_x, ''])
    }
    const new_colspan = Math.min(12 - comp_item.x, comp_item.colspan)
    list_line.push([new_colspan, new_comp])
    if (comp_next == null || comp_next.y != comp_item.y || comp_item.x + new_colspan == 12) {
      create_row_components(root_row, list_line, max_cols)
      list_line.splice(0, list_line.length)
      current_x = 0
      current_y++
    } else {
      current_x = comp_item.x + new_colspan
    }
  }
  if (list_line.length > 0) {
    console.log('----- ERROR ------', list_line)
  }
}
Vue.onMounted(() => {
  Array.from(row.value.getElementsByClassName('root-row')).forEach((item) => {
    root_row = item
  })
  refresh()
})
Vue.onUpdated(() => {
  refresh()
})
</script>

<template>
  <div ref="row">
    <div class="root-row"></div>
  </div>
</template>

<style>
.v-col.line {
  padding: 3px 12px;
}
.v-col.empty {
  padding: 0px 12px;
}
</style>
