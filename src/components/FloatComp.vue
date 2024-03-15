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
    setValue(params) {
      if (typeof params == 'object') {
        this.current_value = params.value.toString()
      } else {
        this.current_value = params.toString()
      }
      this.current_value = parseFloat(this.current_value.replace(',', '.')).toFixed(
        this.component.prec
      )
      if (isNaN(this.current_value)) {
        this.current_value = parseFloat(this.value).toFixed(this.component.prec)
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
    @focusout="onFocusout"
    @keyup.enter="onPressEnter"
  />
</template>

<style>
.edit {
  min-width: 100px;
}
</style>
