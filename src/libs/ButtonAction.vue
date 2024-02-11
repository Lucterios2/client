<script setup>
const emit = defineEmits(['click'])
const props = defineProps({
  action: Object
})
function clickaction() {
  emit('click', props.action)
}
</script>

<template>
  <v-btn
    class="bg-grey"
    @click="clickaction"
    min-width="100px"
    :disabled="action.disabled === true"
  >
    <v-icon>{{ action.icon }}</v-icon>
    <span>{{ action.text }}</span>
  </v-btn>
</template>

<style scoped></style>
