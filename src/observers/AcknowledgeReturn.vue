<script>
import { CLOSE_YES } from '@/libs/utils'
import AbstractObserver from '@/observers/AbstractObserver.vue'
export default {
  name: 'AcknowledgeReturn',
  extends: AbstractObserver,
  props: {
    action: Object
  },
  mounted() {
    this.$nextTick(() => {
      const current_action = this.action
        ? Object.assign({}, this.action, { close: CLOSE_YES })
        : { id: '', close: CLOSE_YES }
      this.click_action(current_action, false, this.close)
    })
  }
}
</script>

<template>
  <div />
</template>

<style scoped></style>
