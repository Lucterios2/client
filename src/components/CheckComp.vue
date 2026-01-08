<script>
import AbstractEventComp from '@/components/AbstractEventComp.vue'
export default {
  name: 'CheckComp',
  extends: AbstractEventComp,
  computed: {
    check() {
      return []
    }
  },
  methods: {
    getValue(final_return) {
      var return_value = this.current_value
      if (final_return) {
        if (return_value) {
          return_value = 'o'
        } else {
          return_value = 'n'
        }
      }
      return return_value
    },
    setValue(params) {
      this.setValueEx(params)
      this.current_value =
        ['1', 'o', 'y', 't'].indexOf(this.current_value.toString().toLowerCase().charAt(0)) >= 0
      this.$forceUpdate()
    }
  }
}
</script>

<template>
  <v-checkbox
    v-model="current_value"
    :name="component.name"
    ref="tofocus"
    :disabled="is_disabled"
    @focusin="savefocusin"
    @change="runIfChange"
    @keyup.enter="onPressEnter"
  >
    <template v-slot:label>
      <span ref="tofocus" v-html="description_formated"></span>
    </template>
  </v-checkbox>
</template>

<style></style>
