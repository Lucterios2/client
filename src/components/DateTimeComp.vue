<script>
import AbstractEventComp from '@/components/AbstractEventComp.vue'
import { NULL_VALUE } from '@/libs/utils'
export default {
  name: 'DateTimeComp',
  extends: AbstractEventComp,
  methods: {
    getInitialValue() {
      return this.value.substring(0, 16).replace('T', ' ')
    },
    setValue(params) {
      this.setValueEx(params)
      if (this.current_value == NULL_VALUE) {
        this.current_value == ''
      }
      this.current_value = this.current_value.substring(0, 16)
      this.$forceUpdate()
    },
    getValue(final_return) {
      if (final_return && this.current_value == '') {
        return NULL_VALUE
      }
      return this.current_value.replace('T', ' ')
    }
  }
}
</script>

<template>
  <v-text-field
    class="edit"
    type="datetime-local"
    v-model="current_value"
    :label="component.description"
    :rules="check"
    :disabled="is_disabled"
    :clearable="!component.needed"
    @focusout="runIfChange"
    @keyup.enter="onPressEnter"
  />
</template>
