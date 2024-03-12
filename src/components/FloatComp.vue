<script>
import AbstractEventComp from '@/components/AbstractEventComp.vue'
export default {
  name: 'ButtonComp',
  extends: AbstractEventComp
}
</script>

<template>
  <v-text-field
    v-model="current_value"
    :label="component.description"
    :rules="[check]"
    onFocusout="actionPerformed()"
  />
</template>

<style scoped></style>
