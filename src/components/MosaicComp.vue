<script>
import AbstractComp from '@/components/AbstractComp.vue'
import ButtonsBar from '@/libs/ButtonsBar.vue'
import { convert_action, Stringformat } from '@/libs/convert'
import { refreshAction, SELECT_MULTI, SELECT_NONE, SELECT_SINGLE } from '@/libs/utils'

export default {
  name: 'MosaicComp',
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
    current_page: 1,
    order_by: '',
    image_dim: 1,
    selection: []
  }),
  computed: {
    scroll_element() {
      if (this.$el && this.$el.children) {
        if (this.$el.children.length > 1) {
          return this.$el.children[1].children[1].firstElementChild
        } else {
          return this.$el.children[0].children[1].firstElementChild
        }
      } else {
        return null
      }
    },
    page_text() {
      return Stringformat(
        this.$t('%0 to %1 (%2 in total)')
          .replace('%0', '{0}')
          .replace('%1', '{1}')
          .replace('%2', '{2}'),
        [
          1 + this.component.page_num * this.component.size_by_page,
          Math.min(
            this.component.nb_items,
            (this.component.page_num + 1) * this.component.size_by_page
          ),
          this.component.nb_items
        ]
      )
    },
    actions() {
      const action_general = this.component.actions.filter((act) => act[0] == null)
      if (action_general.length == 1) {
        return action_general[0][1].map((action_item) => {
          const unique = Number(action_item.unique)
          action_item.disabled = false
          if (unique === SELECT_SINGLE && this.selection.length !== 1) {
            action_item.disabled = true
          } else if (unique === SELECT_MULTI && this.selection.length === 0) {
            action_item.disabled = true
          }
          action_item.no_check = true
          return action_item
        })
      }
      return []
    },
    items_selected() {
      return this.value
        .filter((item, index) => this.selection.includes(index))
        .map((item) => String(item.id))
    },
    image_size() {
      if (this.image_dim == 0) {
        return 80
      } else if (this.image_dim == 1) {
        return 150
      } else {
        return 300
      }
    },
    image_style() {
      if (this.image_dim == 0) {
        return 'height: 50px;'
      } else if (this.image_dim == 1) {
        return 'height: 125px;'
      } else {
        return 'height: 250px;'
      }
    },
    icon_style() {
      if (this.image_dim == 0) {
        return 'font-size: 50px;'
      } else if (this.image_dim == 1) {
        return 'font-size: 125px;'
      } else {
        return 'font-size: 250px;'
      }
    }
  },
  methods: {
    change_selection() {
      const params = {}
      params['MOSAIC_SIZE%' + this.component.name] = this.component.size_by_page
      params['MOSAIC_ORDER%' + this.component.name] = this.component.order
      params['MOSAIC_PAGE%' + this.component.name] = this.current_page - 1
      params['MOSAIC_DIM%' + this.component.name] = this.image_dim
      const new_action = refreshAction(this.meta, params)
      this.$emit('action', new_action, false)
    },
    is_icon(item) {
      return item.image.startsWith('mdi:')
    },
    onResize(height_diff) {
      this.scroll_element.style.maxHeight = Math.max(200, this.initial_height + height_diff) + 'px'
    },
    isSelected(item) {
      return this.items_selected.includes(String(item.id))
    },
    toggle(item) {
      const index = this.value.indexOf(item)
      if (this.selection.includes(index)) {
        this.selection.splice(this.selection.indexOf(index), 1)
      } else {
        this.selection.push(index)
      }
    },
    click_action(action) {
      var new_action = convert_action(action, true)
      if (this.items_selected.length > 0 && Number(new_action.unique) !== SELECT_NONE) {
        new_action.params[this.component.name] = this.items_selected.join(';')
      }
      this.$emit('action', new_action, false)
    },
    runAction(item) {
      const action_special = this.component.actions.filter((act) => act[0] == item.group)
      if (action_special.length == 1 && action_special[0][1].length > 0) {
        var new_action = convert_action(action_special[0][1][0], true)
        new_action.params[this.component.name] = item.id
        this.$emit('action', new_action, false)
      }
    }
  },
  mounted() {
    this.current_page = this.component.page_num + 1
    this.image_dim = this.component.img_dim
    this.initial_height = this.component.VMin ? this.component.VMin : 200
    if (this.scroll_element) {
      this.scroll_element.style.maxHeight = this.initial_height + 'px'
      this.onResize(0)
    }
  }
}
</script>

