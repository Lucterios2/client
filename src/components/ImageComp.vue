<script>
import AbstractComp from '@/components/AbstractComp.vue'
import { Stringformat } from '@/libs/utils'
export default {
  name: 'ImageComp',
  extends: AbstractComp,
  components: { AbstractComp },
  computed: {
    is_icon() {
      return this.component.type == '#'
    },
    image_src() {
      const current_value = this.value || ''
      switch (this.component.type) {
        case '#':
          return current_value
        case '':
          return window.location.href + current_value
        default:
          if (current_value.substring(0, 10) === 'data:image') {
            return current_value
          } else {
            return Stringformat('data:image/{0};base64,{1}', this.component.type, current_value)
          }
      }
    }
  }
}
</script>

<template>
  <AbstractComp :component="component">
    <img :src="image_src" v-if="!is_icon" />
    <v-icon size="48px" v-if="is_icon">{{ image_src }}</v-icon>
  </AbstractComp>
</template>

<style scoped></style>
