<script>
import AbstractObserver from '@/observers/AbstractObserver.vue'
import ButtonAction from '@/libs/ButtonAction.vue'
import ButtonsBar from '@/libs/ButtonsBar.vue'
import { convertLuctoriosFormatToHtml } from '@/libs/utils'
import { insertStyle } from '@/libs/utils'

export default {
  name: 'LoginBox',
  extends: AbstractObserver,
  components: { ButtonsBar, ButtonAction },
  props: {
    connexion: Object
  },
  data: () => ({
    form: false,
    login: '',
    password: '',
    message: '',
    show_login: false
  }),
  computed: {
    action_list() {
      const actions = Array()
      if (this.$store.state.server.mode === 1) {
        actions.push({
          id: 'cancel',
          text: this.$t('cancel'),
          short_icon: 'mdi:mdi-logout',
          close: 1
        })
      }
      actions.push({
        id: 'ok',
        text: this.$t('ok'),
        short_icon: 'mdi:mdi-power',
        close: 1,
        disabled: !this.form
      })
      return actions
    },
    showMessage() {
      return this.data !== 'OK' && this.data !== ''
    },
    message_before() {
      return convertLuctoriosFormatToHtml(this.$store.state.server.message_before)
    }
  },
  methods: {
    login_label() {
      if (this.$store.state.server.login_field === 'email') {
        return this.$t('email')
      } else {
        return this.$t('username')
      }
    },
    execute_action(action) {
      this.$emit('clickaction', action)
    },
    run_action(action) {
      if (action.id == 'cancel') {
        this.execute_action({ id: 'CORE/exitConnection' })
        this.$emit('close')
      }
      if (action.id == 'ok') {
        this.onSubmit()
      }
    },
    run_close() {
      this.$emit('close')
    },
    onSubmit() {
      if (!this.form) return
      this.execute_action({
        id: 'CORE/authentification',
        method: 'POST',
        params: { login: this.login, password: this.password }
      })
      this.$emit('close')
    },
    required(v) {
      return !!v || this.$t('field_required')
    }
  },
  mounted() {
    this.$store.commit('call_status', false)
    this.$store.commit('change_server', this.connexion)
    document.title = this.$store.state.server.title + ' - ' + this.$store.state.server.sub_title
    if (this.$store.state.server.style !== '') {
      insertStyle(this.$store.state.server.style)
    }
    if (this.data === 'OK') {
      this.$i18n.locale = this.connexion.language ? this.connexion.language : 'fr'
      var refreshIntervalId = setInterval(() => {
        this.execute_action({ id: 'CORE/menu' })
        this.$emit('close')
        clearInterval(refreshIntervalId)
      }, 100)
    } else if (this.data === 'BADAUTH') {
      this.show_login = true
      if (this.$store.state.server.login_field === 'email') {
        this.message = this.$t('email_wrong')
      } else {
        this.message = this.$t('username_wrong')
      }
    } else if (this.data === 'NEEDAUTH') {
      this.show_login = true
      this.message = this.$t('identify_you')
    } else if (this.data === 'ONLYADMIN') {
      this.show_login = true
      this.message = this.$t('only_admin')
    } else {
      this.show_login = true
      this.message = this.data
    }
  }
}
</script>

<template>
  <div>
    <div class="message_alert" v-if="show_login && $store.state.server.message_before">
      <span v-html="message_before" />
    </div>
    <v-dialog v-model="show_login" activator="parent" persistent max-width="400px">
      <v-form v-model="form" @submit.prevent="onSubmit">
        <v-card>
          <v-card-title class="bg-grey-darken-1"> {{ $t('Logon') }} </v-card-title>
          <v-card-text>
            <v-alert :text="message" v-if="showMessage" type="error"> </v-alert>
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

          <v-card-actions class="logactions" v-for="action in actions" :key="action.id">
            <ButtonAction :action="action" @click="execute_action" />
          </v-card-actions>

          <ButtonsBar :actions="action_list" @clickaction="run_action" @close="run_close" />
        </v-card>
      </v-form>
    </v-dialog>
  </div>
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
.message_alert {
  position: absolute;
  top: 3%;
  background-color: #dddddd;
  width: 80%;
  margin-left: 10%;
  margin-right: 10%;
  padding: 10px;
  text-align: center;
  font-size: 20px;
  border: 2px solid black;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
}
</style>
