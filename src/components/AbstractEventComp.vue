<script>
import AbstractComp from '@/components/AbstractComp.vue'
export default {
  name: 'AbstractEventComp',
  extends: AbstractComp,
  components: { AbstractComp },
  data: () => ({
    current_value: ''
  }),
  methods: {
    check() {
      return true
    },
    get_value() {
      return this.current_value
    },
    add_parameters(params) {
      params[this.component.name] = this.get_value()
    },
    actionPerformed() {
      if (this.component.action && this.value != this.get_value()) {
        var new_action = this.convert_action(this.component.action)
        this.add_parameters(new_action.params)
        this.$emit('action', new_action)
      }
    }
  },
  mounted() {
    this.current_value = this.value
  }
}
</script>
