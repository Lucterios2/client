<script setup>
import { convertLuctoriosFormatToHtml, formatToString } from '@/libs/utils'
import { computed } from 'vue'

const props = defineProps({
  value: Object,
  component: Object
})
defineEmits(['action'])
const value_formated = computed(() => {
  const formatstr = props.component.formatstr || '{0}'
  const int_label = formatToString(
    props.value,
    props.component.formatnum || '',
    formatstr.replaceAll('%s', '{0}')
  )
  return int_label
})
</script>

<template>
  <div :name="component.name">
    <label v-if="component.description">{{ component.description }}</label>
    <span v-html="convertLuctoriosFormatToHtml(value_formated)"></span>
  </div>
</template>

<style scoped>
label {
  padding-right: 5px;
  font-weight: bold;
}
</style>
