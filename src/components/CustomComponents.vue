<script>
import { createCompnent } from '@/libs/observer'
import { FORMTYPE_REFRESH, first_element_by_class } from '@/libs/utils'
import { convert_action } from '@/libs/convert'
import { factory_components } from '@/components/tools'
import { LucteriosException, IMPORTANT } from '@/libs/error'

export default {
  name: 'CustomComponents',
  data: () => ({
    internalInfo: {},
    componentlist: []
  }),
  props: {
    context: Object,
    data: Object,
    comp: Array,
    meta: Object,
    initialInfo: Object
  },
  emits: ['action', 'close', 'interface'],
  computed: {
    tablist() {
      return this.comp.filter((item) => item.component == 'TAB')
    }
  },
  methods: {
    call_action(action) {
      if (action == null) {
        action = this.get_default_action()
        if (action == null) {
          this.$emit('action', null)
          return
        }
      }
      var is_valid = true
      if (action.modal != FORMTYPE_REFRESH && !action.no_check) {
        this.componentlist.forEach((comp) => {
          is_valid = is_valid && comp.is_valid() == true
        })
      }
      if (is_valid) {
        var new_action = convert_action(action)
        this.componentlist.forEach((comp) => {
          comp.add_parameters(new_action.params)
        })
        this.$emit('action', new_action)
      } else {
        throw new LucteriosException(IMPORTANT, this.$t('At least one field is not valid!'))
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
          close: () => {
            this.$emit('close')
          },
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
        if (comp_next == null || comp_next.y != comp_item.y) {
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
        this.comp.filter((item) => item.tab == 0)
      )
      this.tablist.forEach((tab) => {
        const subtable = first_element_by_class(this.$el, tab.name + '__row')
        if (subtable) {
          this.add_table(
            subtable,
            this.comp.filter((item) => item.tab == tab.tab && item.component != 'TAB')
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
        if (comp.get_component().name == name) {
          component = comp
        }
      })
      return component
    },
    receive_focus(component_name) {
      this.internalInfo.focus_name = component_name
    },
    emitInterface() {
      this.$emit('interface', {
        call_action: (action) => this.call_action(action),
        get_info: () => this.internalInfo
      })
    }
  },
  mounted() {
    this.emitInterface()
    this.refresh()
    this.internalInfo = this.initialInfo
    if (this.internalInfo == undefined) {
      this.internalInfo = {
        tab: this.tablist.length > 0 ? this.tablist[0].name : null,
        focus_name:
          this.componentlist.length > 0
            ? this.componentlist[this.componentlist.length - 1].get_component().name
            : null
      }
    }
    this.componentlist.forEach((comp) => {
      if (this.internalInfo.focus_name == comp.get_component().name) {
        comp.setfocus()
      }
    })
  },
  updated() {
    this.refresh()
  }
}
</script>

<template>
  <div ref="root">
    <table class="root-row" width="100%"></table>
    <div class="tabroot" v-if="tablist.length > 0">
      <v-tabs v-model="internalInfo.tab" bg-color="#888" color="#000">
        <v-tab v-for="tab in tablist" :value="tab.name" :key="tab.tab" class="tabheader">{{
          data[tab.name]
        }}</v-tab>
      </v-tabs>
      <v-window v-model="internalInfo.tab">
        <v-window-item v-for="tab in tablist" :value="tab.name" :key="tab.tab" class="tabcontent">
          <table :class="tab.name + '__row'" width="100%"></table>
        </v-window-item>
      </v-window>
    </div>
  </div>
</template>

<style>
.tabroot {
  border: 1px solid #888;
}
.tabheader {
  border: 1px solid #888;
}
.tabcontent {
  padding: 4px;
}

.customcell {
  padding: 1px 3px;
}
</style>
