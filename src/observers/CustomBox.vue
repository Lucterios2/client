<script>
import AbstractObserver from '@/observers/AbstractObserver.vue'
import FrameDlg from '@/libs/FrameDlg.vue'
import CustomComponents from '@/components/CustomComponents.vue'

export default {
  name: 'CustomBox',
  extends: AbstractObserver,
  components: { FrameDlg, CustomComponents },
  props: {
    data: Object,
    comp: Array
  },
  methods: {
    click_action(action) {
      if (action == null) {
        this.actions.forEach((act) => {
          if (action == null && act.id !== '') {
            action = act
          }
        })
        if (action != null) {
          this.click_action_in_customcomponents(action)
        }
      } else {
        AbstractObserver.methods.click_action.call(this, action)
      }
    },
    click_action_in_customcomponents(action) {
      this.$options.childInterface.call_action(action)
    },
    getChildInterface(childInterface) {
      this.$options.childInterface = childInterface
    }
  }
}
</script>

<template>
  <FrameDlg
    :meta="meta"
    :actions="actions"
    :close="close"
    :key="forceRecompute"
    @action="click_action_in_customcomponents"
    @close="$emit('close')"
  >
    <CustomComponents
      :data="data"
      :comp="comp"
      :meta="meta"
      :context="context"
      @action="click_action"
      @close="$emit('close')"
      @interface="getChildInterface"
      :key="forceRecompute"
    />
  </FrameDlg>
</template>
