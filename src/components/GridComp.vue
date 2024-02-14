<script>
import AbstractComp from '@/components/AbstractComp.vue'
import { Stringformat, convertLuctoriosFormatToHtml, formatToString } from '@/libs/utils'
import { useI18n } from 'vue-i18n'

export default {
  name: 'GridComp',
  extends: AbstractComp,
  components: { AbstractComp },
  data: () => ({
    items_per_page_options: [
      { value: 25, title: '25' },
      { value: 50, title: '50' },
      { value: 100, title: '100' },
      { value: 250, title: '250' },
      { value: 500, title: '500' }
    ],
    i18n: useI18n()
  }),
  computed: {
    headers() {
      return this.component.headers.map((header_item) => {
        return {
          title: header_item[1],
          align: 'start',
          sortable: false /*header_item[3] == 1,*/,
          key: header_item[0]
        }
      })
    },
    serverItems() {
      return this.value.map((line_item) => {
        const new_line = { id: line_item.id }
        this.component.headers.forEach((header_item) => {
          new_line[header_item[0]] = convertLuctoriosFormatToHtml(
            formatToString(line_item[header_item[0]], '', header_item[4].replace('%s', '{0}'))
          )
        })
        console.log('new_line', new_line)
        return new_line
      })
    },
    itemsPerPage: {
      get: function () {
        console.log('<< changepage', this.component.size_by_page)
        return this.component.size_by_page
      },
      set: function (newpage) {
        console.log('>> changepage', newpage)
      }
    },
    totalItems() {
      return this.component.nb_lines
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
    }
  },
  methods: {
    loadItems({ page, itemsPerPage, sortBy }) {
      console.log('>> loadItems', page, itemsPerPage, sortBy)
      this.loading = false
    }
  }
}
</script>

<template>
  <AbstractComp :component="component">
    <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items-length="totalItems"
      :items="serverItems"
      :multi-sort="true"
      :items-per-page-options="items_per_page_options"
      :items-per-page-text="$t('Results per page')"
      :no-data-text="$t('No result')"
      :page-text="page_text"
      item-value="id"
      @update:options="loadItems"
    >
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
  height: calc(var(--v-table-row-height, 52px) - 15px);
}
.v-table > .v-table__wrapper > table .v-data-table__tbody .v-data-table__tr:hover {
  background-color: #a0a0a0;
  color: #fff;
}
</style>
