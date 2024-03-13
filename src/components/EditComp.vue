<script>
import AbstractEventComp from '@/components/AbstractEventComp.vue'
export default {
  name: 'EditComp',
  extends: AbstractEventComp,
  data: () => ({
    mask: null
  }),
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
    :rules="[check_no_empty, check_size, check_mask]"
    @focusout="actionPerformed"
  />
</template>

<style>
.edit {
  min-width: 100px;
}
div.edit > div.v-input__control > div.v-field > div.v-field__field {
  margin-top: -9px;
}
div.edit > div.v-input__control > div.v-field > div.v-field__field > .v-label {
  margin-left: 5px;
}
div.edit > div.v-input__control > div.v-field > div.v-field__field > .v-field__input {
  margin-top: -1px;
  margin-bottom: -6px;
}

div.edit > div.v-input__details {
  min-height: auto;
  padding-top: 0px;
}
</style>
