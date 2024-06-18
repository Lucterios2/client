<script>
import AbstractEventComp from '@/components/AbstractEventComp.vue'
export default {
  name: 'EditComp',
  extends: AbstractEventComp,
  data: () => ({
    mask: null
  }),
  computed: {
    check() {
      return [this.check_no_empty, this.check_size, this.check_mask]
    }
  },
  methods: {
    check_size() {
      if (this.component.size > 0) {
        return this.getValue().length < this.component.size || this.$t('Size too long!')
      }
      return true
    },
    check_mask() {
      if (this.mask) {
        return this.mask.test(this.getValue()) || this.$t('Invalid format!')
      }
      return true
    }
  },
  mounted() {
    if (this.component.reg_expr) {
      this.mask = new RegExp(this.component.reg_expr, 'i')
    }
  }
}
</script>

<template>
  <v-text-field
    class="edit"
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
  />
</template>
