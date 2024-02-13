<script>
import AbstractComp from '@/components/AbstractComp.vue'
export default {
  name: 'LinkLabel',
  extends: AbstractComp,
  components: { AbstractComp }
}
</script>

<template>
  <AbstractComp :value="value" :component="component">
    <a target="_blank" :href="component.link" v-html="value_formated"></a>
  </AbstractComp>
</template>

<style scoped></style>
