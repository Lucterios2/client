<script>
import { refreshAction } from '@/libs/utils'

export default {
  name: 'AbstractObserver',
  data: () => ({
    forceRecompute: 0
  }),
  props: {
    id: String,
    context: Object,
    actions: Array,
    close: Object,
    data: [Object, String],
    meta: Object // {extension: String, title: String, action: String, observer: String}
  },
  emits: ['clickaction'],
  methods: {
    click_action(action, no_owner, action_close) {
      if (action.params === undefined) {
        action.params = {}
      }
      action.params = Object.assign({}, this.context, action.params)
      if (action_close) {
        if (action_close.params === undefined) {
          action_close.params = {}
        }
        action_close.params = Object.assign({}, this.context, action_close.params)
      }
      return this.$emit('clickaction', action, no_owner, action_close)
    },
    updateObserver() {
      this.$forceUpdate()
      this.forceRecompute++
    },
    refreshObserver() {
      return this.$emit('clickaction', refreshAction(this.meta, this.context))
    },
    clean_observer() {
      this.$store.commit('clean_observer', this.id)
    }
  }
}
</script>

<style scoped />
