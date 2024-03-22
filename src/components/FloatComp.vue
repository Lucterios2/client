<script>
import AbstractEventComp from '@/components/AbstractEventComp.vue'

export default {
  name: 'EditComp',
  extends: AbstractEventComp,
  computed: {
    check() {
      return []
    },
    step() {
      var current_step = 1
      for (var decI = 0; decI < this.component.prec; decI++) {
        current_step = current_step / 10
      }
      return current_step
    }
  },
  methods: {
    getInitialValue() {
      return parseFloat(this.value).toFixed(this.component.prec)
    },
    setValue(params) {
      this.setValueEx(params)
      this.current_value = parseFloat(this.current_value.toString().replace(',', '.')).toFixed(
        this.component.prec
      )
      if (isNaN(this.current_value)) {
        this.current_value = parseFloat(this.value.toString()).toFixed(this.component.prec)
      }
      this.current_value = Math.min(
        this.component.max,
        Math.max(this.component.min, this.current_value)
      )
      this.$forceUpdate()
    },
    onFocusout() {
      this.setValue(this.current_value)
      this.runIfChange()
    }
  }
}
</script>

<template>
  <v-text-field
    class="edit"
    type="number"
    v-model="current_value"
    :min="component.min"
    :max="component.max"
    :step="step"
    :label="component.description"
    :rules="check"
    :disabled="is_disabled"
    :key="forceRecompute"
    :style="style_size"
    @focusout="onFocusout"
    @keyup.enter="onPressEnter"
  />
</template>

<style></style>
