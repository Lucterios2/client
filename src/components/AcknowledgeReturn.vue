<script setup>
const props = defineProps({
  context: Object,
  action: Object,
  close: Object,
  data: Object, // {message: String, type: Number}
  meta: Object // {extension: String, title: String, action: String, observer: String}
})
const emit = defineEmits(['clickaction', 'close'])

function click_action(action) {
  if (action.params === undefined) {
    action.params = {}
  }
  action.params = Object.assign({}, action.params, props.context)
  emit('clickaction', action)
}
if (props.action) {
  var refreshIntervalId1 = setInterval(() => {
    click_action(props.action)
    clearInterval(refreshIntervalId1)
  }, 100)
}

if (props.close) {
  var refreshIntervalId2 = setInterval(() => {
    click_action(props.close)
    clearInterval(refreshIntervalId2)
  }, 100)
}

emit('close')
</script>

<template>
  <div />
</template>

<style scoped></style>
