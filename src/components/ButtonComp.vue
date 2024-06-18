<script>
import AbstractEventComp from '@/components/AbstractEventComp.vue'
import ButtonAction from '@/libs/ButtonAction.vue'
export default {
  name: 'ButtonComp',
  extends: AbstractEventComp,
  components: { AbstractEventComp, ButtonAction },
  methods: {
    getValue() {
      return this.component.name
    },
    add_parameters() {}
  }
}
</script>

<template>
  <AbstractEventComp :value="value" :component="component" v-if="component.action">
    <ButtonAction
      ref="tofocus"
      class="button"
      :name="component.name"
      :action="component.action"
      :is_mini="component.is_mini"
      @click="actionPerformed()"
    />
  </AbstractEventComp>
</template>

<style scoped>
.button {
  margin-left: auto;
  margin-right: auto;
  display: block;
}
</style>
