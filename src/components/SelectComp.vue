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
      return this.component.case.map((case_item) => {
        return { value: case_item[0], title: case_item[1] }
      })
    }
  }
}
</script>

<template>
  <v-select
    v-model="current_value"
    :label="component.description"
    :items="items"
    item-title="title"
    item-value="value"
    :disabled="is_disabled"
    single-line
    @update:modelValue="runIfChange"
    @keyup.enter="onPressEnter"
  />
</template>

<style></style>
