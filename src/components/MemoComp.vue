<script>
import AbstractEventComp from '@/components/AbstractEventComp.vue'
import { Stringformat, convertLuctoriosFormatToHtml } from '@/libs/convert'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
export default {
  name: 'MemoComp',
  extends: AbstractEventComp,
  components: { QuillEditor },
  data: () => ({
    showMenu: false,
    posx: 500,
    posy: 500,
    edit_target: null,
    quill: null
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
    getInitialValue() {
      var return_value = this.value.replace(/\n/g, '{[br/]}')
      if (this.component.with_hypertext) {
        return_value = return_value.replaceAll('<p>', '')
        return_value = return_value.replaceAll('</p>', '')
        return_value = return_value.replace(/</g, '{[')
        return_value = return_value.replace(/>/g, ']}')
      }
      return return_value
    },
    setValue(params) {
      this.setValueEx(params)
      if (this.component.with_hypertext) {
        this.current_value = convertLuctoriosFormatToHtml(this.current_value, true)
      } else {
        this.current_value = this.current_value.replace('{[br/]}', '\n')
      }
      this.$forceUpdate()
    },
    getValue(final_return) {
      var return_value = this.current_value
      if (final_return) {
        return_value = return_value.replace(/\n/g, '{[br/]}')
        if (this.component.with_hypertext) {
          return_value = return_value.replaceAll('<p>', '')
          return_value = return_value.replaceAll('</p>', '')
          return_value = return_value.replace(/</g, '{[')
          return_value = return_value.replace(/>/g, ']}')
        }
      }
      return return_value
    },
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
    },
    ready(quill) {
      this.quill = quill
    }
  }
}
</script>

<template>
  <v-textarea
    v-if="!component.with_hypertext"
    v-model="current_value"
    :label="component.description"
    :rules="check"
    :disabled="is_disabled"
    @focusout="runIfChange"
    @keyup.enter="onPressEnter"
    @contextmenu="show_context_menu"
  />
  <QuillEditor
    v-if="component.with_hypertext"
    v-model:content="current_value"
    theme="snow"
    toolbar="essential"
    contentType="html"
    :label="component.description"
    :rules="check"
    :readOnly="is_disabled"
    @ready="ready"
    @blur="runIfChange"
  />
  <v-menu v-model="showMenu" :style="menu_style" v-if="has_menu">
    <v-list>
      <v-list-item v-for="(item, i) in component.submenu" :key="i" :value="item[1]">
        <v-list-item-title @click="append_item(item[1])">{{ item[0] }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
