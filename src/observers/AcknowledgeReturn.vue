<script>
import AbstractObserver from '@/observers/AbstractObserver.vue'
export default {
  name: 'AcknowledgeReturn',
  extends: AbstractObserver,
  props: {
    action: Object
  },
  methods: {
    call_close() {
      if (this.close) {
        var refreshIntervalId2 = setInterval(() => {
          this.click_action(this.close, true)
          this.$emit('close', this.action != null)
          clearInterval(refreshIntervalId2)
        }, 100)
      } else {
        this.$emit('close', this.action != null)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.action) {
        this.click_action(this.action, true)
        this.call_close()
      } else {
        this.call_close()
      }
    })
  }
}
</script>

<template>
  <div />
</template>

<style scoped></style>
