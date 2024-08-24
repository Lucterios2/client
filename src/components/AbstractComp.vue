<script>
import { convertLuctoriosFormatToHtml, formatToString } from '@/libs/convert'
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
    onResize() {},
    setOwner() {},
    add_parameters() {}
  },
  computed: {
    is_focuseble() {
      return false
    },
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
    <div class="v-field_abstract" :name="component.name">
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
  margin-bottom: 8px;
}
.checklist:focus-within {
  background-color: #d5d5d5;
  border-bottom: 3px solid grey;
}
.checklist:focus-within > label.v-label {
  opacity: unset;
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
.checklist > div.v-field_abstract > select {
  width: 100%;
}
.checklist_btns {
  min-width: 25px;
  background-color: white;
  padding: 0px 3px 20px 3px;
  text-align: center;
  margin-top: 15px;
}
.v-checkbox.v-input {
  height: 25px;
  margin-bottom: 15px;
  margin-top: -10px;
}
.step_btn {
  top: -20px;
  width: 150px;
}

div.v-field_abstract > div.v-rating > div.v-rating__wrapper > div.v-rating__item > label > button {
  width: 30px;
}

</style>
