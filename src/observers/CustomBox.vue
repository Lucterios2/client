<script>
import AbstractObserver from '@/observers/AbstractObserver.vue'
import FrameDlg from '@/libs/FrameDlg.vue'
import CustomComponents from '@/components/CustomComponents.vue'
import { convert_action } from '@/libs/convert'

export default {
  name: 'CustomBox',
  extends: AbstractObserver,
  components: { FrameDlg, CustomComponents },
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
    click_action(action, no_owner, action_close) {
      if (action_close === undefined) {
        action_close = this.close ? this.close : null
      }
      this.$options.FrameInterface.save_dlg()
      if (action === null) {
        this.actions.forEach((act) => {
          if (action === null && act.id !== '') {
            action = act
          }
        })
        if (action != null) {
          return this.click_action_in_customcomponents(action, no_owner, action_close)
        }
        return false
      } else {
        this.currentinfo = this.$options.childInterface.get_info()
        this.$store.commit('save_observer_info', { observerId: this.id, info: this.currentinfo })
        return AbstractObserver.methods.click_action.call(this, action, no_owner, action_close)
      }
    },
    updateObserver() {
      this.$forceUpdate()
      this.forceRecompute++
      this.$nextTick(() => {
        this.$options.FrameInterface.load_dlg()
      })
    },
    click_action_in_customcomponents(action, no_owner, action_close) {
      return this.$options.childInterface.call_action(action, no_owner, action_close)
    },
    getChildInterface(childInterface) {
      this.$options.childInterface = childInterface
    },
    getFrameInterface(FrameInterface) {
      this.$options.FrameInterface = FrameInterface
    }
  },
  mounted() {
    this.currentinfo = this.$store.state.observer_info[this.id]
  }
}
</script>

<template>
  <FrameDlg
    :id="id"
    :meta="meta"
    :actions="actions"
    :close="close_act"
    :key="forceRecompute"
    @action="click_action_in_customcomponents"
    @interface="getFrameInterface"
  >
    <CustomComponents
      :data="data"
      :comp="comp"
      :meta="meta"
      :context="context"
      :initialInfo="currentinfo"
      @action="click_action"
      @interface="getChildInterface"
      :key="forceRecompute"
    />
  </FrameDlg>
</template>
