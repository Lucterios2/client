<script>
export default {
  name: 'AbstractObserver',
  props: {
    context: Object,
    actions: Array,
    close: Object,
    data: [Object, String],
    meta: Object // {extension: String, title: String, action: String, observer: String}
  },
  emits: ['clickaction', 'close'],
  methods: {
    click_action(action) {
      if (action.params === undefined) {
        action.params = {}
      }
      action.params = Object.assign({}, action.params, this.context)
      this.$emit('clickaction', action)
    }
  }
}
</script>

<template>
  <div :name="component.name">
    <label v-if="component.description">{{ component.description }}</label>
    <slot />
  </div>
</template>

<style scoped>
label {
  padding-right: 5px;
  font-weight: bold;
}
</style>
