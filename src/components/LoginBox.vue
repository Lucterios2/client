<script setup>
import ButtonAction from '@/components/ButtonAction.vue'
import ButtonsBar from '@/components/ButtonsBar.vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
const store = useStore()
const i18n = useI18n()
const props = defineProps({
  connexion: Object,
  data: String,
  actions: Array,
  meta: Object
})
const emit = defineEmits(['clickaction', 'close'])
const form = defineModel('form', { type: Boolean, default: false })
const login = defineModel('login', { type: String, default: '' })
const password = defineModel('password', { type: String, default: '' })
const message = defineModel('message', { type: String, default: '' })
var show_login = true

function login_label() {
  if (store.state.server.login_field === 'email') {
    return i18n.t('email')
  } else {
    return i18n.t('username')
  }
}
function click_action(action) {
  emit('clickaction', action)
  emit('close')
}

function run_action(action) {
  if (action.id == 'cancel') {
    click_action({ id: 'CORE/exitConnection' })
  }
  if (action.id == 'ok') {
    onSubmit()
  }
}
function onSubmit() {
  if (!form.value) return
  click_action({
    id: 'CORE/authentification',
    method: 'POST',
    params: { login: login.value, password: password.value }
  })
}
function required(v) {
  return !!v || i18n.t('field_required')
}

show_login = true
const action_list = computed(() => {
  const actions = Array()
  if (store.state.server.mode === 1) {
    actions.push({ id: 'cancel', text: i18n.t('cancel'), icon: 'mdi:mdi-logout', close: 1 })
  }
  actions.push({
    id: 'ok',
    text: i18n.t('ok'),
    icon: 'mdi:mdi-power',
    close: 1,
    disabled: !form.value
  })
  return actions
})

store.commit('call_status', false)
if (props.data === 'OK') {
  store.commit('change_server', props.connexion)
  i18n.locale.value = props.connexion.language ? props.connexion.language : 'fr'
  document.title = store.state.server.title + ' - ' + store.state.server.sub_title
  show_login = false
  var refreshIntervalId = setInterval(() => {
    click_action({ id: 'CORE/menu' })
    clearInterval(refreshIntervalId)
  }, 100)
} else if (props.data === 'BADAUTH') {
  if (store.state.server.login_field === 'email') {
    message.value = i18n.t('email_wrong')
  } else {
    message.value = i18n.t('username_wrong')
  }
} else if (props.data === 'NEEDAUTH') {
  message.value = i18n.t('identify_you')
} else if (props.data === 'ONLYADMIN') {
  message.value = i18n.t('only_admin')
} else {
  message.value = props.data
}
</script>

<template>
  <v-dialog v-model="show_login" activator="parent" persistent max-width="400px">
    <v-form v-model="form" @submit.prevent="onSubmit">
      <v-card>
        <v-card-title class="bg-grey-lighten-3"> {{ $t('Logon') }} </v-card-title>
        <v-card-text>
          <v-alert :text="message" v-if="props.data !== 'OK' && props.data !== ''" type="error">
          </v-alert>
          <v-container grid-list-md>
            <v-text-field
              v-model="login"
              clearable
              :label="login_label()"
              :rules="[required]"
            ></v-text-field>
            <v-text-field
              v-model="password"
              clearable
              :label="$t('password')"
              type="password"
              :rules="[required]"
            ></v-text-field>
          </v-container>
        </v-card-text>

        <v-card-actions class="logactions" v-for="action in props.actions" :key="action.id">
          <ButtonAction :action="action" @click="click_action" />
        </v-card-actions>

        <ButtonsBar :actions="action_list" @clickaction="run_action" @close="run_action" />
      </v-card>
    </v-form>
  </v-dialog>
</template>

<style scoped>
.logactions {
  padding: 0px;
}
.logactions button {
  font-size: 10px;
  margin: 0px auto;
  width: 60%;
}
</style>
