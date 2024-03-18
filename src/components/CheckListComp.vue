<script>
import AbstractEventComp from '@/components/AbstractEventComp.vue'
export default {
  name: 'CheckListComp',
  extends: AbstractEventComp,
  components: { AbstractEventComp },
  data: () => ({
    left_data: [],
    right_data: []
  }),
  computed: {
    all_select() {
      if (this.current_value) {
        return this.component.case.map((item) => {
          return {
            value: item[0],
            title: item[1],
            selected: this.current_value.indexOf(item[0]) != -1
          }
        })
      } else {
        return []
      }
    },
    left_select() {
      return this.all_select.filter((item) => Number(this.component.simple) != 2 || !item.selected)
    },
    right_select() {
      return this.all_select.filter((item) => item.selected)
    }
  },
  methods: {
    setValue(params) {
      if (Array.isArray(params)) {
        this.current_value = params
      } else if (typeof params == 'object') {
        this.current_value = params.value
      } else {
        this.current_value = params
      }
      this.$forceUpdate()
    },

    addall() {
      this.current_value = this.all_select.map((item) => item.value)
      this.runIfChange()
    },
    addone() {
      this.left_data.forEach((val) => {
        this.current_value.push(val)
      })
      this.runIfChange()
    },
    delone() {
      this.right_data.forEach((val) => {
        const index = this.current_value.indexOf(val)
        if (index > -1) {
          this.current_value.splice(index, 1)
        }
      })
      this.runIfChange()
    },
    delall() {
      this.current_value = []
      this.runIfChange()
    },
    onleftChange: function (event) {
      var selected_items = []
      for (var idxopt = 0; idxopt < event.target.options.length; idxopt++) {
        selected_items.push(event.target.options[idxopt])
      }
      if (Number(this.component.simple) == 2) {
        this.left_data = selected_items.filter((opt) => opt.selected).map((opt) => opt.value)
      } else {
        this.current_value = selected_items.filter((opt) => opt.selected).map((opt) => opt.value)
      }
    },
    onrightChange: function (event) {
      var selected_items = []
      for (var idxopt = 0; idxopt < event.target.options.length; idxopt++) {
        selected_items.push(event.target.options[idxopt])
      }
      this.right_data = selected_items.filter((opt) => opt.selected).map((opt) => opt.value)
    }
  }
}
</script>

<template>
  <AbstractEventComp class="checklist" :value="value" :component="component">
    <v-row>
      <v-col :cols="Number(component.simple) ? 5 : 12">
        <select multiple @change="onleftChange($event)" @focusout="runIfChange">
          <option
            :value="item.value"
            :selected="item.selected"
            :key="idx"
            v-for="(item, idx) in left_select"
          >
            {{ item.title }}
          </option>
        </select>
      </v-col>
      <v-col cols="2" v-if="Number(component.simple) == 2" style="padding-bottom: 20px">
        <v-btn size="x-small" icon="mdi mdi-chevron-double-right" @click="addall"></v-btn>
        <v-btn size="x-small" icon="mdi mdi-chevron-right" @click="addone"></v-btn>
        <v-btn size="x-small" icon="mdi mdi-chevron-left" @click="delone"></v-btn>
        <v-btn size="x-small" icon="mdi mdi-chevron-double-left" @click="delall"></v-btn>
      </v-col>
      <v-col cols="5" v-if="Number(component.simple) == 2">
        <select multiple @change="onrightChange($event)">
          <option :value="item.value" :key="idx" v-for="(item, idx) in right_select">
            {{ item.title }}
          </option>
        </select>
      </v-col>
    </v-row>
  </AbstractEventComp>
</template>

<style scoped>
.checklist {
  border-bottom: 1px solid grey;
  background-color: #eee;
}
.checklist > .v-field_abstract > .row > .col > select {
  width: 95%;
  max-height: 200px;
  vertical-align: middle;
}
</style>
