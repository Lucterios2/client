<script>
import AbstractObserver from '@/observers/AbstractObserver.vue'
export default {
  name: 'AcknowledgeReturn',
  extends: AbstractObserver,
  props: {
    action: Object
  },
  mounted() {
    if (this.action) {
      this.click_action(this.action)
    }
    if (this.close) {
      this.click_action(this.close)
    }
    this.$emit('close')
  }
}
</script>

<template>
  <div />
</template>

<style scoped></style>
