<script>
import AbstractObserver from '@/observers/AbstractObserver.vue'
import ButtonsBar from '@/libs/ButtonsBar.vue'
import CustomComponents from '@/components/CustomComponents.vue'
import { first_element_by_class } from '@/libs/utils'
import { ref } from 'vue'

export default {
  name: 'CustomBox',
  extends: AbstractObserver,
  components: { ButtonsBar, CustomComponents },
  props: {
    data: Object,
    comp: Array
  },
  data: () => ({
    dialog_box: { el: null, eltext: null, move: false, allsize: false }
  }),
  methods: {
    active_current(current) {
      Array.from(document.getElementsByClassName('custom')).forEach((custom_element) => {
        const cust_cards = Array.from(custom_element.getElementsByClassName('v-card'))
        cust_cards.sort((card1, card2) => {
          return card2.style.zIndex - card1.style.zIndex
        })
        var new_index = 0
        cust_cards.forEach((cust_card) => {
          cust_card.style.zIndex = new_index--
          first_element_by_class(cust_card, 'v-card-title').className =
            'v-card-title bg-grey-lighten-1' + (this.meta.ismodal ? '' : ' movecursor')
        })
      })
      const current_card = first_element_by_class(current, 'v-card')
      if (current_card) {
        current_card.style.zIndex = 100
        first_element_by_class(current_card, 'v-card-title').className =
          'v-card-title bg-grey-darken-1' + (this.meta.ismodal ? '' : ' movecursor')
      }
    },
    all_size() {
      if (this.dialog_box.allsize) {
        this.dialog_box.allsize = false
        this.dialog_box.el.style.left =
          (100.0 * this.dialog_box.elStartXsize) / window.innerWidth + '%'
        this.dialog_box.el.style.top =
          (100.0 * this.dialog_box.elStartYsize) / window.innerHeight + '%'
        this.dialog_box.el.style.width = ''
        this.dialog_box.el.style.height = ''
        this.dialog_box.eltext.style.width = ''
        this.dialog_box.eltext.style.height = ''
        first_element_by_class(this.dialog_box.el, 'v-card-title').className =
          'v-card-title bg-grey-darken-1 movecursor'
      } else {
        this.dialog_box.allsize = true
        this.dialog_box.elStartXsize = this.dialog_box.el.getBoundingClientRect().left
        this.dialog_box.elStartYsize = this.dialog_box.el.getBoundingClientRect().top
        this.dialog_box.eltextStartW = this.dialog_box.eltext.getBoundingClientRect().width
        this.dialog_box.eltextStartH = this.dialog_box.eltext.getBoundingClientRect().height
        this.dialog_box.el.style.left = '10px'
        this.dialog_box.el.style.top = '60px'
        this.dialog_box.el.style.width = 'calc(100% - 20px)'
        this.dialog_box.el.style.height = 'calc(100% - 90px)'
        this.dialog_box.eltext.style.width = 'calc(100% - 20px)'
        this.dialog_box.eltext.style.height = 'calc(100% - 98px)'
        first_element_by_class(this.dialog_box.el, 'v-card-title').className =
          'v-card-title bg-grey-darken-1'
      }
    },
    mouse_down(event) {
      if (event.button === 0 && !this.dialog_box.allsize && !this.meta.ismodal) {
        this.dialog_box.move = true
        this.dialog_box.mouseStartX = event.clientX
        this.dialog_box.mouseStartY = event.clientY
        this.dialog_box.elStartX = this.dialog_box.el.getBoundingClientRect().left
        this.dialog_box.elStartY = this.dialog_box.el.getBoundingClientRect().top
        this.dialog_box.el.style.zIndex = 100
      }
    },
    mouse_up() {
      if (this.dialog_box.move) {
        this.dialog_box.move = false
      }
    },
    mouse_move(event) {
      if (this.dialog_box.move) {
        const left = Math.min(
          Math.max(this.dialog_box.elStartX + event.clientX - this.dialog_box.mouseStartX, 0),
          window.innerWidth - this.dialog_box.el.getBoundingClientRect().width
        )
        const top = Math.min(
          Math.max(this.dialog_box.elStartY + event.clientY - this.dialog_box.mouseStartY, 50),
          window.innerHeight - this.dialog_box.el.getBoundingClientRect().height
        )
        this.dialog_box.el.style.left = (100.0 * left) / window.innerWidth + '%'
        this.dialog_box.el.style.top = (100.0 * top) / window.innerHeight + '%'
      }
    }
  },
  mounted() {
    Array.from(this.custom.getElementsByClassName('v-card')).forEach((card) => {
      this.dialog_box.el = card
      Array.from(this.dialog_box.el.getElementsByClassName('v-card-text')).forEach((cardtext) => {
        this.dialog_box.eltext = cardtext
      })
    })
    const custom_nb = document.getElementsByClassName('custom').length
    if (this.dialog_box.el) {
      const left =
        ((50 - 2 * custom_nb) * window.innerWidth) / 100.0 -
        this.dialog_box.el.getBoundingClientRect().width / 2
      const top =
        ((50 - 2 * custom_nb) * window.innerHeight) / 100.0 -
        this.dialog_box.el.getBoundingClientRect().height / 2
      this.dialog_box.el.style.left = '%X%'.replace('%X', (100 * left) / window.innerWidth)
      this.dialog_box.el.style.top = '%Y%'.replace('%Y', (100 * top) / window.innerHeight)
    }
    this.active_current(this.custom)
  },
  setup() {
    const custom = ref(null)
    return {
      custom
    }
  }
}
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
        <CustomComponents
          :data="data"
          :comp="comp"
          :meta="meta"
          @action="click_action"
          @close="$emit('close')"
          :key="forceRecompute"
        />
      </v-card-text>
      <ButtonsBar
        :actions="actions"
        :close="close"
        @clickaction="click_action"
        @close="$emit('close')"
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
