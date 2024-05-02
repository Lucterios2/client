<script setup>
import { computed } from 'vue'
import { getUrlServer } from '@/libs/transport'

const emit = defineEmits(['click'])
const props = defineProps({
  action: Object,
  is_mini: Boolean
})
function clickaction() {
  emit('click', props.action)
}
const action_disabled = computed(() => {
  return props.action.disabled === true
})
const is_icon = computed(() => {
  return props.action.short_icon !== undefined && props.action.short_icon !== ''
})
const image_src = computed(() => {
  if (props.action.short_icon) {
    return props.action.short_icon
  } else {
    return getUrlServer() + props.action.icon
  }
})
</script>

<template>
  <v-btn
    :class="is_mini ? 'bg-act btnmini' : 'bg-act'"
    @click="clickaction"
    :disabled="action_disabled"
  >
    <img :src="image_src" width="24px" :title="is_mini ? action.text : ''" v-if="!is_icon" />
    <v-icon v-if="is_icon" :title="is_mini ? action.text : ''">{{ image_src }}</v-icon>
    <span v-if="!is_mini">{{ action.text }}</span>
  </v-btn>
</template>

<style>
button.v-btn.bg-act {
  background-color: #bebebe;
  color: #000;
  font-size: 13px;
  height: 32px;
  min-width: 135px;
}
button.v-btn.btnmini {
  min-width: 40px;
}
button.v-btn.bg-act > span > span {
  margin-left: 3px;
  text-transform: capitalize;
}
@media (min-width: 1600px) {
  button.v-btn.bg-act {
    font-size: 15px;
    min-width: 150px;
    height: 35px;
  }
  button.v-btn.btnmini {
    min-width: 40px;
  }
}
</style>
