<script>
import { refreshAction } from '@/libs/utils'

export default {
  name: 'AbstractObserver',
  data: () => ({
    forceRecompute: 0
  }),
  props: {
    context: Object,
    actions: Array,
    close: Object,
    data: [Object, String],
    meta: Object // {extension: String, title: String, action: String, observer: String}
  },
  emits: ['clickaction', 'close'],
  methods: {
    click_action(action) {
      if (action.params === undefined) {
        action.params = {}
      }
      action.params = Object.assign({}, this.context, action.params)
      this.$emit('clickaction', action)
    },
    updateObserver() {
      this.$forceUpdate()
      this.forceRecompute++
    },
    refreshObserver() {
      this.$emit('clickaction', refreshAction(this.meta))
    }
  }
}
</script>

<style scoped />
