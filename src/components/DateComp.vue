<script>
import AbstractEventComp from '@/components/AbstractEventComp.vue'
import { NULL_VALUE } from '@/libs/utils'
export default {
  name: 'DateComp',
  extends: AbstractEventComp,
  methods: {
    setValue(params) {
      if (typeof params == 'object') {
        this.current_value = params.value
      } else {
        this.current_value = params
      }
      if (this.current_value == NULL_VALUE) {
        this.current_value == ''
      }
      this.$forceUpdate()
    },
    getValue(final_return) {
      if (final_return && this.current_value == '') {
        return NULL_VALUE
      }
      return this.current_value
    }
  }
}
</script>

<template>
  <v-text-field
    class="edit"
    type="date"
    v-model="current_value"
    :label="component.description"
    :rules="check"
    :disabled="is_disabled"
    :clearable="!component.needed"
    @focusout="runIfChange"
    @keyup.enter="onPressEnter"
  />
</template>
