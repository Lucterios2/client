<script>
import { CLOSE_NO, FORMTYPE_REFRESH, SELECT_NONE } from '@/libs/utils'

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
      action.params = Object.assign({}, action.params, this.context)
      this.$emit('clickaction', action)
    },
    updateObserver() {
      this.$forceUpdate()
      this.forceRecompute++
    },
    refreshObserver() {
      this.$emit('clickaction', {
        id: this.meta.id || this.meta.extension + '/' + this.meta.action,
        extension: this.meta.extension,
        action: this.meta.action,
        modal: FORMTYPE_REFRESH,
        close: CLOSE_NO,
        unique: SELECT_NONE,
        method: this.meta.method,
        params: this.gridcontext
      })
    }
  }
}
</script>

<style scoped />
