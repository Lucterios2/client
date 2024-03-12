<script>
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
    refreshObserver() {
      this.$forceUpdate()
      this.forceRecompute++
    }
  }
}
</script>

<style scoped />
