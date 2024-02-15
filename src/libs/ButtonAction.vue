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
</script>

<template>
  <v-btn class="bg-grey" @click="clickaction" min-width="100px" :disabled="action_disabled">
    <v-icon>{{ action.short_icon }}</v-icon>
    <span>{{ action.text }}</span>
  </v-btn>
</template>

<style scoped></style>
