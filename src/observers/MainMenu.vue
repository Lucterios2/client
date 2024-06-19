<script>
import SubMenus from '@/libs/SubMenus.vue'
import CustomComponents from '@/components/CustomComponents.vue'
import { callLucteriosAction, getUrlServer } from '@/libs/transport'
import { convertLuctoriosFormatToHtml } from '@/libs/convert.js'
import AbstractObserver from '@/observers/AbstractObserver.vue'
import { first_element_by_class } from '@/libs/utils'

export default {
  name: 'MainMenu',
  extends: AbstractObserver,
  components: { SubMenus, CustomComponents },
  data: () => ({
    tab: null,
    custom_data: {},
    custom_comp: [],
    summary_menu: [],
    summary_selected: [],
    last_summary_selected: []
  }),
  props: {
    menus: Array
  },
  computed: {
    support_html() {
      return convertLuctoriosFormatToHtml(this.$store.state.server.support_html)
    }
  },
  methods: {
    check_summary_menu() {
      if (this.last_summary_selected != this.summary_selected) {
        this.last_summary_selected = this.summary_selected
      } else {
        this.refresh_summary(
          this.summary_menu.filter((menu) => {
            return menu.id == this.summary_selected
          })[0]
        )
      }
      return ''
    },
    click_action(menu, no_owner) {
      this.$emit('clickaction', menu, no_owner)
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
        if (summary_return.meta.observer === 'core.custom') {
          this.custom_data = summary_return.data
          this.custom_comp = summary_return.comp
        }
      }
    },
    get_icon_url(menu) {
      return getUrlServer() + menu.icon
    },
    close_summary() {
      this.$store.commit('call_summary', false)
    },
    refreshObserver() {}
  },
  async mounted() {
    this.menus.forEach((item) => {
      if (item.text === '') {
        this.summary_menu = item.menus
      }
    })
    var new_height = window.innerHeight - 50
    const row_el = first_element_by_class(this.$el, 'v-row')
    if (row_el) {
      row_el.style.height = new_height + 'px'
    }
    if (this.summary_menu.length > 0) {
      const default_summary = this.summary_menu[this.summary_menu.length - 1]
      this.summary_selected = [default_summary.id]
      await this.refresh_summary(default_summary)
      this.$store.commit('call_status', true)
      this.$store.commit('call_summary', false)
      this.$nextTick(() => {
        this.$store.commit('call_summary', true)
      })
      var refreshIntervalId = setInterval(() => {
        this.$store.commit('call_summary', false)
        clearInterval(refreshIntervalId)
      }, 10000)
    }
  }
}
</script>

<template>
  <div class="menu">
    <v-row>
      <v-col cols="max">
        <v-card>
          <v-tabs
            v-model="tab"
            bg-color="#888"
            color="#000"
            :slider-color="$store.state.backcolor"
            class="mainmenu"
          >
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
              <v-window-item
                class="item-submenus"
                v-for="tabmenu in tabs_menus()"
                :key="tabmenu.id"
                :value="tabmenu.id"
              >
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
    <div class="summary_menu" v-if="show_summary()" @dblclick="close_summary">
      {{ check_summary_menu() }}
      <v-expansion-panels variant="accordion" v-model="summary_selected">
        <v-expansion-panel
          v-for="submenu in summary_menu"
          :key="submenu.id"
          :value="submenu.id"
          @click="refresh_summary(submenu)"
        >
          <v-expansion-panel-title :color="$store.state.backcolor">
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
            <CustomComponents
              class="panel-custom"
              :data="custom_data"
              :comp="custom_comp"
              @action="click_action"
            />
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
      <div class="versionclient_footer" v-if="!$store.getters.isVersionOk">
        <span v-html="$t('Client obselete')"></span>
      </div>
      <div class="support_footer" v-if="$store.state.server.support_html">
        <span v-html="support_html"></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.menu {
  position: fixed;
  top: 60px;
  width: 97%;
  margin: 0px 1%;
  overflow-y: scroll;
}

.menu > .v-row > .v-col > .v-card {
  height: 100%;
}

.mainmenu button {
  font-size: 14px;
}
@media (min-width: 1600px) {
  .mainmenu button {
    font-size: 16px;
  }
}
@media (max-height: 500px) {
  .mainmenu button {
    font-size: 12px;
  }
}

.item-submenus {
  height: 100%;
}

.v-expansion-panels {
  max-height: 75%;
  overflow-y: scroll;
}

.summary_menu {
  background-color: white;
  position: absolute;
  top: 10%;
  left: 10%;
  border: 3px outset black;
}

.summary_menu > .v-expansion-panels > .v-expansion-panel > .v-expansion-panel-title {
  margin-top: -10px;
}

.versionclient_footer {
  padding: 2px;
  border: 1px black solid;
  border-radius: 10px;
  background-color: #eee;
  width: 70%;
  margin: 0px auto 10px auto;
  color: red;
  text-align: center;
  font-style: italic;
  font-weight: bold;
}

.support_footer {
  padding: 2px;
  border: 1px black solid;
  border-radius: 10px;
  background-color: #eee;
  width: 70%;
  margin: 0px auto 10px auto;
}
</style>
