<script>
import AbstractEventComp from '@/components/AbstractEventComp.vue'
import ButtonAction from '@/libs/ButtonAction.vue'
import { convert_action, Stringformat } from '@/libs/convert'
import { refreshAction } from '@/libs/utils'

const OP_NULL = [0, '---']
const OP_EQUAL = [1, 'equals']
const OP_DIFFERENT = [2, 'different']
const OP_LESS = [3, 'inferior']
const OP_MORE = [4, 'superior']
const OP_CONTAINS = [5, 'contains']
const OP_STARTBY = [6, 'starts with']
const OP_ENDBY = [7, 'ends with']
const OP_OR = [8, 'or']
const OP_AND = [9, 'and']
const OP_LIST = [
  OP_NULL,
  OP_EQUAL,
  OP_DIFFERENT,
  OP_LESS,
  OP_MORE,
  OP_CONTAINS,
  OP_STARTBY,
  OP_ENDBY,
  OP_OR,
  OP_AND
]

const LIST_OP_BY_TYPE = {
  null: [OP_NULL],
  float: [OP_EQUAL, OP_DIFFERENT, OP_LESS, OP_MORE],
  str: [OP_CONTAINS, OP_EQUAL, OP_DIFFERENT, OP_STARTBY, OP_ENDBY],
  bool: [OP_EQUAL],
  date: [OP_EQUAL, OP_DIFFERENT, OP_LESS, OP_MORE],
  time: [OP_EQUAL, OP_DIFFERENT, OP_LESS, OP_MORE],
  datetime: [OP_EQUAL, OP_DIFFERENT, OP_LESS, OP_MORE],
  list: [OP_OR],
  listmult: [OP_OR, OP_AND]
}

