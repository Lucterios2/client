<script>
import AbstractEventComp from '@/components/AbstractEventComp.vue'
export default {
  name: 'SelectComp',
  extends: AbstractEventComp,
  computed: {
    check() {
      return []
    },
    items() {
      this.forceRecompute
      return this.component.case.map((case_item) => {
        return { value: case_item[0], title: case_item[1] }
      })
    }
  },
  methods: {
    setValueEx(params) {
      AbstractEventComp.methods.setValueEx.call(this, params)
      if (
        this.component.case &&
        this.component.case.length > 0 &&
        this.component.case.map((case_item) => case_item[0]).indexOf(this.current_value) === -1
      ) {
        this.current_value = this.component.case[0][0]
      }
    }
  }
}
</script>

<template>
  <v-select
    v-model="current_value"
    ref="tofocus"
    :label="component.description"
    :items="items"
    item-title="title"
    item-value="value"
    :disabled="is_disabled"
    :key="forceRecompute"
    :style="style_size"
    :no-data-text="$t('No data available')"
    single-line
    @focusin="savefocusin"
    @update:modelValue="runIfChange"
    @keyup.enter="onPressEnter"
  />
</template>
