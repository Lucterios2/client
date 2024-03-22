<script>
import AbstractComp from '@/components/AbstractComp.vue'
export default {
  name: 'LabelForm',
  extends: AbstractComp,
  components: { AbstractComp }
}
</script>

<template>
  <AbstractComp :value="value" :component="component">
    <span ref="tofocus" v-html="value_formated"></span>
  </AbstractComp>
</template>

<style scoped></style>