export default {
  name: 'SearchComp',
  extends: AbstractEventComp,
  components: { AbstractEventComp, ButtonAction },
  data: () => ({
    current_name: '',
    current_type: null,
    current_operation: null,
    current_data: '',
    criteria_index: undefined
  }),
  computed: {
    check() {
      return []
    },
    current_selector() {
      const select_filter = this.component.selectors.filter(
        (selector) => selector.name == this.current_name
      )
      if (select_filter.length == 1) {
        return select_filter[0]
      } else {
        return { name: '', description: '', type: 'null', extra: [] }
      }
    },
    operators() {
      return LIST_OP_BY_TYPE[this.current_type]
    },
    add_action() {
      const addact = refreshAction(this.meta)
      addact.text = 'add'
      addact.short_icon = 'mdi:mdi-pencil-plus-outline'
      return addact
    },
    del_action() {
      const addact = refreshAction(this.meta)
      addact.text = 'delete'
      addact.short_icon = 'mdi:mdi-delete-outline'
      return addact
    }
  },
  methods: {
    setValueEx(params) {
      this.current_value = params
    },
    getReturnData() {
      if (this.current_type == 'list' || this.current_type == 'listmult') {
        return this.current_data.join(';')
      } else if (this.current_type == 'date') {
        return this.current_data.date
      } else if (this.current_type == 'time') {
        return this.current_data.time
      } else if (this.current_type == 'datetime') {
        return this.current_data.date + ' ' + this.current_data.time
      } else {
        return this.current_data
      }
    },
    getValue(final_return) {
      if (final_return) {
        const new_value = this.current_value.map((item) => item.slice())
        if (this.criteria_index == undefined) {
          if (this.current_operation == OP_NULL[0]) {
            return this.current_value
          }
          const same_item = new_value.filter((item) => {
            return item[0] == this.current_name && item[1] == this.current_operation
          })
          if (same_item.length == 1) {
            if (typeof same_item[0][2] === 'string') {
              same_item[0][2] = [same_item[0][2]]
            }
            same_item[0][2].push(this.getReturnData())
          } else {
            new_value.push([this.current_name, this.current_operation, this.getReturnData()])
          }
        } else {
          new_value.splice(this.criteria_index, 1)
        }
        return JSON.stringify(
          new_value.map((item) => [
            item[0],
            item[1],
            Array.isArray(item[2]) ? item[2].join(';') : item[2]
          ])
        )
      } else {
        return this.current_value
      }
    },
    change_name() {
      this.current_type = this.current_selector.type
      this.current_operation = this.operators[0][0]
      if (this.current_type == 'str') {
        this.current_data = ''
      }
      if (this.current_type == 'float') {
        this.current_data = this.current_selector.extra[0]
      }
      if (this.current_type == 'boolean') {
        this.current_data = false
      }
      if (
        this.current_type == 'date' ||
        this.current_type == 'time' ||
        this.current_type == 'datetime'
      ) {
        this.current_data = { date: '2000-01-01', time: '00:00' }
      }
      if (this.current_type == 'list' || this.current_type == 'listmult') {
        this.current_data = []
      }
    },
    onSelectChange: function (event) {
      var selected_items = []
      for (var idxopt = 0; idxopt < event.target.options.length; idxopt++) {
        selected_items.push(event.target.options[idxopt])
      }
      this.current_data = selected_items.filter((opt) => opt.selected).map((opt) => opt.value)
    },
    add_parameters() {},
    actionPerformed(action, crit_index) {
      this.criteria_index = crit_index
      var new_action = convert_action(action, true)
      new_action.params[this.component.name] = this.getValue(true)
      this.$emit('action', new_action, false)
    },
    onPressEnter(event) {
      if (!event.ctrlKey && !event.shiftKey) {
        this.actionPerformed(this.add_action)
      }
    },
    get_show_value(selector, value, operation) {
      const sep_for_list = Stringformat(' {0} ', [
        this.$t(OP_LIST[operation != OP_DIFFERENT[0] ? 8 : 9][1])
      ])
      if (selector.type == 'str') {
        return Stringformat('"{0}"', [
          typeof value === 'string'
            ? value
            : value.map((el) => Stringformat('"{0}"', [el])).join(sep_for_list)
        ])
      } else if (selector.type == 'bool') {
        if (value == 'o' || value == true) {
          return this.$t('Yes')
        } else {
          return this.$t('No')
        }
      } else if (selector.type == 'date') {
        return typeof value === 'string' ? value : value.join(sep_for_list)
      } else if (selector.type == 'datetime') {
        return typeof value === 'string' ? value : value.join(sep_for_list)
      } else if (selector.type == 'list' || selector.type == 'listmult') {
        const ids = typeof value === 'string' ? value.split(';') : value
        return selector.extra
          .filter((new_item) => ids.includes(new_item[0]))
          .map((new_item) => {
            return Stringformat('"{0}"', [new_item[1]])
          })
          .join(Stringformat(' {0} ', [this.$t(OP_LIST[operation][1])]))
      } else {
        return typeof value === 'string' ? value : value.join(sep_for_list)
      }
    },
    show_item(item) {
      const select_filter = this.component.selectors.filter((selector) => selector.name == item[0])
      if (select_filter.length == 1) {
        const selected_item = select_filter[0]
        var sep_criteria
        if (selected_item.name == 'id') {
          return Stringformat(this.$t('{0} items'), [selected_item.extra.length])
        }
        const new_val_txt = this.get_show_value(selected_item, item[2], item[1])
        if (selected_item.type == 'list' || selected_item.type == 'listmult') {
          sep_criteria = OP_EQUAL[1]
        } else {
          sep_criteria = OP_LIST[item[1]][1]
        }
        return Stringformat('<b>{0}</b> {1} <i>{2}</i>', [
          select_filter[0].description,
          this.$t(sep_criteria),
          new_val_txt
        ])
      } else {
        return item
      }
    }
  },
  mounted() {
    this.setValue(this.value)
    this.current_name = this.component.selectors.length > 0 ? this.component.selectors[0].name : ''
    this.change_name()
  }
}
</script>

