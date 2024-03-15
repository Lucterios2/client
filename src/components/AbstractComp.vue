<script>
import { convertLuctoriosFormatToHtml, formatToString } from '@/libs/utils'
export default {
  name: 'AbstractComp',
  props: {
    value: [String, Number, Array, Boolean],
    component: Object,
    meta: Object
  },
  emits: ['action', 'close'],
  methods: {
    is_valid() {
      return true
    },
    getValue() {
      return null
    },
    setValue() {},
    setEnabled() {},
    setVisible() {},
    setOwner() {},
    add_parameters() {}
  },
  computed: {
    value_formated() {
      const formatstr = this.component.formatstr || '{0}'
      const int_label = formatToString(
        this.value,
        this.component.formatnum || '',
        formatstr.replaceAll('%s', '{0}')
      )
      return convertLuctoriosFormatToHtml(int_label)
    }
  }
}
</script>

<template>
  <div :name="component.name">
    <label class="v-label" v-if="component.description">{{ component.description }}</label>
    <div class="v-field_abstract">
      <slot />
    </div>
  </div>
</template>

<style>
label.v-label {
  font-size: 13px;
}
div.v-field_abstract {
  padding-left: 15px;
  margin-top: -3px;
}

div.v-input__control > div.v-field > div.v-field__field {
  margin-top: -9px;
}
div.v-input__control > div.v-field > div.v-field__field > .v-label {
  margin-left: 5px;
}
div.v-input__control > div.v-field > div.v-field__field > .v-field__input {
  margin-top: -1px;
  margin-bottom: -6px;
}

div.v-input__details {
  min-height: auto;
  padding-top: 0px;
}
</style>
