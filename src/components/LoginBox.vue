<script setup></script>

<template>
  <v-dialog v-model="$store.state.show_login" activator="parent" persistent max-width="400px">
    <v-card>
      <v-card-title>
        <span class="headline">Logon</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-flex md1>
            <v-text-field label="Email" required></v-text-field>
          </v-flex>
          <v-flex md1>
            <v-text-field label="Password" type="password" required></v-text-field>
          </v-flex>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block>OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>
