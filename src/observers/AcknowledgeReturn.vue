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
      var refreshIntervalId1 = setInterval(() => {
        this.click_action(this.action)
        clearInterval(refreshIntervalId1)
      }, 100)
    }
    if (this.close) {
      var refreshIntervalId2 = setInterval(() => {
        this.click_action(this.close)
        clearInterval(refreshIntervalId2)
      }, 100)
    }
    this.$emit('close')
  }
}
</script>

<template>
  <div />
</template>

<style scoped></style>
