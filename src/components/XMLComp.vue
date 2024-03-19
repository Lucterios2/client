<script>
import AbstractEventComp from '@/components/AbstractEventComp.vue'
import { Stringformat } from '@/libs/utils'
export default {
  name: 'XMLComp',
  extends: AbstractEventComp,
  data: () => ({
    showMenu: false,
    posx: 500,
    posy: 500,
    edit_target: null
  }),
  computed: {
    has_menu() {
      return this.component.submenu && this.component.submenu.length > 0
    },
    menu_style() {
      return Stringformat('position: absolute; top: {0}px; left: {1}px;', [this.posy, this.posx])
    }
  },
  methods: {
    show_context_menu(event) {
      if (this.has_menu) {
        event.preventDefault()
        this.showMenu = false
        this.posx = event.clientX
        this.posy = event.clientY
        this.edit_target = event.target
        this.$nextTick(() => {
          this.showMenu = true
        })
        return true
      } else {
        return false
      }
    },
    append_item(new_item) {
      const last_value = this.current_value
      const selectionStart = this.edit_target.selectionStart || last_value.length
      this.current_value =
        last_value.substring(0, selectionStart) + new_item + last_value.substring(selectionStart)
      this.$nextTick(() => {
        this.showMenu = false
      })
    }
  }
}
</script>

<template>
  <v-textarea
    v-model="current_value"
    :label="component.description"
    :rules="check"
    :disabled="is_disabled"
    @focusout="runIfChange"
    @keyup.enter="onPressEnter"
    @contextmenu="show_context_menu"
  />

  <v-menu v-model="showMenu" :style="menu_style" v-if="has_menu">
    <v-list>
      <v-list-item v-for="(item, i) in component.submenu" :key="i" :value="item[1]">
        <v-list-item-title @click="append_item(item[1])">{{ item[0] }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
  {{ has_menu }}
</template>
