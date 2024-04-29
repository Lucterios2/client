<script>
import AbstractEventComp from '@/components/AbstractEventComp.vue'
import { NULL_VALUE } from '@/libs/utils'
export default {
  name: 'DateComp',
  extends: AbstractEventComp,
  methods: {
    setValue(params) {
      this.setValueEx(params)
      if (this.current_value === NULL_VALUE) {
        this.current_value = ''
      } else if (this.current_value === '') {
        this.current_value = new Date().toISOString().substring(0, 10)
      }
      this.$forceUpdate()
    },
    getValue(final_return) {
      if (final_return && this.current_value === '') {
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
    ref="tofocus"
    v-model="current_value"
    :label="component.description"
    :rules="check"
    :disabled="is_disabled"
    :clearable="!component.needed"
    :style="style_size"
    @focusin="savefocusin"
    @focusout="runIfChange"
    @keyup.enter="onPressEnter"
  />
</template>
