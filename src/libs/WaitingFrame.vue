<script setup>
const visible = true
</script>

<template>
  <v-dialog v-model="visible" id="overlay" persistent>
    <v-row>
      <v-col cols="12" class="text-center">
        <v-progress-circular
          indeterminate
          model-value="10"
          size="120"
          width="10"
        ></v-progress-circular>
      </v-col>
    </v-row>
  </v-dialog>
</template>

<style scoped></style>
