<script>
import AbstractEventComp from '@/components/AbstractEventComp.vue'
export default {
  name: 'EditComp',
  extends: AbstractEventComp
}
</script>

<template>
  <v-text-field
    v-model="current_value"
    :label="component.description"
    :rules="[check]"
    @focusout="actionPerformed"
  />
</template>

<style scoped></style>
