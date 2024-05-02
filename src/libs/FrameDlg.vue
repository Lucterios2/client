<script>
import ButtonsBar from '@/libs/ButtonsBar.vue'
import { Stringformat } from '@/libs/convert'
import { first_element_by_class, refreshAction } from '@/libs/utils'

export default {
  name: 'FrameDlg',
  components: { ButtonsBar },
  props: {
    meta: Object,
    actions: Array,
    close: Object,
    noaction: Boolean
  },
  emits: ['action', 'close'],
  data: () => ({
    dialog_box: {
      el: null,
      eltext: null,
      move: false,
      allsize: false,
      resize: false
    },
    dialog_height: 0
  }),
  computed: {
    content_style() {
      return Stringformat('max-height: {0}px', [this.dialog_height - 250])
    },
    active_modal_frame() {
      return this.meta.ismodal || this.dialog_box.resize
    }
  },
  methods: {
    active_current(current) {
      Array.from(document.getElementsByClassName('frameDlg')).forEach((custom_element) => {
        const cust_cards = Array.from(custom_element.getElementsByClassName('v-card'))
        cust_cards.sort((card1, card2) => {
          return card2.style.zIndex - card1.style.zIndex
        })
        var new_index = 0
        cust_cards.forEach((cust_card) => {
          cust_card.style.zIndex = new_index--
          first_element_by_class(cust_card, 'v-card-title').className = !this.noaction
            ? 'v-card-title bg-grey-lighten-1 movecursor'
            : 'v-card-title bg-grey-lighten-1'
        })
      })
      const current_card = first_element_by_class(current, 'v-card')
      if (current_card) {
        current_card.style.zIndex = 10000
        first_element_by_class(current_card, 'v-card-title').className = !this.noaction
          ? 'v-card-title bg-grey-darken-1 movecursor'
          : 'v-card-title bg-grey-darken-1'
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
        first_element_by_class(this.dialog_box.el, 'v-card-title').className = !this.noaction
          ? 'v-card-title bg-grey-darken-1 movecursor'
          : 'v-card-title bg-grey-darken-1'
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
      this.dialog_height = this.$el.getBoundingClientRect().height
    },
    mouse_down(event) {
      if (this.noaction) {
        return
      }
      this.active_current(this.$el)
      if (event.button === 0 && !this.dialog_box.allsize) {
        this.dialog_box.resize = event.target.classList.contains('move_spot')
        this.dialog_box.move = !this.dialog_box.resize
        this.dialog_box.mouseStartX = event.clientX
        this.dialog_box.mouseStartY = event.clientY
        this.dialog_box.elStartX = this.dialog_box.el.getBoundingClientRect().left
        this.dialog_box.elStartY = this.dialog_box.el.getBoundingClientRect().top
        this.dialog_box.elStartW = this.dialog_box.el.getBoundingClientRect().width
        this.dialog_box.elStartH = this.dialog_box.el.getBoundingClientRect().height
        this.dialog_box.elStartDiffH =
          this.dialog_box.el.getBoundingClientRect().height -
          this.dialog_box.eltext.getBoundingClientRect().height
        this.dialog_box.el.style.zIndex = 100
      }
    },
    mouse_up() {
      if (this.dialog_box.move) {
        this.dialog_box.move = false
      }
      if (this.dialog_box.resize) {
        this.dialog_box.resize = false
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
      if (this.dialog_box.resize) {
        const width = Math.min(
          Math.max(this.dialog_box.elStartW + event.clientX - this.dialog_box.mouseStartX, 350),
          window.innerWidth
        )
        const height = Math.min(
          Math.max(this.dialog_box.elStartH + event.clientY - this.dialog_box.mouseStartY, 150),
          window.innerHeight - 110
        )
        this.dialog_box.el.style.width = width + 'px'
        this.dialog_box.el.style.height = height + 'px'
        this.dialog_box.eltext.style.width = width + 'px'
        this.dialog_box.eltext.style.height = height - this.dialog_box.elStartDiffH + 'px'
      }
    },
    onClickaction(act, no_owner) {
      return this.$emit('action', act, no_owner)
    },
    onClose(refresh_parent) {
      this.$emit('close', refresh_parent)
    },
    refreshDlg() {
      this.onClickaction(refreshAction(this.meta))
    },
    closeDlg() {
      if (this.close) {
        this.onClickaction(this.close, true)
      }
      this.onClose(true)
    },
    define_position() {
      if (this.dialog_box.el) {
        const nb_frame = document.getElementsByClassName('frameDlg').length
        const left = Math.max(
          0,
          ((50 - 2 * nb_frame) * window.innerWidth) / 100.0 -
            this.dialog_box.el.getBoundingClientRect().width / 2
        )
        const top =
          (window.innerHeight - this.dialog_box.el.getBoundingClientRect().height) / 2 +
          5 * nb_frame
        this.dialog_box.el.style.left = '%X%'.replace('%X', (100 * left) / window.innerWidth)
        this.dialog_box.el.style.top = '%Y%'.replace('%Y', (100 * top) / window.innerHeight)
      }
    }
  },
  mounted() {
    Array.from(this.$el.getElementsByClassName('v-card')).forEach((card) => {
      this.dialog_box.el = card
      Array.from(this.dialog_box.el.getElementsByClassName('v-card-text')).forEach((cardtext) => {
        this.dialog_box.eltext = cardtext
        this.dialog_box.eltext.style.maxHeight = '%Ypx'.replace('%Y', window.innerHeight - 200)
      })
    })
    this.active_current(this.$el)
    this.dialog_height = this.$el.getBoundingClientRect().height
    var positionIntervalId = setInterval(() => {
      this.define_position()
      clearInterval(positionIntervalId)
    }, 10)
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !this.noaction) {
        const current_card = first_element_by_class(this.$el, 'v-card')
        if (current_card && current_card.style.zIndex > 10) {
          this.closeDlg()
        }
      }
    })
  }
}
</script>

