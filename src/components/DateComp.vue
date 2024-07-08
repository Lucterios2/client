<script>
import AbstractEventComp from '@/components/AbstractEventComp.vue'
import { NULL_VALUE } from '@/libs/utils'
export default {
  name: 'DateComp',
  extends: AbstractEventComp,
  computed: {
    check() {
      return [this.check_no_empty, this.check_null]
    }
  },
  methods: {
    check_null() {
      if (this.component.needed && (!this.getValue() || this.getValue() === NULL_VALUE)) {
        return this.$t('This field is needed!')
      }
      return true
    },
    setValue(params) {
      this.setValueEx(params)
      if (this.current_value == null || this.current_value === NULL_VALUE) {
        this.current_value = ''
      } else if (this.current_value === '') {
        this.current_value = new Date().toISOString().substring(0, 10)
      }
      this.forceRecompute++
      this.$forceUpdate()
    },
    add_parameters(params) {
      params[this.component.name] = this.getValue(true)
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
    v-model="current_value"
    ref="tofocus"
    :label="component.description"
    :rules="check"
    :disabled="is_disabled"
    :clearable="!component.needed"
    :style="style_size"
    :name="component.name"
    :key="forceRecompute"
    @focusin="savefocusin"
    @focusout="runIfChange"
    @keyup.enter="onPressEnter"
  />
</template>
