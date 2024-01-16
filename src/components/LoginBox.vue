<script setup>
const emit = defineEmits(['logon', 'logoff'])
const form = defineModel('form', { type: Boolean, default: false })
const login = defineModel('login', { type: String, default: '' })
const password = defineModel('password', { type: String, default: '' })

function onSubmit() {
  if (!form.value) return
  emit('logon', login.value, password.value)
}
function required(v) {
  return !!v || 'Field is required'
}
</script>

<template>
  <v-dialog v-model="$store.state.show_login" activator="parent" persistent max-width="400px">
    <v-form v-model="form" @submit.prevent="onSubmit">
      <v-card>
        <v-card-title class="bg-grey-lighten-3"> Logon </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-text-field
              v-model="login"
              clearable
              label="Email"
              :rules="[required]"
            ></v-text-field>
            <v-text-field
              v-model="password"
              clearable
              label="Password"
              type="password"
              :rules="[required]"
            ></v-text-field>
          </v-container>
        </v-card-text>
        <v-card-actions class="bg-grey-lighten-3">
          <v-spacer></v-spacer>
          <v-btn
            class="bg-grey"
            @click="emit('logoff')"
            width="100px"
            v-if="$store.state.server.mode === 1"
            ><v-icon icon="mdi:mdi-logout" />Cancel</v-btn
          >
          <v-btn class="bg-grey" type="submit" width="100px" :disabled="!form"
            ><v-icon icon="mdi:mdi-power" />OK</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<style scoped></style>
