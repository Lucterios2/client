<script>
import ButtonsBar from '@/libs/ButtonsBar.vue'
import { Stringformat } from '@/libs/convert'
import { first_element_by_class, refreshAction } from '@/libs/utils'

export default {
  name: 'FrameDlg',
  components: { ButtonsBar },
  props: {
    id: String,
    meta: Object,
    actions: Array,
    close: Object,
    noaction: Boolean
  },
  emits: ['action', 'close', 'interface'],
  data: () => ({
    element_card: null,
    element_cardtext: null,
    dialog_box: {
      frameid: '',
      move: false,
      allsize: false,
      resize: false,
      StartXsize: 0,
      StartYsize: 0,
      StartX: 0,
      StartY: 0,
      StartW: 0,
      StartH: 0,
      StartDiffH: 0,
      textStartW: 0,
      textStartH: 0,
      mouseStartX: 0,
      mouseStartY: 0,
      height: 0,
      posrefresh: null
    }
  }),
  computed: {
    frame_id() {
      return 'frame_' + this.id
    },
    content_style() {
      return Stringformat('max-height: {0}px', [this.dialog_box.height - 250])
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
        this.element_card.style.left =
          (100.0 * this.dialog_box.StartXsize) / window.innerWidth + '%'
        this.element_card.style.top =
          (100.0 * this.dialog_box.StartYsize) / window.innerHeight + '%'
        this.element_card.style.width = ''
        this.element_card.style.height = ''
        this.element_cardtext.style.width = ''
        this.element_cardtext.style.height = ''
        first_element_by_class(this.element_card, 'v-card-title').className = !this.noaction
          ? 'v-card-title bg-grey-darken-1 movecursor'
          : 'v-card-title bg-grey-darken-1'
      } else {
        this.dialog_box.allsize = true
        this.dialog_box.StartXsize = this.element_card.getBoundingClientRect().left
        this.dialog_box.StartYsize = this.element_card.getBoundingClientRect().top
        this.dialog_box.textStartW = this.element_cardtext.getBoundingClientRect().width
        this.dialog_box.textStartH = this.element_cardtext.getBoundingClientRect().height
        this.element_card.style.left = '10px'
        this.element_card.style.top = '60px'
        this.element_card.style.width = 'calc(100% - 20px)'
        this.element_card.style.height = 'calc(100% - 90px)'
        this.element_cardtext.style.width = 'calc(100% - 20px)'
        this.element_cardtext.style.height = 'calc(100% - 98px)'
        first_element_by_class(this.element_card, 'v-card-title').className =
          'v-card-title bg-grey-darken-1'
      }
      this.dialog_box.height = this.$el.getBoundingClientRect().height
    },
    mouse_down(event) {
      if (this.noaction) {
        return
      }
      this.active_current(this.$el)
      if (event.button === 0 && !this.dialog_box.allsize) {
        this.dialog_box.resize = event.target.classList.contains('resize_spot')
        this.dialog_box.move = event.target.classList.contains('movecursor')
        this.dialog_box.mouseStartX = event.clientX
        this.dialog_box.mouseStartY = event.clientY
        this.dialog_box.StartX = this.element_card.getBoundingClientRect().left
        this.dialog_box.StartY = this.element_card.getBoundingClientRect().top
        this.dialog_box.StartW = this.element_card.getBoundingClientRect().width
        this.dialog_box.StartH = this.element_card.getBoundingClientRect().height
        this.dialog_box.StartDiffH =
          this.element_card.getBoundingClientRect().height -
          this.element_cardtext.getBoundingClientRect().height
        this.element_card.style.zIndex = 100
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
          Math.max(this.dialog_box.StartX + event.clientX - this.dialog_box.mouseStartX, 0),
          window.innerWidth - this.element_card.getBoundingClientRect().width
        )
        const top = Math.min(
          Math.max(this.dialog_box.StartY + event.clientY - this.dialog_box.mouseStartY, 50),
          window.innerHeight - this.element_card.getBoundingClientRect().height
        )
        this.element_card.style.left = (100.0 * left) / window.innerWidth + '%'
        this.element_card.style.top = (100.0 * top) / window.innerHeight + '%'
      }
      if (this.dialog_box.resize) {
        const width = Math.min(
          Math.max(this.dialog_box.StartW + event.clientX - this.dialog_box.mouseStartX, 350),
          window.innerWidth
        )
        const height = Math.min(
          Math.max(this.dialog_box.StartH + event.clientY - this.dialog_box.mouseStartY, 150),
          window.innerHeight - 110
        )
        this.element_card.style.width = width + 'px'
        this.element_card.style.height = height + 'px'
        this.element_cardtext.style.width = width + 'px'
        this.element_cardtext.style.height = height - this.dialog_box.StartDiffH + 'px'
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
      if (this.element_card && !this.dialog_box.posrefresh) {
        const nb_frame = document.getElementsByClassName('frameDlg').length
        const left = Math.max(
          0,
          ((50 - 2 * nb_frame) * window.innerWidth) / 100.0 -
            this.element_card.getBoundingClientRect().width / 2
        )
        const top =
          (window.innerHeight - this.element_card.getBoundingClientRect().height) / 2 + 5 * nb_frame
        this.element_card.style.left = '%X%'.replace('%X', (100 * left) / window.innerWidth)
        this.element_card.style.top = '%Y%'.replace('%Y', (100 * top) / window.innerHeight)
      }
      this.dialog_box.posrefresh = null
    },
    get_card_elements() {
      const element_frame = document.querySelector('#' + this.frame_id)
      var current_card = null
      var current_cardtext = null
      if (element_frame) {
        Array.from(element_frame.getElementsByClassName('v-card')).forEach((card) => {
          current_card = card
          Array.from(this.element_card.getElementsByClassName('v-card-text')).forEach(
            (cardtext) => {
              current_cardtext = cardtext
            }
          )
        })
      }
      return [current_card, current_cardtext]
    },
    load_dlg() {
      this.dialog_box = this.$store.state.observer_dlg[this.id] || {}
      const cardelements = this.get_card_elements()
      const current_card = cardelements[0]
      const current_cardtext = cardelements[1]
      this.dialog_box.posrefresh = this.dialog_box.allsize !== undefined
      if (current_card && this.dialog_box.posrefresh) {
        if (this.dialog_box.allsize) {
          current_card.style.left = '10px'
          current_card.style.top = '60px'
          current_card.style.width = 'calc(100% - 20px)'
          current_card.style.height = 'calc(100% - 90px)'
          current_cardtext.style.width = 'calc(100% - 20px)'
          current_cardtext.style.height = 'calc(100% - 98px)'
          first_element_by_class(current_card, 'v-card-title').className =
            'v-card-title bg-grey-darken-1'
        } else {
          current_card.style.left = (100.0 * this.dialog_box.StartX) / window.innerWidth + '%'
          current_card.style.top = (100.0 * this.dialog_box.StartY) / window.innerHeight + '%'
          current_card.style.width = this.dialog_box.StartW + 'px'
          current_card.style.height = this.dialog_box.StartH + 'px'
          if (this.dialog_box.StartW) {
            current_cardtext.style.width = this.dialog_box.StartW + 'px'
          }
          if (this.dialog_box.StartH) {
            current_cardtext.style.height =
              this.dialog_box.StartH - this.dialog_box.StartDiffH + 'px'
          }
          first_element_by_class(current_card, 'v-card-title').className = !this.noaction
            ? 'v-card-title bg-grey-darken-1 movecursor'
            : 'v-card-title bg-grey-darken-1'
        }
      }
    },
    save_dlg() {
      const cardelements = this.get_card_elements()
      const current_card = cardelements[0]
      const current_cardtext = cardelements[1]
      if (current_card) {
        this.dialog_box.frameid = this.frame_id
        if (current_card.style.left) {
          this.dialog_box.StartX =
            (parseFloat(current_card.style.left.replace('%', '')) * window.innerWidth) / 100
        } else {
          this.dialog_box.StartX = current_card.getBoundingClientRect().left
        }
        if (current_card.style.top) {
          this.dialog_box.StartY =
            (parseFloat(current_card.style.top.replace('%', '')) * window.innerHeight) / 100
        } else {
          this.dialog_box.StartY = current_card.getBoundingClientRect().top
        }
        if (current_card.style.width) {
          this.dialog_box.StartW = parseFloat(current_card.style.width.replace('px', ''))
        } else {
          this.dialog_box.StartW = current_card.getBoundingClientRect().width
            ? current_card.getBoundingClientRect().width
            : null
        }
        if (current_card.style.height) {
          this.dialog_box.StartH = parseFloat(current_card.style.height.replace('px', ''))
        } else {
          this.dialog_box.StartH = current_card.getBoundingClientRect().height
            ? current_card.getBoundingClientRect().height
            : null
        }
        this.dialog_box.StartDiffH =
          this.dialog_box.StartH - current_cardtext.getBoundingClientRect().height
      }
      this.$store.commit('save_observer_dlg', { observerId: this.id, dlg: this.dialog_box })
    },
    emitInterface() {
      this.$emit('interface', {
        load_dlg: () => {
          this.load_dlg()
        },
        save_dlg: () => {
          this.save_dlg()
        }
      })
    }
  },
  mounted() {
    this.emitInterface()
    Array.from(this.$el.getElementsByClassName('v-card')).forEach((card) => {
      this.element_card = card
      Array.from(this.element_card.getElementsByClassName('v-card-text')).forEach((cardtext) => {
        this.element_cardtext = cardtext
        this.element_cardtext.style.maxHeight = '%Ypx'.replace('%Y', window.innerHeight - 200)
      })
    })
    this.active_current(this.$el)
    this.dialog_box.height = this.$el.getBoundingClientRect().height
    this.$nextTick(() => {
      this.define_position()
    })
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
  <div
    :id="frame_id"
    class="frameDlg"
    @mousedown="mouse_down"
    @mouseup="mouse_up"
    @mousemove="mouse_move"
  >
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
        <v-icon class="resize_spot" v-if="!noaction">mdi</v-icon>
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
  padding: 5px;
  font-size: 0.875rem;
}
@media (min-width: 1600px) {
  .frameDlg .v-card .v-card-text {
    font-size: 1.1rem;
  }
}

@media (max-height: 500px) {
  .frameDlg .v-card .v-card-text {
    font-size: 0.7rem;
  }
}

.frameDlg .v-card .movecursor {
  cursor: grab;
}

.frameDlg .v-card .movecursor:active {
  cursor: grabbing;
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
.resize_spot {
  cursor: se-resize;
  position: relative;
  top: 18px;
  margin-left: -10px;
  margin-right: -10px;
}
</style>
