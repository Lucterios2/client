<script>
import AbstractEventComp from '@/components/AbstractEventComp.vue'
import ButtonAction from '@/libs/ButtonAction.vue'
export default {
  name: 'ButtonComp',
  extends: AbstractEventComp,
  components: { AbstractEventComp, ButtonAction },
  methods: {
    get_value() {
      return this.component.name
    },
    add_parameters() {}
  }
}
</script>

<template>
  <AbstractEventComp :value="value" :component="component" v-if="component.action">
    <ButtonAction :action="component.action" @click="actionPerformed()" />
  </AbstractEventComp>
</template>

<style scoped></style>
