<script>
import AbstractComp from '@/components/AbstractComp.vue'
import ButtonsBar from '@/libs/ButtonsBar.vue'
import { SELECT_SINGLE, SELECT_MULTI, SELECT_NONE, refreshAction } from '@/libs/utils'
import {
  Stringformat,
  convertLuctoriosFormatToHtml,
  formatToString,
  convert_action
} from '@/libs/convert'
import { useI18n } from 'vue-i18n'

export default {
  name: 'GridComp',
  extends: AbstractComp,
  components: { AbstractComp, ButtonsBar },
  data: () => ({
    items_per_page_options: [
      { value: 25, title: '25' },
      { value: 50, title: '50' },
      { value: 100, title: '100' },
      { value: 250, title: '250' },
      { value: 500, title: '500' }
    ],
    firstload: true,
    gridcontext: {},
    selectItems: [],
    lastselectid: null,
    i18n: useI18n()
  }),
  computed: {
    buttonMode() {
      const select_list = this.component.actions.map((action_item) => {
        return Number(action_item.unique)
      })
      if (select_list.includes(SELECT_MULTI)) {
        return SELECT_MULTI
      } else if (select_list.includes(SELECT_SINGLE)) {
        return SELECT_SINGLE
      } else {
        return SELECT_NONE
      }
    },
    headers() {
      return this.component.headers.map((header_item) => {
        return {
          title: header_item[1],
          align: 'start',
          sortable: header_item[3] == 1,
          key: header_item[0],
          sort: true
        }
      })
    },
    sortby() {
      const sort_by = []
      const sort_text = this.context && this.context['GRID_ORDER%' + this.component.name]
      if (sort_text) {
        sort_text.split(',').forEach((item) => {
          if (item[0] == '-') {
            sort_by.push({ key: item.substring(1), order: 'asc' })
          } else {
            sort_by.push({ key: item, order: 'desc' })
          }
        })
      }
      return sort_by
    },
    serverItems() {
      var last_color_even = false
      var last_value = null
      return this.value.map((line_item) => {
        if (line_item.__color_ref__ == null || line_item.__color_ref__ != last_value) {
          last_value = line_item.__color_ref__
          last_color_even = !last_color_even
        }
        const new_line = { id: line_item.id, classname: last_color_even ? 'even' : 'odd' }
        this.component.headers.forEach((header_item) => {
          new_line[header_item[0]] = convertLuctoriosFormatToHtml(
            formatToString(
              line_item[header_item[0]],
              header_item[2] || '',
              header_item[4].replace(/%s/g, '{0}')
            )
          )
        })
        return new_line
      })
    },
    page_text() {
      return Stringformat(
        this.i18n
          .t('See %0 to %1 about %2 results')
          .replace('%0', '{0}')
          .replace('%1', '{1}')
          .replace('%2', '{2}'),
        [
          1 + this.component.page_num * this.component.size_by_page,
          Math.min(
            this.component.nb_lines,
            (this.component.page_num + 1) * this.component.size_by_page
          ),
          this.component.nb_lines
        ]
      )
    },
    itemsPerPage: {
      get: function () {
        return this.component.size_by_page
      },
      set: function (newitemsPerPage) {
        this.gridcontext['GRID_PAGE%' + this.component.name] = 0
        this.gridcontext['GRID_SIZE%' + this.component.name] = newitemsPerPage
        this.refresh()
      }
    },
    actions() {
      return this.component.actions.map((action_item) => {
        const unique = Number(action_item.unique)
        action_item.disabled = false
        if (unique == SELECT_SINGLE && this.selectItems.length != 1) {
          action_item.disabled = true
        } else if (unique == SELECT_MULTI && this.selectItems.length == 0) {
          action_item.disabled = true
        }
        action_item.no_check = true
        return action_item
      })
    }
  },
  methods: {
    indexOfValue(rowid) {
      var row_index = null
      this.value.forEach((item, item_index) => {
        if (item.id == rowid) {
          row_index = item_index
        }
      })
      return row_index
    },
    loadItems({ page, itemsPerPage, sortBy }) {
      if (this.firstload) {
        this.firstload = false
      } else {
        this.gridcontext['GRID_PAGE%' + this.component.name] = page - 1
        this.gridcontext['GRID_SIZE%' + this.component.name] = itemsPerPage
        this.gridcontext['GRID_ORDER%' + this.component.name] = sortBy
          .map((sort_item) => {
            return (sort_item.order == 'asc' ? '-' : '') + sort_item.key
          })
          .join(',')
        this.refresh()
      }
    },
    refresh() {
      this.$emit('action', refreshAction(this.meta, this.gridcontext))
    },
    onclose(refresh_parent) {
      this.$emit('close', refresh_parent)
    },
    click_action(action) {
      var new_action = convert_action(action)
      if (this.selectItems.length > 0 && new_action.unique != SELECT_NONE) {
        new_action.params[this.component.name] = this.selectItems.join(';')
      }
      this.$emit('action', new_action, false)
    },
    click_row(event, row_item) {
      this.savefocusin()
      if (this.buttonMode != SELECT_NONE) {
        var exit_before = this.selectItems.includes(row_item.id)
        if (exit_before) {
          this.selectItems.splice(this.selectItems.indexOf(row_item.id), 1)
        }
        if (this.buttonMode == SELECT_SINGLE) {
          this.selectItems = []
        } else if (
          event.shiftKey &&
          this.lastselectid != null &&
          this.lastselectid != row_item.id
        ) {
          const current_index = this.indexOfValue(row_item.id)
          var minRow = Math.min(this.indexOfValue(this.lastselectid) + 1, current_index)
          var maxRow = Math.max(this.indexOfValue(this.lastselectid) - 1, current_index)
          for (var rowIdx = minRow; rowIdx <= maxRow; rowIdx++) {
            var new_rowid = this.value[rowIdx].id
            if (this.selectItems.includes(new_rowid)) {
              this.selectItems.splice(this.selectItems.indexOf(new_rowid), 1)
            } else {
              this.selectItems.push(new_rowid)
            }
          }
          exit_before = true
        }
        if (!exit_before) {
          this.selectItems.push(row_item.id)
        }
        this.lastselectid = row_item.id
      }
    },
    dblclick_row(event, row_item) {
      if (this.buttonMode != SELECT_NONE) {
        var dbl_action = null
        this.selectItems = [row_item.id]
        this.$forceUpdate()
        this.actions.forEach((act) => {
          if (dbl_action == null && act.unique != SELECT_NONE) {
            dbl_action = act
          }
        })
        if (dbl_action != null) {
          this.click_action(dbl_action)
        }
      }
    }
  },
  mounted() {
    if (this.component.no_pager) {
      Array.from(this.$el.getElementsByClassName('v-data-table-footer')).forEach((footer) => {
        footer.style.display = 'none'
      })
    }
  }
}
</script>

