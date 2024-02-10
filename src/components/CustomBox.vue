<script setup>
import { computed } from 'vue'
import ButtonsBar from '@/components/ButtonsBar.vue'
const props = defineProps({
  context: Object,
  actions: Array,
  close: Object,
  data: Object,
  comp: Array,
  meta: Object // {extension: String, title: String, action: String, observer: String}
})
const emit = defineEmits(['clickaction', 'close'])
function click_action(action) {
  if (action.params === undefined) {
    action.params = {}
  }
  action.params = Object.assign({}, action.params, props.context)
  emit('clickaction', action)
}
const custom_style = computed(() => {
  const custom_nb = document.getElementsByClassName('custom').length
  return 'left: %X%; top: %Y%; z-index: %Z'
    .replace('%X', 50 - 2 * custom_nb)
    .replace('%Y', 50 - 2 * custom_nb)
    .replace('%Z', custom_nb)
})
console.log('custom_style', custom_style.value)

function active_current(current) {
  const customs = document.getElementsByClassName('custom')
  Array.from(customs).forEach((custom) => {
    const cust_cards = Array.from(custom.getElementsByClassName('v-card'))
    cust_cards.sort((card1, card2) => {
      return card2.style.zIndex - card1.style.zIndex
    })
    var new_index = 0
    cust_cards.forEach((cust_card) => {
      cust_card.style.zIndex = new_index--
      const cust_card_titles = cust_card.getElementsByClassName('v-card-title')
      Array.from(cust_card_titles).forEach((cust_card_title) => {
        cust_card_title.className = 'v-card-title bg-grey-lighten-1'
      })
    })
  })
  const current_card_titles = current.getElementsByClassName('v-card-title')
  Array.from(current_card_titles).forEach((current_card_title) => {
    console.log('current_card_title', current_card_title)
    current_card_title.className = 'v-card-title bg-grey-darken-1'
  })
  current.style.zIndex = 100
}

const dialog_box = {}
function mouse_down(event) {
  const closestDialog = event.target.closest('.custom .v-card')
  if (
    event.button === 0 &&
    closestDialog != null &&
    event.target.classList.contains('v-card-title')
  ) {
    active_current(closestDialog)
    dialog_box.el = closestDialog // element which should be moved
    dialog_box.mouseStartX = event.clientX
    dialog_box.mouseStartY = event.clientY
    dialog_box.elStartX = dialog_box.el.getBoundingClientRect().left
    dialog_box.elStartY = dialog_box.el.getBoundingClientRect().top
    dialog_box.el.style.zIndex = 100
  }
}
function mouse_up() {
  if (dialog_box.el === undefined) return
  dialog_box.el = undefined
}
function mouse_move(event) {
  if (dialog_box.el === undefined) return
  dialog_box.el.style.left =
    Math.min(
      Math.max(dialog_box.elStartX + event.clientX - dialog_box.mouseStartX, 0),
      window.innerWidth - dialog_box.el.getBoundingClientRect().width
    ) + 'px'
  dialog_box.el.style.top =
    Math.min(
      Math.max(dialog_box.elStartY + event.clientY - dialog_box.mouseStartY, 0),
      window.innerHeight - dialog_box.el.getBoundingClientRect().height
    ) + 'px'
}
</script>

<template>
  <div class="custom" @mousedown="mouse_down" @mouseup="mouse_up" @mousemove="mouse_move">
    <v-card :style="custom_style">
      <v-card-title class="bg-grey-lighten-1"> {{ meta.title }} </v-card-title>
      <v-card-text>
        <v-row> </v-row>
      </v-card-text>
      <ButtonsBar
        :actions="actions"
        :close="close"
        @clickaction="click_action"
        @close="emit('close')"
      />
    </v-card>
  </div>
</template>

<style scoped>
.custom .v-card {
  min-width: 250px;
  max-width: 600px;
  position: fixed;
  margin: 0px;
  transition: none;
}
.custom .v-card .v-card-title {
  cursor: grab;
}

.custom .v-card .v-card-title:active {
  cursor: grabbing;
}
</style>