<template>
  <div class="frameDlg" @mousedown="mouse_down" @mouseup="mouse_up" @mousemove="mouse_move">
    <div class="modaldlg" v-if="active_modal_frame"></div>
    <v-card>
      <v-card-title :class="!noaction ? 'bg-grey-lighten-1 movecursor' : 'bg-grey-lighten-1'">
        {{ meta.title }}
        <div class="tools" v-if="!noaction">
          <v-btn
            variant="text"
            size="x-small"
            icon="mdi-arrow-expand-all"
            @click="all_size"
            v-if="!meta.ismodal"
          ></v-btn>
          <v-btn variant="text" size="x-small" icon="mdi-refresh" @click="refreshDlg"></v-btn>
          <v-btn variant="text" size="x-small" icon="mdi-close" @click="closeDlg"></v-btn>
        </div>
      </v-card-title>

      <v-card-text>
        <slot />
      </v-card-text>
      <ButtonsBar :actions="actions" :close="close" @clickaction="onClickaction" @close="onClose">
        <v-icon class="move_spot" v-if="!noaction">mdi</v-icon>
      </ButtonsBar>
    </v-card>
  </div>
</template>

<style scoped>
.frameDlg .v-card {
  max-height: calc(100% - 100px);
  max-width: calc(100% - 20px);
  position: fixed;
  margin: 0px;
  transition: none;
}
.frameDlg .v-card .v-card-title {
  font-size: large;
  height: 40px;
  margin-top: -3px;
}
.frameDlg .v-card .v-card-title .tools {
  display: inline;
  position: absolute;
  right: 5px;
  top: 2px;
}
.frameDlg .v-card .v-card-text {
  overflow-y: scroll;
  min-width: 200px;
  min-height: 60px;
}
.frameDlg .v-card .movecursor {
  cursor: grab;
}

.frameDlg .v-card .movecursor:active {
  cursor: grabbing;
}
.frameDlg .v-card .v-card-text {
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
.move_spot {
  cursor: se-resize;
  position: relative;
  top: 18px;
  margin-left: -10px;
  margin-right: -10px;
}
</style>
