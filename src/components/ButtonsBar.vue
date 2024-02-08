<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import ButtonAction from './ButtonAction.vue'
const i18n = useI18n()
const emit = defineEmits(['clickaction', 'close'])
const props = defineProps({
  actions: Array,
  close: Object
})
function click_action(action) {
  if (action.id !== '') {
    emit('clickaction', action)
  }
  if (Number(action.close) === 0) {
    if (props.close !== null) {
      emit('clickaction', props.close)
    }
    emit('close')
  }
}
const action_list = computed(() => {
  if (props.actions.length > 0) {
    return props.actions
  } else {
    return [{ text: i18n.t('ok'), id: '', icon: 'mdi:mdi-check', close: '0' }]
  }
})
</script>

<template>
  <v-card-actions class="bg-grey-lighten-3">
    <v-spacer></v-spacer>
    <div v-for="action in action_list" :key="action.id" style="margin: 0px 3px">
      <ButtonAction :action="action" @click="click_action(action)" />
    </div>
  </v-card-actions>
</template>

<style scoped></style>
