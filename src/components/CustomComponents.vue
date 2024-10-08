<script>
import { createCompnent } from '@/libs/observer'
import { FORMTYPE_REFRESH, first_element_by_class, sleep } from '@/libs/utils'
import { convert_action } from '@/libs/convert'
import { factory_components } from '@/components/tools'
import { LucteriosException, IMPORTANT, runErrorCaptured } from '@/libs/error'

export default {
  name: 'CustomComponents',
  data: () => ({
    internalInfo: {},
    componentlist: [],
    must_refresh: true
  }),
  props: {
    context: Object,
    data: Object,
    comp: Array,
    meta: Object,
    initialInfo: Object
  },
  emits: ['action', 'interface'],
  computed: {
    tablist() {
      return this.comp.filter((item) => item.component === 'TAB')
    }
  },
  methods: {
    async call_action(action, no_owner, action_close) {
      if (action == null) {
        action = this.get_default_action()
        if (action == null) {
          return this.$emit('action', null, no_owner, action_close)
        }
      }
      var is_valid = true
      const invalid_name = []
      if (Number(action.modal) !== FORMTYPE_REFRESH && !action.no_check) {
        this.componentlist.forEach((comp) => {
          if (comp.is_valid() != true) {
            is_valid = false
            invalid_name.push(comp.get_component().name)
          }
        })
      }
      if (is_valid) {
        var new_action = convert_action(action)
        this.componentlist.forEach((comp) => {
          comp.add_parameters(new_action.params)
        })
        return this.$emit('action', new_action, no_owner, action_close)
      } else {
        console.log('invalid names', invalid_name)
        await runErrorCaptured(
          new LucteriosException(IMPORTANT, this.$t('At least one field is not valid!'))
        )
        return false
      }
    },
    add_table(current_table, component_list) {
      current_table.innerHTML = ''
      var current_x = 0
      var current_y = 0
      var current_tr = document.createElement('tr')
      component_list.forEach((comp_item) => {
        for (var rowadded = current_y; rowadded < comp_item.y; rowadded++) {
          current_table.appendChild(document.createElement('tr'))
        }
        const last_components_touched = component_list.filter((item) => {
          return (
            item.y < comp_item.y &&
            item.y + item.rowspan - 1 >= comp_item.y &&
            item.x + item.colspan - 1 <= comp_item.x
          )
        })
        if (last_components_touched.length > 0) {
          const offset = Math.max(
            ...last_components_touched.map((item) => {
              return item.x + item.colspan
            })
          )
          current_x = Math.max(current_x, offset)
        }
        if (comp_item.x - current_x > 0) {
          const empty_cell = document.createElement('td')
          empty_cell.setAttribute('colspan', comp_item.x - current_x)
          empty_cell.setAttribute('class', 'customcell')
          current_tr.appendChild(empty_cell)
        }
        const current_td = document.createElement('td')
        current_td.setAttribute('rowspan', comp_item.rowspan)
        current_td.setAttribute('colspan', comp_item.colspan)
        current_td.setAttribute('class', 'customcell')
        const emits = {
          action: this.call_action,
          focusin: this.receive_focus
        }
        current_td.id = new Date().valueOf()
        const new_vuecomp = createCompnent(
          current_td,
          factory_components(comp_item.component),
          {
            id: current_td.id,
            context: this.context,
            value: this.data[comp_item.name],
            component: comp_item,
            meta: this.meta
          },
          [],
          emits
        )
        if (new_vuecomp.component) {
          this.componentlist.push(new_vuecomp.component.ctx)
        }
        current_tr.appendChild(current_td)
        const comp_next =
          component_list.indexOf(comp_item) < component_list.length - 1
            ? component_list[component_list.indexOf(comp_item) + 1]
            : null
        if (comp_next === null || comp_next.y !== comp_item.y) {
          current_table.appendChild(current_tr)
          current_tr = document.createElement('tr')
          current_x = 0
          current_y = comp_item.y + 1
        } else {
          current_x = comp_item.x + comp_item.colspan
          current_y = comp_item.y
        }
      })
    },
    get_default_action() {
      var default_action = null
      this.componentlist.forEach((comp) => {
        if (comp.get_component().is_default && comp.get_component().action) {
          default_action = comp.get_component().action
        }
      })
      return default_action
    },
    refresh() {
      this.componentlist = []
      this.add_table(
        first_element_by_class(this.$el, 'root-row'),
        this.comp.filter((item) => item.tab === 0)
      )
      this.tablist.forEach((tab) => {
        const subtable = first_element_by_class(this.$el, tab.name + '__row')
        if (subtable) {
          this.add_table(
            subtable,
            this.comp.filter((item) => item.tab === tab.tab && item.component !== 'TAB')
          )
        }
      })
      var refreshOwnerId = setInterval(() => {
        this.componentlist.forEach((comp) => {
          comp.setOwner(this)
        })
        clearInterval(refreshOwnerId)
      }, 100)
    },
    get(name) {
      var component = null
      this.componentlist.forEach((comp) => {
        if (comp.get_component().name === name) {
          component = comp
        }
      })
      return component
    },
    adapt_size() {
      const tabroot_el = first_element_by_class(this.$el, 'tabroot')
      if (tabroot_el) {
        const root_row_h = first_element_by_class(this.$el, 'root-row').getBoundingClientRect()
          .height
        tabroot_el.style.height = 'calc(100% - ' + root_row_h + 'px)'
      }
    },
    receive_focus(component_name) {
      this.internalInfo.focus_name = component_name
    },
    emitInterface() {
      this.$emit('interface', {
        call_action: (action, no_owner, action_close) => {
          return this.call_action(action, no_owner, action_close)
        },
        get_info: () => this.internalInfo
      })
    },
    async focus_current_comp() {
      const comp_selectables = this.componentlist.filter((comp) => comp.is_focuseble)
      const old_focus_name = this.internalInfo.focus_name
      comp_selectables.forEach(async (comp) => {
        await sleep(1)
        comp.setfocus()
      })
      await sleep(1)
      comp_selectables.forEach((comp) => {
        if (old_focus_name === comp.get_component().name) {
          comp.setfocus()
        }
      })
    }
  },
  mounted() {
    this.emitInterface()
    this.refresh()
    this.internalInfo = this.initialInfo
    if (this.internalInfo == undefined) {
      const comp_selectables = this.componentlist.filter((comp) => comp.is_focuseble)
      this.internalInfo = {
        tab: this.tablist.length > 0 ? this.tablist[0].name : null,
        focus_name: comp_selectables.length > 0 ? comp_selectables[0].get_component().name : null
      }
    }
    this.$nextTick(() => {
      this.focus_current_comp()
    })
    var refreshSizeId = setInterval(() => {
      this.adapt_size()
      clearInterval(refreshSizeId)
    }, 100)
    if (this.internalInfo.tab === null && this.tablist.length > 0) {
      this.internalInfo.tab = this.tablist[0].name
    }
  },
  updated() {
    if (this.must_refresh) {
      this.refresh()
      this.must_refresh = false
    }
  }
}
</script>

<template>
  <div ref="root" class="custom-comp">
    <table class="root-row" width="100%"></table>
    <div class="tabroot" v-if="tablist.length > 0">
      <v-tabs v-model="internalInfo.tab" bg-color="#888" color="#000" height="35" stacked>
        <v-tab v-for="tab in tablist" :value="tab.name" :key="tab.tab" class="tabheader">{{
          data[tab.name]
        }}</v-tab>
      </v-tabs>
      <div v-for="tab in tablist" :value="tab.name" :key="tab.tab" class="tabcontent">
        <table
          :class="tab.name + '__row'"
          width="100%"
          v-show="tab.name == internalInfo.tab"
        ></table>
      </div>
    </div>
  </div>
</template>

<style>
.custom-comp {
  height: 100%;
}
.tabroot {
  border: 1px solid #888;
}
.tabheader {
  border: 1px solid #888;
  font-size: smaller;
  text-transform: capitalize;
  margin-top: 0px;
}
.tabcontent {
  padding: 4px;
}

.customcell {
  padding: 1px 3px;
  vertical-align: middle;
}
</style>
