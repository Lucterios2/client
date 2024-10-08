<script>
import AbstractObserver from '@/observers/AbstractObserver.vue'
import ButtonAction from '@/libs/ButtonAction.vue'
import FrameDlg from '@/libs/FrameDlg.vue'
import { convertLuctoriosFormatToHtml, convert_object_lowercase } from '@/libs/convert'
import { CLOSE_YES, insertStyle } from '@/libs/utils'
import { clearComponent } from '@/libs/observer'

export default {
  name: 'LoginBox',
  extends: AbstractObserver,
  components: { FrameDlg, ButtonAction },
  props: {
    connexion: Object,
    meta: Object,
    data: String,
    context: Object
  },
  data: () => ({
    form: false,
    login: '',
    password: '',
    message: '',
    show_login: false
  }),
  computed: {
    newmeta() {
      return Object.assign(this.meta || {}, { ismodal: true, title: this.$t('Logon') })
    },
    has_action() {
      return this.actions !== undefined && this.actions.length > 0
    },
    action_list() {
      const actions = Array()
      actions.push({
        id: 'ok',
        text: this.$t('Ok'),
        short_icon: 'mdi:mdi-power',
        close: 1,
        disabled: !this.form
      })
      if (this.$store.state.server.mode == 1) {
        actions.push({
          id: 'cancel',
          text: this.$t('cancel'),
          short_icon: 'mdi:mdi-logout',
          close: 1
        })
      }
      return actions
    },
    showMessage() {
      return this.data !== 'OK' && this.data !== '' && this.$store.state.nb_login > 1
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
      return this.$emit('clickaction', action, true, null)
    },
    run_action(action) {
      if (action.id === 'cancel') {
        this.execute_action({ id: 'CORE/authentification', method: 'POST', close: CLOSE_YES })
      }
      if (action.id === 'ok') {
        this.onSubmit()
      }
    },
    onSubmit() {
      if (!this.form) return
      this.execute_action({
        id: 'CORE/authentification',
        method: 'POST',
        close: CLOSE_YES,
        params: { login: this.login, password: this.password }
      })
    },
    required(v) {
      return !!v || this.$t('field_required')
    },
    refresh_document() {
      document.title = this.$store.state.server.title + ' - ' + this.$store.state.server.subtitle
      var link = document.querySelector("link[rel*='icon']") || document.createElement('link')
      link.type = 'image/x-icon'
      link.rel = 'shortcut icon'
      link.href = this.$store.state.server.logoname
      document.getElementsByTagName('head')[0].appendChild(link)
    }
  },
  mounted() {
    const connexion_convert = convert_object_lowercase(this.connexion)
    this.$i18n.locale = connexion_convert.language ? connexion_convert.language : 'fr'
    this.$store.commit('call_status', this.data === 'OK')
    this.$store.commit('change_server', connexion_convert)
    this.refresh_document()
    if (this.$store.state.server.style !== '') {
      this.$store.commit('backcolor', insertStyle(this.$store.state.server.style))
    }
    this.$store.commit('check_login')
    if (this.data === 'OK') {
      if (!this.context.norefresh) {
        var refreshIntervalId = setInterval(() => {
          this.execute_action({ id: 'CORE/menu', close: CLOSE_YES })
          clearInterval(refreshIntervalId)
        }, 100)
      } else {
        this.$store.commit('call_status', true)
        this.execute_action({ id: '', close: CLOSE_YES })
      }
    } else if (this.data === 'BADAUTH') {
      this.show_login = true
      if (this.$store.state.server.login_field === 'email') {
        this.message = this.$t('email_wrong')
      } else {
        this.message = this.$t('username_wrong')
      }
    } else if (this.data === 'NEEDAUTH') {
      clearComponent()
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
  <div class="login">
    <div class="message_alert" v-if="show_login && $store.state.server.message_before">
      <span v-html="message_before" />
    </div>
    <FrameDlg
      :meta="newmeta"
      :actions="action_list"
      :close="null"
      :noaction="true"
      :key="forceRecompute"
      @action="run_action"
    >
      <v-alert :text="message" v-if="showMessage" type="error"> </v-alert>
      <v-form v-model="form" @submit.prevent="onSubmit">
        <v-container grid-list-md>
          <v-text-field
            v-model="login"
            name="login"
            clearable
            :label="login_label()"
            @keyup.enter="onSubmit"
            :rules="[required]"
          ></v-text-field>
          <v-text-field
            v-model="password"
            name="password"
            clearable
            :label="$t('password')"
            type="password"
            @keyup.enter="onSubmit"
            :rules="[required]"
          ></v-text-field>
        </v-container>
      </v-form>
      <div class="login_actions" v-if="has_action">
        <v-card-actions class="logactions" v-for="action in actions" :key="action.id">
          <ButtonAction :action="action" @click="execute_action" />
        </v-card-actions>
      </div>
    </FrameDlg>
  </div>
</template>

<style>
div.login > div.frameDlg > div.v-card {
  width: 375px;
}
div.login > div.frameDlg > div.v-card > .v-card-text > .login_actions {
  margin-top: -15px;
  padding-bottom: 5px;
}
div.login > div.frameDlg > div.v-card > .v-card-text > .login_actions > .logactions {
  padding: 0px;
}
div.login > div.frameDlg > div.v-card > .v-card-text > .login_actions > .logactions button {
  font-size: 10px;
  margin: 0px auto;
  width: 60%;
}
div.login > .message_alert {
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
