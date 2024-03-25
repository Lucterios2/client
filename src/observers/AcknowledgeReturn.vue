<script>
import { runErrorCaptured } from '@/libs/error'
import AbstractObserver from '@/observers/AbstractObserver.vue'
export default {
  name: 'AcknowledgeReturn',
  extends: AbstractObserver,
  errorCaptured: runErrorCaptured,
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
    if (this.action) {
      var refreshIntervalId1 = setInterval(() => {
        this.click_action(this.action, true)
        this.call_close()
        clearInterval(refreshIntervalId1)
      }, 100)
    } else {
      this.call_close()
    }
  }
}
</script>

<template>
  <div />
</template>

<style scoped></style>
