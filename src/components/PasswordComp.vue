<script>
import AbstractEventComp from '@/components/AbstractEventComp.vue'
export default {
  name: 'PasswordComp',
  extends: AbstractEventComp,
  data: () => ({
    lowerreg: /^(?=.*[a-z]).+$/,
    upperreg: /^(?=.*[A-Z]).+$/,
    noalphareg: /^(?=.*[0-9_\W]).+$/
  }),
  computed: {
    check() {
      if (Number(this.component.security) == 1) {
        return [this.check_size, this.check_mask]
      } else {
        return []
      }
    }
  },
  methods: {
    check_size() {
      if (!this.component.needed && this.getValue().length == 0) {
        return true
      }
      return this.getValue().length > 6 || this.$t('Password too short!')
    },
    check_mask() {
      if (!this.component.needed && this.getValue().length == 0) {
        return true
      }
      if (
        !this.lowerreg.test(this.getValue()) ||
        !this.upperreg.test(this.getValue()) ||
        !this.noalphareg.test(this.getValue())
      ) {
        return this.$t('Password too simple!')
      }
      return true
    }
  }
}
</script>

<template>
  <v-text-field
    class="edit"
    type="password"
    v-model="current_value"
    :label="component.description"
    :rules="check"
    :disabled="is_disabled"
    :clearable="!component.needed"
    @focusout="runIfChange"
    @keyup.enter="onPressEnter"
  />
</template>
