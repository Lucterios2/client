<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import ButtonAction from '@/libs/ButtonAction.vue'
import { CLOSE_YES } from '@/libs/utils'
import { convert_action } from './convert'
const i18n = useI18n()
const emit = defineEmits(['clickaction'])
const props = defineProps({
  actions: Array,
  close: Object,
  center: { type: Boolean, default: false }
})
var increment_action = 0
function click_action(action) {
  var action_close = null
  if (Number(action.close) === CLOSE_YES && props.close) {
    action_close = props.close
  }
  emit('clickaction', convert_action(action, action.id == ''), false, action_close) != false
}
const action_list = computed(() => {
  if (props.actions.length > 0) {
    return props.actions.map((action) => {
      action.num = increment_action++
      return action
    })
  } else {
    return [{ text: i18n.t('Ok'), id: '', short_icon: 'mdi:mdi-check', close: '1' }]
  }
})
</script>

<template>
  <v-card-actions class="bg-grey-lighten-3">
    <v-spacer></v-spacer>
    <div v-for="action in action_list" :key="action.num" style="margin: 0px 3px">
      <ButtonAction :action="action" @click="click_action(action)" />
    </div>
    <slot />
    <v-spacer v-if="center"></v-spacer>
  </v-card-actions>
</template>

<style scoped></style>
