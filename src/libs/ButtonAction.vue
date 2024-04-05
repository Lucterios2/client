<script setup>
import { computed } from 'vue'
import { getUrlServer } from '@/libs/transport'

const emit = defineEmits(['click'])
const props = defineProps({
  action: Object,
  is_mini: Boolean
})
function clickaction() {
  emit('click', props.action)
}
const action_disabled = computed(() => {
  return props.action.disabled == true
})
const is_icon = computed(() => {
  return props.action.short_icon != undefined && props.action.short_icon != ''
})
const image_src = computed(() => {
  if (props.action.short_icon) {
    return props.action.short_icon
  } else {
    return getUrlServer() + props.action.icon
  }
})
</script>

<template>
  <v-btn
    class="bg-act"
    @click="clickaction"
    :min-width="is_mini ? '40px' : '135px'"
    height="32"
    :disabled="action_disabled"
  >
    <img :src="image_src" width="24px" :title="is_mini ? action.text : ''" v-if="!is_icon" />
    <v-icon v-if="is_icon" :title="is_mini ? action.text : ''">{{ image_src }}</v-icon>
    <span v-if="!is_mini">{{ action.text }}</span>
  </v-btn>
</template>

<style>
.bg-act {
  background-color: #bebebe;
  color: #000;
  font-size: smaller;
}
.bg-act > span > span {
  margin-left: 3px;
  text-transform: capitalize;
}
</style>
