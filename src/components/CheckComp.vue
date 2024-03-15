<script>
import AbstractEventComp from '@/components/AbstractEventComp.vue'
export default {
  name: 'CheckComp',
  extends: AbstractEventComp,
  computed: {
    check() {
      return []
    }
  },
  methods: {
    setValue(params) {
      if (typeof params == 'object') {
        this.current_value = params.value.toString()
      } else {
        this.current_value = params.toString()
      }
      this.current_value =
        ['1', 'o', 'y', 't'].indexOf(this.current_value.toLowerCase().charAt(0)) >= 0
      console.log('setValue', this.current_value, this.value)
    }
  }
}
</script>

<template>
  <v-checkbox
    v-model="current_value"
    :label="component.description"
    :disabled="is_disabled"
    @change="runIfChange"
    @keyup.enter="onPressEnter"
  />
</template>

<style></style>
