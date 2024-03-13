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
        return this.get_value().length < this.component.size || this.$t('Size too long!')
      }
      return true
    },
    check_mask() {
      if (this.mask) {
        return this.mask.test(this.get_value()) || this.$t('Invalid format!')
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
    :label="component.description"
    :rules="check"
    @focusout="actionPerformed"
  />
</template>

<style>
.edit {
  min-width: 100px;
}
</style>
