<script setup>
import { ref, onMounted } from 'vue'
import ButtonsBar from '@/libs/ButtonsBar.vue'
import CustomComponents from '@/components/CustomComponents.vue'
import { first_element_by_class } from '@/libs/utils'
const props = defineProps({
  context: Object,
  actions: Array,
  close: Object,
  data: Object,
  comp: Array,
  meta: Object // {extension: String, title: String, action: String, observer: String}
})
const emit = defineEmits(['clickaction', 'close'])
const custom = ref(null)
function click_action(action) {
  if (action.params === undefined) {
    action.params = {}
  }
  action.params = Object.assign({}, action.params, props.context)
  emit('clickaction', action)
}

function active_current(current) {
  Array.from(document.getElementsByClassName('custom')).forEach((custom) => {
    const cust_cards = Array.from(custom.getElementsByClassName('v-card'))
    cust_cards.sort((card1, card2) => {
      return card2.style.zIndex - card1.style.zIndex
    })
    var new_index = 0
    cust_cards.forEach((cust_card) => {
      cust_card.style.zIndex = new_index--
      first_element_by_class(cust_card, 'v-card-title').className =
        'v-card-title bg-grey-lighten-1' + (props.meta.ismodal ? '' : ' movecursor')
    })
  })
  const current_card = first_element_by_class(current, 'v-card')
  if (current_card) {
    current_card.style.zIndex = 100
    first_element_by_class(current_card, 'v-card-title').className =
      'v-card-title bg-grey-darken-1' + (props.meta.ismodal ? '' : ' movecursor')
  }
}

const dialog_box = { el: null, eltext: null, move: false, allsize: false }
function all_size() {
  if (dialog_box.allsize) {
    dialog_box.allsize = false
    dialog_box.el.style.left = (100.0 * dialog_box.elStartXsize) / window.innerWidth + '%'
    dialog_box.el.style.top = (100.0 * dialog_box.elStartYsize) / window.innerHeight + '%'
    dialog_box.el.style.width = ''
    dialog_box.el.style.height = ''
    dialog_box.eltext.style.width = ''
    dialog_box.eltext.style.height = ''
    first_element_by_class(dialog_box.el, 'v-card-title').className =
      'v-card-title bg-grey-darken-1 movecursor'
  } else {
    dialog_box.allsize = true
    dialog_box.elStartXsize = dialog_box.el.getBoundingClientRect().left
    dialog_box.elStartYsize = dialog_box.el.getBoundingClientRect().top
    dialog_box.eltextStartW = dialog_box.eltext.getBoundingClientRect().width
    dialog_box.eltextStartH = dialog_box.eltext.getBoundingClientRect().height
    dialog_box.el.style.left = '10px'
    dialog_box.el.style.top = '60px'
    dialog_box.el.style.width = 'calc(100% - 20px)'
    dialog_box.el.style.height = 'calc(100% - 90px)'
    dialog_box.eltext.style.width = 'calc(100% - 20px)'
    dialog_box.eltext.style.height = 'calc(100% - 98px)'
    first_element_by_class(dialog_box.el, 'v-card-title').className =
      'v-card-title bg-grey-darken-1'
  }
}
function mouse_down(event) {
  if (event.button === 0 && !dialog_box.allsize && !props.meta.ismodal) {
    dialog_box.move = true
    dialog_box.mouseStartX = event.clientX
    dialog_box.mouseStartY = event.clientY
    dialog_box.elStartX = dialog_box.el.getBoundingClientRect().left
    dialog_box.elStartY = dialog_box.el.getBoundingClientRect().top
    dialog_box.el.style.zIndex = 100
  }
}
function mouse_up() {
  if (dialog_box.move) {
    dialog_box.move = false
  }
}
function mouse_move(event) {
  if (dialog_box.move) {
    const left = Math.min(
      Math.max(dialog_box.elStartX + event.clientX - dialog_box.mouseStartX, 0),
      window.innerWidth - dialog_box.el.getBoundingClientRect().width
    )
    const top = Math.min(
      Math.max(dialog_box.elStartY + event.clientY - dialog_box.mouseStartY, 50),
      window.innerHeight - dialog_box.el.getBoundingClientRect().height
    )
    dialog_box.el.style.left = (100.0 * left) / window.innerWidth + '%'
    dialog_box.el.style.top = (100.0 * top) / window.innerHeight + '%'
  }
}
onMounted(() => {
  Array.from(custom.value.getElementsByClassName('v-card')).forEach((card) => {
    dialog_box.el = card
    Array.from(dialog_box.el.getElementsByClassName('v-card-text')).forEach((cardtext) => {
      dialog_box.eltext = cardtext
    })
  })
  const custom_nb = document.getElementsByClassName('custom').length
  if (dialog_box.el) {
    const left =
      ((50 - 2 * custom_nb) * window.innerWidth) / 100.0 -
      dialog_box.el.getBoundingClientRect().width / 2
    const top =
      ((50 - 2 * custom_nb) * window.innerHeight) / 100.0 -
      dialog_box.el.getBoundingClientRect().height / 2
    dialog_box.el.style.left = '%X%'.replace('%X', (100 * left) / window.innerWidth)
    dialog_box.el.style.top = '%Y%'.replace('%Y', (100 * top) / window.innerHeight)
  }
  active_current(custom.value)
})
</script>

<template>
  <div
    class="custom"
    ref="custom"
    @mousedown="mouse_down"
    @mouseup="mouse_up"
    @mousemove="mouse_move"
  >
    <div class="modaldlg" v-if="meta.ismodal"></div>
    <v-card>
      <v-card-title class="bg-grey-lighten-1 movecursor">
        {{ meta.title }}
      </v-card-title>
      <v-icon class="allsize" size="16" color="#ccc" @click="all_size" v-if="!meta.ismodal"
        >mdi-arrow-expand-all</v-icon
      >
      <v-card-text>
        <CustomComponents :data="data" :comp="comp" @action="click_action" />
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
  max-height: calc(100% - 100px);
  max-width: calc(100% - 20px);
  position: fixed;
  margin: 0px;
  transition: none;
}
.custom .v-card .movecursor {
  cursor: grab;
}

.custom .v-card .movecursor:active {
  cursor: grabbing;
}
.allsize {
  position: absolute;
  top: 0px;
  right: 0px;
  cursor: nesw-resize;
}
.custom .v-card .v-card-text {
  padding: 5px;
}
.modaldlg {
  pointer-events: auto;
  background: rgb(var(--v-theme-on-surface));
  border-radius: inherit;
  bottom: 0;
  left: 0;
  opacity: 0.32;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 99;
}
</style>
