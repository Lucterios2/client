<script setup>
const props = defineProps({
  action: Object
})
</script>

<template>
  <v-btn class="bg-grey" :prepend-icon="props.action.icon"> {{ props.action.text }}</v-btn>
</template>

<style scoped></style>
