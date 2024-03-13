<script>
import AbstractComp from '@/components/AbstractComp.vue'
export default {
  name: 'AbstractEventComp',
  extends: AbstractComp,
  components: { AbstractComp },
  data: () => ({
    current_value: ''
  }),
  computed: {
    is_empty() {
      return this.get_value() == ''
    },
    check() {
      return [this.check_no_empty]
    }
  },
  methods: {
    is_valid() {
      var result = true
      this.check.forEach((fct) => {
        const val = fct()
        if (result == true && typeof val == 'string') {
          result = val
        }
      })
      return result
    },
    check_no_empty() {
      if (this.component.needed) {
        let is_no_empty = !this.is_empty || this.$t('This field is needed!')
        return is_no_empty
      }
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
