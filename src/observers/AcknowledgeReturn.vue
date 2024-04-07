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
      this.$nextTick(() => {
        if (this.close) {
          this.click_action(this.close, true)
          this.onClose(this.action == null)
        } else {
          this.onClose(this.action == null)
        }
      })
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
