<script setup>
import { computed } from 'vue'

const emit = defineEmits(['click'])
const props = defineProps({
  action: Object
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
    return window.location.href + props.action.icon
  }
})
</script>

<template>
  <v-btn class="bg-grey" @click="clickaction" min-width="100px" :disabled="action_disabled">
    <img :src="image_src" v-if="!is_icon" />
    <v-icon v-if="is_icon">{{ image_src }}</v-icon>
    <span>{{ action.text }}</span>
  </v-btn>
</template>

<style scoped></style>
