<script>
import AbstractEventComp from '@/components/AbstractEventComp.vue'

export default {
  name: 'StepComp',
  extends: AbstractEventComp,
  components: { AbstractEventComp },
  computed: {
    check() {
      return []
    }
  },
  methods: {
    getInitialValue() {
      return parseInt(this.value)
    },
    setValue(params) {
      this.setValueEx(params)
      this.current_value = parseInt(this.current_value)
      if (isNaN(this.current_value)) {
        this.current_value = parseInt(this.value.toString())
      }
      this.current_value = Math.min(this.component.max, Math.max(1, this.current_value))
      console.log('setValue', params, this.current_value)
      this.$forceUpdate()
    },
    prevact() {
      this.current_value = Math.max(1, this.current_value - 1)
      this.actionPerformed()
    },
    nextact() {
      this.current_value = Math.min(this.component.max, this.current_value + 1)
      this.actionPerformed()
    }
  }
}
</script>

<template>
  <AbstractEventComp :value="value" :component="component">
    <v-btn
      class="step_btn"
      prepend-icon="mdi mdi-chevron-left"
      :disabled="current_value == 1"
      @click="prevact"
    >
      {{ $t('last') }}</v-btn
    >
    <v-rating
      v-model="current_value"
      empty-icon="mdi-square-outline"
      full-icon="mdi-square"
      readonly
      :length="component.max"
      :key="forceRecompute"
      :name="component.name"
    />
    <v-btn
      class="step_btn"
      append-icon="mdi mdi-chevron-right"
      :disabled="current_value == component.max"
      @click="nextact"
      >{{ $t('next') }}</v-btn
    >
  </AbstractEventComp>
</template>

<style></style>
