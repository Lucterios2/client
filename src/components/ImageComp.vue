<script>
import AbstractComp from '@/components/AbstractComp.vue'
import { getUrlServer } from '@/libs/transport'
import { Stringformat } from '@/libs/convert'
export default {
  name: 'ImageComp',
  extends: AbstractComp,
  components: { AbstractComp },
  computed: {
    is_icon() {
      return this.component.type === '#' || this.component.short_icon
    },
    image_src() {
      const current_value = this.value || ''
      if (this.component.short_icon) {
        return this.component.short_icon
      }
      switch (this.component.type) {
        case '#':
          return current_value
        case '':
          return getUrlServer() + current_value
        default:
          if (current_value.substring(0, 10) === 'data:image') {
            return current_value
          } else {
            return Stringformat('data:image/{0};base64,{1}', [
              this.component.type || '*',
              current_value
            ])
          }
      }
    }
  }
}
</script>

<template>
  <AbstractComp :component="component">
    <img ref="tofocus" :src="image_src" v-if="!is_icon" />
    <v-icon size="48px" v-if="is_icon">{{ image_src }}</v-icon>
  </AbstractComp>
</template>

<style scoped></style>
