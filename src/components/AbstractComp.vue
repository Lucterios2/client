<script>
import { convertLuctoriosFormatToHtml, formatToString } from '@/libs/utils'
export default {
  name: 'AbstractComp',
  props: {
    value: [String, Number, Array, Boolean],
    component: Object,
    meta: Object
  },
  emits: ['action', 'close'],
  computed: {
    value_formated() {
      const formatstr = this.component.formatstr || '{0}'
      const int_label = formatToString(
        this.value,
        this.component.formatnum || '',
        formatstr.replaceAll('%s', '{0}')
      )
      return convertLuctoriosFormatToHtml(int_label)
    }
  }
}
</script>

<template>
  <div :name="component.name">
    <label v-if="component.description">{{ component.description }}</label>
    <slot />
  </div>
</template>

<style scoped>
label {
  padding-right: 5px;
  font-weight: bold;
}
</style>
