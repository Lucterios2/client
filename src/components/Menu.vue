<script setup>
</script>

<template>
  <div class="menu">
    <h1>Menu</h1>
    <h2 v-if="$store.state.show_summary">Summary</h2>
  </div>
</template>

<style scoped>
  .menu {
    position: fixed;
    top: 100px;
  }
</style>