<template>
  <AbstractComp :component="component" class="mosaic">
    <v-row class="bg-grey-lighten-3 mosaic_buttons">
      <v-col cols="6">
        <ButtonsBar
          :actions="actions"
          :center="true"
          @clickaction="click_action"
          v-if="actions.length > 0"
        />
      </v-col>
      <v-col cols="3">
        <AbstractComp
          class="checklist mosaic_imgsize"
          :value="value"
          :component="{ description: $t('Image size'), name: component.name + '_imgsize' }"
        >
          <center>
            <v-btn-toggle v-model="image_dim">
              <v-btn size="small">
                <v-icon>mdi:mdi-size-s</v-icon>
              </v-btn>
              <v-btn size="small">
                <v-icon>mdi:mdi-size-m</v-icon>
              </v-btn>
              <v-btn size="small">
                <v-icon>mdi:mdi-size-l</v-icon>
              </v-btn>
            </v-btn-toggle>
          </center>
        </AbstractComp>
      </v-col>
      <v-col cols="3">
        <AbstractComp
          class="checklist mosaic_orderby"
          :value="value"
          :component="{ description: $t('Order by'), name: component.name + '_orderby' }"
        >
          <select v-model="component.order" @change="change_selection">
            <option :value="item[0]" :key="item[0]" v-for="item in component.order_fields">
              {{ item[1] }}
            </option>
          </select>
        </AbstractComp>
      </v-col>
    </v-row>
    <v-row>
      <div class="scroll_table mosaic_images">
        <v-item-group v-model="selection" multiple>
          <v-row>
            <v-col v-for="(item, i) in value" :key="i">
              <v-item>
                <v-btn
                  class="mosaic_images_btn"
                  :color="isSelected(item) ? '#d0d0d0' : ''"
                  dark
                  :width="image_size"
                  :height="image_size + 20"
                  @click="toggle(item)"
                  @dblclick="runAction(item)"
                >
                  <img :src="item.image" :style="image_style" v-if="!is_icon(item)" />
                  <v-icon :style="icon_style" v-if="is_icon(item)">
                    {{ item.image }}
                  </v-icon>
                  <label>{{ item.name }}</label>
                </v-btn>
                <v-tooltip activator="parent" location="right" content-class="mosaic-tooltip"
                  ><span v-html="item.info"></span
                ></v-tooltip>
              </v-item>
            </v-col>
          </v-row>
        </v-item-group>
      </div>
    </v-row>
    <v-row>
      <v-col cols="4">
        <AbstractComp
          class="checklist mosaic_perpage"
          :value="value"
          :component="{ description: $t('Results per page'), name: component.name + '_perpage' }"
        >
          <select v-model="component.size_by_page" @change="change_selection">
            <option :value="item.value" :key="item.value" v-for="item in items_per_page_options">
              {{ item.title }}
            </option>
          </select>
        </AbstractComp>
      </v-col>
      <v-col cols="3">
        <label class="mosaic_number">{{ page_text }}</label>
      </v-col>
      <v-col cols="5">
        <v-pagination
          class="mosaic_pagination"
          v-model="current_page"
          :length="component.page_max"
          rounded="circle"
          @update:modelValue="change_selection"
        />
      </v-col>
    </v-row>
  </AbstractComp>
</template>

<style>
.mosaic {
  margin-right: 20px;
}
.mosaic_buttons {
  margin-top: 5px;
  margin-bottom: 5px;
}
.mosaic_buttons label {
  margin-right: 5px;
}
.mosaic_imgsize > .v-field_abstract > center > div {
  height: 30px;
  margin-top: 3px;
}
.mosaic_images {
  border: 1px solid black;
  padding: 10px;
  background-color: #f4f4f4;
}
div.v-tooltip > .mosaic-tooltip {
  background-color: #f4f4f4;
  color: black;
  border: 1px solid black;
}
.mosaic_images_btn > span.v-btn__content {
  display: grid;
}
.mosaic_perpage {
  min-width: 135px;
}
.mosaic_number {
  min-width: 165px;
  display: block;
}
.mosaic_pagination {
  min-width: 350px;
  margin-top: -8px;
}
</style>
