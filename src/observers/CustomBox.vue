<script>
import AbstractObserver from '@/observers/AbstractObserver.vue'
import FrameDlg from '@/libs/FrameDlg.vue'
import CustomComponents from '@/components/CustomComponents.vue'
import { convert_action } from '@/libs/convert'
import { runErrorCaptured } from '@/libs/error'

export default {
  name: 'CustomBox',
  extends: AbstractObserver,
  components: { FrameDlg, CustomComponents },
  errorCaptured: runErrorCaptured,
  data: () => ({
    currentinfo: null
  }),
  props: {
    data: Object,
    comp: Array
  },
  computed: {
    close_act() {
      return this.close ? convert_action(this.close, true) : null
    }
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
        this.currentinfo = this.$options.childInterface.get_info()
        this.$store.commit('save_observer_info', this.id, this.currentinfo)
        AbstractObserver.methods.click_action.call(this, action)
      }
    },
    click_action_in_customcomponents(action) {
      this.$options.childInterface.call_action(action)
    },
    getChildInterface(childInterface) {
      this.$options.childInterface = childInterface
    }
  },
  mounted() {
    this.currentinfo = this.$store.state.observer_info[this.id]
  }
}
</script>

<template>
  <FrameDlg
    :meta="meta"
    :actions="actions"
    :close="close_act"
    :key="forceRecompute"
    @action="click_action_in_customcomponents"
    @close="$emit('close')"
  >
    <CustomComponents
      :data="data"
      :comp="comp"
      :meta="meta"
      :context="context"
      :initialInfo="currentinfo"
      @action="click_action"
      @close="$emit('close')"
      @interface="getChildInterface"
      :key="forceRecompute"
    />
  </FrameDlg>
</template>
