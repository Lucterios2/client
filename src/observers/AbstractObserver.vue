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
  emits: ['clickaction', 'close'],
  methods: {
    onClose(refresh_parent) {
      this.$emit('close', refresh_parent)
    },
    click_action(action, no_owner) {
      if (action.params === undefined) {
        action.params = {}
      }
      action.params = Object.assign({}, this.context, action.params)
      this.$emit('clickaction', action, no_owner)
    },
    updateObserver() {
      this.$forceUpdate()
      this.forceRecompute++
    },
    refreshObserver() {
      this.$emit('clickaction', refreshAction(this.meta, this.context))
    },
    clean_observer() {
      this.$store.commit('clean_observer', this.id)
    }
  }
}
</script>

<style scoped />
