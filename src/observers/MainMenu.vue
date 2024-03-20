<script>
import SubMenus from '@/libs/SubMenus.vue'
import CustomComponents from '@/components/CustomComponents.vue'
import { callLucteriosAction, getUrlServer } from '@/libs/transport'
import AbstractObserver from '@/observers/AbstractObserver.vue'

export default {
  name: 'MainMenu',
  extends: AbstractObserver,
  components: { SubMenus, CustomComponents },
  data: () => ({
    tab: null,
    custom_data: {},
    custom_comp: [],
    summary_menu: [],
    summary_selecteddefault: null
  }),
  props: {
    menus: Array
  },
  methods: {
    click_action(menu) {
      this.$emit('clickaction', menu)
    },
    show_summary() {
      if (this.$store.state.show_summary && this.summary_menu.length > 0) {
        return true
      } else {
        return false
      }
    },
    tabs_menus() {
      const menus_of_tabs = []
      this.menus.forEach((item) => {
        if (item.text !== '') {
          menus_of_tabs.push(item)
        }
      })
      return menus_of_tabs
    },
    async refresh_summary(summary_menu) {
      if (this.summary_selected) {
        this.custom_data = {}
        this.custom_comp = []
        const summary_return = await callLucteriosAction(summary_menu)
        if (summary_return.meta.observer == 'core.custom') {
          this.custom_data = summary_return.data
          this.custom_comp = summary_return.comp
        }
      }
    },
    get_icon_url(menu) {
      return getUrlServer() + menu.icon
    },
    refreshObserver() {}
  },
  async mounted() {
    this.menus.forEach((item) => {
      if (item.text === '') {
        this.summary_menu = item.menus
        if (item.menus.length > 0) {
          this.summary_selected = item.menus[0].id
        }
      }
    })
    this.$store.commit('call_status', true)
    if (this.summary_menu.length > 0) {
      await this.refresh_summary(this.summary_menu[0])
    }
    var refreshIntervalId = setInterval(() => {
      this.$store.commit('call_summary', false)
      clearInterval(refreshIntervalId)
    }, 10000)
  }
}
</script>

<template>
  <div class="menu">
    <v-row>
      <div class="v-col v-col-2-xld v-col-3-ld v-col-4-md v-col-12-xsd" v-if="show_summary()">
        <v-expansion-panels variant="accordion" v-model="summary_selected">
          <v-expansion-panel
            v-for="submenu in summary_menu"
            :key="submenu.id"
            :value="submenu.id"
            @click="refresh_summary(submenu)"
          >
            <v-expansion-panel-title color="#888">
              <v-icon v-if="submenu.short_icon">{{ submenu.short_icon }}</v-icon>
              <div v-if="!submenu.short_icon">
                <v-img
                  :src="get_icon_url(submenu)"
                  height="20"
                  :width="20"
                  :alt="submenu.text"
                ></v-img>
              </div>
              <span style="margin-left: 5px">{{ submenu.text }}</span>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <CustomComponents :data="custom_data" :comp="custom_comp" @action="click_action" />
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
        <div class="support_footer" v-if="$store.state.server.support_html">
          <span v-html="$store.state.server.support_html"></span>
        </div>
      </div>
      <v-col cols="max">
        <v-card>
          <v-tabs v-model="tab" bg-color="#888" color="#000">
            <v-tab v-for="tabmenu in tabs_menus()" :key="tabmenu.id" :value="tabmenu.id"
              ><v-img
                :src="get_icon_url(tabmenu)"
                height="16"
                width="22"
                :alt="tabmenu.text"
                v-if="!tabmenu.short_icon"
              ></v-img
              ><v-icon v-if="tabmenu.short_icon">{{ tabmenu.short_icon }}</v-icon
              ><span>{{ tabmenu.text }}</span></v-tab
            >
          </v-tabs>
          <v-card-text>
            <v-window v-model="tab">
              <v-window-item v-for="tabmenu in tabs_menus()" :key="tabmenu.id" :value="tabmenu.id">
                <SubMenus
                  :menu="tabmenu"
                  :with_image="false"
                  @clickaction="click_action"
                ></SubMenus>
              </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.menu {
  position: fixed;
  top: 75px;
  width: 98%;
  margin: 0px 1%;
}
.support_footer {
  margin-top: 100px;
  padding: 5px;
  border: 1px black solid;
  border-radius: 10px;
}

@media only screen and (min-width: 1400px) {
  .v-col-2-xld {
    flex: 0 0 16.6666666667%;
    max-width: 16.6666666667%;
  }
}
@media only screen and (min-width: 1000px) and (max-width: 1400px) {
  .v-col-3-ld {
    flex: 0 0 25%;
    max-width: 25%;
  }
}
@media only screen and (min-width: 800px) and (max-width: 1000px) {
  .v-col-4-md {
    flex: 0 0 33.333333%;
    max-width: 33.333333%;
  }
}
@media only screen and (max-width: 800px) {
  .v-col-12-xsd {
    flex: 0 0 100%;
    max-width: 100%;
  }
}
</style>
