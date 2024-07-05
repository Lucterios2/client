<script>
import AbstractEventComp from '@/components/AbstractEventComp.vue'
export default {
  name: 'SelectComp',
  extends: AbstractEventComp,
  components: { AbstractEventComp },
  computed: {
    check() {
      return []
    },
    items() {
      this.forceRecompute
      return this.component.case.map((case_item) => {
        return {
          value: case_item[0],
          title: case_item[1] == null ? '---' : case_item[1]
        }
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
  <AbstractEventComp class="checklist" :value="value" :component="component">
    <select
      v-model="current_value"
      ref="tofocus"
      :name="component.name"
      :key="forceRecompute"
      @focusin="savefocusin"
      @change="runIfChange"
      @keyup.enter="onPressEnter"
    >
      <option :value="item.value" :key="item.value" v-for="item in items">{{ item.title }}</option>
    </select>
  </AbstractEventComp>
</template>
