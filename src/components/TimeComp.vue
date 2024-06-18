<script>
import AbstractEventComp from '@/components/AbstractEventComp.vue'
import { NULL_VALUE } from '@/libs/utils'
export default {
  name: 'TimeComp',
  extends: AbstractEventComp,
  methods: {
    getInitialValue() {
      return this.value.substring(0, 5)
    },
    setValue(params) {
      this.setValueEx(params)
      if (this.current_value === NULL_VALUE) {
        this.current_value === ''
      }
      this.current_value = this.current_value.substring(0, 5)
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
    type="time"
    v-model="current_value"
    ref="tofocus"
    :label="component.description"
    :rules="check"
    :disabled="is_disabled"
    :clearable="!component.needed"
    :style="style_size"
    :name="component.name"
    @focusin="savefocusin"
    @focusout="runIfChange"
    @keyup.enter="onPressEnter"
  >
  </v-text-field>
</template>
