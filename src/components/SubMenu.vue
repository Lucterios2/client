<script setup>
const emit = defineEmits(['click'])
const prop = defineProps({
  menu: Object
})
function click_action() {
  emit('click', prop.menu)
}
</script>

<template>
  <div>
    <v-card
      class="mx-auto submenu"
      color="#888"
      cvariant="tonal"
      width="200px"
      height="75px"
      @click="click_action()"
    >
      <v-card-item>
        <v-img
          :src="menu.icon"
          height="32"
          width="40"
          :alt="menu.text"
          v-if="menu.short_icon === ''"
        ></v-img>
        <v-icon v-if="menu.short_icon !== ''">{{ menu.short_icon }}</v-icon>
        <v-card-title>
          <br v-if="menu.short_icon !== ''" />
          {{ menu.text }}
          <v-tooltip :text="menu.help" activator="parent" location="bottom"></v-tooltip>
        </v-card-title>
      </v-card-item>
    </v-card>
  </div>
</template>

<style scoped>
.submenu {
  border: 1px black solid;
}
.submenu .v-card-title {
  font-size: 12px;
  white-space: normal;
  color: black;
  line-height: 13px;
}
</style>