<template>
  <AbstractEventComp :value="value" :component="component">
    <v-row class="search_select">
      <v-col cols="5">
        <select class="checklist search_name" v-model="current_name" @change="change_name">
          <option
            :value="selector.name"
            :key="selector.name"
            v-for="selector in component.selectors"
          >
            {{ selector.description }}
          </option>
        </select>
      </v-col>
      <v-col cols="2">
        <select class="checklist search_operation" v-model="current_operation">
          <option :value="operator[0]" :key="operator[0]" v-for="operator in operators">
            {{ $t(operator[1]) }}
          </option>
        </select>
      </v-col>
      <v-col cols="4">
        <v-text-field
          v-if="current_type == 'str'"
          class="edit"
          v-model="current_data"
          @keyup.enter="onPressEnter"
        />

        <v-text-field
          v-if="current_type == 'float'"
          class="edit"
          type="number"
          v-model="current_data"
          :min="this.current_selector.extra[0]"
          :max="this.current_selector.extra[1]"
          :step="this.current_selector.extra[1]"
          @keyup.enter="onPressEnter"
        />

        <v-checkbox
          v-if="current_type == 'bool'"
          v-model="current_data"
          @keyup.enter="actionPerformed"
        />

        <v-text-field
          v-if="current_type == 'date' || current_type == 'datetime'"
          class="edit"
          type="date"
          v-model="current_data.date"
          @keyup.enter="onPressEnter"
        />

        <v-text-field
          v-if="current_type == 'time' || current_type == 'datetime'"
          class="edit"
          type="time"
          v-model="current_data.time"
          @keyup.enter="onPressEnter"
        />

        <select
          class="checklist search_list"
          v-if="current_type == 'list' || current_type == 'listmult'"
          multiple
          @change="onSelectChange($event)"
          @keyup.enter="onPressEnter"
        >
          <option
            :value="item[0]"
            :selected="current_data.includes(item[0])"
            :key="idx"
            v-for="(item, idx) in this.current_selector.extra"
          >
            {{ item[1] }}
          </option>
        </select>
      </v-col>
      <v-col cols="1">
        <ButtonAction
          class="button"
          :action="add_action"
          :is_mini="true"
          @click="actionPerformed"
        />
      </v-col>
    </v-row>
    <v-row class="search_result">
      <v-col cols="12" v-if="this.current_value.length == 0">
        <label
          ><b
            ><u>{{ $t('No criteria of search') }}</u></b
          ></label
        >
      </v-col>
      <v-col class="search_title" cols="6" v-if="this.current_value.length != 0">
        <label
          ><b
            ><u>{{ $t('Your criteria of search') }}</u></b
          ></label
        >
      </v-col>
      <v-col cols="5" v-if="this.current_value.length != 0">
        <v-row
          class="search_result"
          :key="crit_index"
          v-for="(item, crit_index) in this.current_value"
        >
          <v-col cols="11">
            <label v-html="show_item(item)" />
          </v-col>
          <v-col cols="1">
            <ButtonAction
              class="button"
              :action="del_action"
              :is_mini="true"
              @click="actionPerformed(del_action, crit_index)"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </AbstractEventComp>
</template>

<style>
.search_select > div.v-col {
  margin-bottom: -20px;
}
.search_name {
  width: 100%;
  margin: 5px;
  padding-left: 5px;
  padding-right: 5px;
  height: 25px;
}
.search_operation {
  width: 100%;
  margin: 5px;
  padding-left: 5px;
  padding-right: 5px;
  height: 25px;
}
.search_list {
  max-height: 75px;
  width: 100%;
}
.search_result {
  margin-top: 0px;
  margin-bottom: 0px;
}

.search_title {
  align-items: center;
  display: flex;
}

.search_result > div {
  margin-top: -12px;
  margin-bottom: -12px;
}

.search_result > div > label {
  text-align: center;
  width: 100%;
  display: block;
}
</style>
