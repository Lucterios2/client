<script setup>
const emit = defineEmits(['click'])
const props = defineProps({
  action: Object
})
function clickaction() {
  console.log('click', props.action)
  emit('click', props.action)
}
</script>

<template>
  <v-btn class="bg-grey" :prepend-icon="props.action.icon" @click="clickaction">
    {{ props.action.text }}</v-btn
  >
</template>

<style scoped></style>
