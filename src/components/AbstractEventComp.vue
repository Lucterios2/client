<script>
import AbstractComp from '@/components/AbstractComp.vue'
import { CLOSE_YES, singleton } from '@/libs/utils'
import { convert_action } from '@/libs/convert'
export default {
  name: 'AbstractEventComp',
  extends: AbstractComp,
  components: { AbstractComp },
  data: () => ({
    forceRecompute: 0,
    current_value: '',
    script_function: null,
    owner: null,
    is_disabled: false
  }),
  computed: {
    is_empty() {
      return this.getValue() === ''
    },
    check() {
      return [this.check_no_empty]
    }
  },
  methods: {
    is_valid() {
      var result = true
      if (this.getVisible() && this.getEnabled()) {
        this.check.forEach((fct) => {
          const val = fct()
          if (result === true && typeof val === 'string') {
            result = val
          }
        })
      }
      return result
    },
    check_no_empty() {
      if (this.component.needed) {
        let is_no_empty = !this.is_empty || this.$t('This field is needed!')
        return is_no_empty
      }
      return true
    },
    getInitialValue() {
      return this.value
    },
    getValue() {
      return this.current_value
    },
    setValueEx(params) {
      if (params != null && typeof params === 'object') {
        this.current_value = params.value
        Object.keys(params).forEach((key) => {
          if (this.component[key]) {
            this.component[key] = params[key]
            this.forceRecompute++
          }
        })
      } else {
        this.current_value = params
      }
    },
    setValue(params) {
      this.setValueEx(params)
      this.checkvalidate()
      this.$forceUpdate()
    },
    setEnabled(is_enabled) {
      this.is_disabled = !is_enabled
      this.$forceUpdate()
    },
    getEnabled() {
      return !this.is_disabled
    },
    setVisible(is_visible) {
      if (this.$el !== undefined) {
        this.$el.style.display = is_visible ? null : 'none'
        this.$el.style.fontSize = is_visible ? null : '0px'
      }
    },
    getVisible() {
      if (this.$el !== undefined && this.$el.style !== undefined) {
        return this.$el.style.display !== 'none'
      }
      return true
    },
    setOwner(owner) {
      this.owner = owner
      this.scriptPerformed()
    },
    add_parameters(params) {
      if (this.getInitialValue() != null) {
        params[this.component.name] = this.getValue(true)
      }
    },
    scriptPerformed() {
      if (this.script_function && this.owner) {
        this.script_function(this, this.owner, singleton)
      }
    },
    actionPerformed() {
      if (this.component.action) {
        var new_action = convert_action(this.component.action)
        this.add_parameters(new_action.params)
        this.$emit('action', new_action, false)
        if (Number(new_action.close) === CLOSE_YES) {
          this.$nextTick(() => {
            this.$emit('close', new_action.id == '')
          })
        }
      }
    },
    runIfChange() {
      if (this.getInitialValue() != this.getValue(true)) {
        this.scriptPerformed()
        this.actionPerformed()
      }
    },
    onPressEnter() {
      this.$emit('action', null, false)
    }
  },
  mounted() {
    this.setValue(this.value)
    if (typeof this.component.javascript === 'string' && this.component.javascript !== '') {
      this.script_function = new Function(
        'current',
        'parent',
        'Singleton',
        this.component.javascript
      )
      this.scriptPerformed()
    }
  }
}
</script>