<template>
  <AbstractComp :component="component">
    <ButtonsBar
      :actions="actions"
      :center="true"
      @clickaction="click_action"
      @close="onclose"
      v-if="actions.length > 0"
    />
    <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items-length="component.nb_lines"
      :items="serverItems"
      :page="component.page_num + 1"
      :multi-sort="true"
      :sort-by="sortby"
      :items-per-page-options="items_per_page_options"
      :items-per-page-text="$t('Results per page')"
      :no-data-text="$t('No result')"
      :page-text="page_text"
      item-value="id"
      ref="tofocus"
      @focusin="savefocusin"
      @update:options="loadItems"
    >
      <template #item="{ item }">
        <tr
          :class="
            'v-data-table__tr ' +
            item.classname +
            (selectItems.includes(item.id) ? ' selected' : '')
          "
        >
          <td
            class="v-data-table__td"
            v-for="header in component.headers"
            :key="header[0]"
            @click="click_row($event, item)"
            @dblclick="dblclick_row($event, item)"
          >
            <span v-if="header[2] != 'icon'" v-html="item[header[0]]"></span>
            <img :src="item[header[0]]" v-if="header[2] == 'icon'" />
          </td>
        </tr>
      </template>
    </v-data-table-server>
  </AbstractComp>
</template>

<style>
.v-table > .v-table__wrapper > table {
  border: 1px solid #cfcfcf;
}
.v-table > .v-table__wrapper > table thead.v-data-table__thead th.v-data-table__th {
  background: linear-gradient(#eeeeee, #cccccc);
  overflow: hidden;
  border-right: 1px solid #cfcfcf;
  border-top: 1px solid #cfcfcf;
  height: calc(var(--v-table-header-height) - 15px);
}
.v-table > .v-table__wrapper > table .v-data-table__tbody .v-data-table__tr .v-data-table__td {
  border: 1px solid #cfcfcf;
  height: calc(var(--v-table-row-height, 52px) - 25px);
  font-size: smaller;
  padding-left: 5px;
}
.v-table > .v-table__wrapper > table .v-data-table__tbody .v-data-table__tr:hover {
  background-color: #a0a0a0;
  color: #fff;
}
tr.even {
  background-color: #ffffff;
}
tr.odd {
  background-color: #f0f0f0;
}
tr.selected {
  background-color: #d0d0d0;
}
tr.selected td {
  border-top: 1px solid #fff;
}
.v-data-table-footer__items-per-page
  > .v-input
  > .v-input__control
  > .v-field
  > .v-field__field
  > .v-field__input {
  top: 0px;
}
</style>
