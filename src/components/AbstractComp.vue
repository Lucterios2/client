<script>
import { convertLuctoriosFormatToHtml, formatToString, Stringformat } from '@/libs/convert'
export default {
  name: 'AbstractComp',
  props: {
    id: String,
    context: Object,
    value: [String, Number, Array, Boolean],
    component: Object,
    meta: Object
  },
  emits: ['action', 'focusin'],
  methods: {
    get_component() {
      return this.component
    },
    is_valid() {
      return true
    },
    getValue() {
      return null
    },
    savefocusin() {
      this.$emit('focusin', this.component.name)
    },
    setfocus() {
      this.$nextTick(() => {
        if (this.$refs.tofocus && this.$refs.tofocus.focus) {
          try {
            const editRef = this.$refs.tofocus
            editRef.focus()
          } catch (err) {
            console.log('setfocus', this.component.name, err)
          }
        }
      })
    },
    checkvalidate() {
      if (this.$refs.tofocus && this.$refs.tofocus.validate) {
        this.$refs.tofocus.validate()
      }
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
    },
    style_size() {
      var style_txt = ''
      if (this.component.VMin) {
        style_txt = style_txt + Stringformat('min-height:{0}px;', [this.component.VMin])
      }
      if (this.component.HMin) {
        style_txt = style_txt + Stringformat('min-width:{0}px;', [this.component.HMin])
      }
      return style_txt
    }
  }
}
</script>

<template>
  <div :name="component.name">
    <label class="v-label" v-if="component.description">{{ component.description }}</label>
    <div class="v-field_abstract" :name="component.name" :style="style_size">
      <slot />
    </div>
  </div>
</template>

<style>
.edit {
  min-width: 200px;
}

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

.v-select > div.v-input__control > div.v-field > div.v-field__field > .v-label.v-field-label {
  visibility: visible;
  margin-top: -10px;
}
.v-select > div.v-input__control > div.v-field > div.v-field__field > .v-field__input {
  top: 10px;
}
.v-textarea > div.v-input__control > div.v-field > div.v-field__field > .v-field__input {
  margin-bottom: 0px;
}

.checklist {
  border-bottom: 1px solid grey;
  background-color: #eee;
}
.checklist > div.v-field_abstract > .v-row {
  min-height: 100px;
}
.checklist > div.v-field_abstract > .v-row > .v-col > select {
  width: 98%;
  height: 98%;
  vertical-align: middle;
  overflow-x: scroll;
}

.v-checkbox.v-input {
  height: 25px;
  margin-bottom: 15px;
  margin-top: -10px;
}
</style>
