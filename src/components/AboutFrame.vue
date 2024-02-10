<script setup>
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
const store = useStore()
const i18n = useI18n()

import { send_to_support } from '@/tools/utils.js'
const emit = defineEmits(['close'])
const more_version = defineModel({ type: Boolean, default: false })
const visible = true
function send_support() {
  send_to_support(i18n, store, '')
}
</script>

<template>
  <v-dialog v-model="visible" persistent max-width="500px">
    <v-card>
      <v-card-title class="bg-grey-darken-1"> {{ $t('about') }} </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="4">
            <v-img :src="$store.state.server.logo_iconname" alt="Logo" height="80px" />
          </v-col>
          <v-col cols="8">
            <h2 class="text-center">{{ $store.state.server.title }}</h2>
            <v-row>
              <v-col cols="4" class="text-center space small">{{ $t('version') }}</v-col>
              <v-col cols="8" class="text-center space small">{{
                $store.state.server.applis_version
              }}</v-col>
              <v-col cols="12" class="text-center space small">{{
                $store.state.server.copy_rigth
              }}</v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row class="space"></v-row>
        <v-divider :thickness="3"></v-divider>
        <v-row class="space"></v-row>
        <v-row class="space">
          <v-col cols="12" class="text-center space">
            {{ $t('use_lucterios_framework') }}
          </v-col>
          <v-col cols="6" class="text-center space small">{{ $t('server') }}</v-col>
          <v-col cols="6" class="text-center space small">{{
            $store.state.server.applis_version
          }}</v-col>
          <v-col cols="6" class="text-center space small">{{ $t('client') }}</v-col>
          <v-col cols="6" class="text-center space small">{{
            $store.state.server.version_current
          }}</v-col>
        </v-row>
        <div class="more_version" v-if="more_version">
          <v-row v-for="item in $store.state.server.info_server" :key="item">
            <v-col cols="12" class="space"><span v-html="item"></span></v-col>
          </v-row>
        </div>
        <v-img
          src="LucteriosImage.png"
          alt="lucterios"
          max-height="100px"
          style="margin: 15px"
          @click="more_version = !more_version"
        />
        <v-row class="space">
          <v-col cols="12" class="text-center space">{{ $t('gpl_licence_tool') }}</v-col>
          <v-col cols="6" class="text-center space small"
            ><a href="https://www.lucterios.org" target="_blank"
              >https://www.lucterios.org</a
            ></v-col
          >
          <v-col cols="6" class="text-center space small"
            ><a href="https://www.sd-libre.fr" target="_blank">https://www.sd-libre.fr</a></v-col
          >
          <v-col cols="12" class="text-center space small">{{ $t('thank_to_supporting') }}</v-col>
        </v-row>
        <v-row>
          <v-col cols="4" />
          <v-col cols="4">
            <form id="formDon" target="_blank" action="https://www.paypal.com/donate/" method="get">
              <input name="hosted_button_id" value="A45MG9JYWHRNA" type="hidden" />
              <input
                style="border: 0"
                alt="PayPal"
                name="submit"
                src="bouton-don-v.png"
                type="image"
              />
            </form>
          </v-col>
        </v-row>
        <v-divider :thickness="3"></v-divider>
        <br />
        <span v-html="$store.state.server.support_html"></span>
      </v-card-text>
      <v-card-actions class="bg-grey-lighten-3">
        <v-spacer></v-spacer>
        <v-btn class="bg-grey" @click="send_support" v-if="$store.state.server.support_email !== ''"
          ><v-icon icon="mdi:mdi-mail" width="100px" />{{ $t('support') }}</v-btn
        >
        <v-btn class="bg-grey" @click="emit('close')" width="100px"
          ><v-icon icon="mdi:mdi-check" />{{ $t('ok') }}</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
div.space {
  padding-top: 4px;
  padding-bottom: 0px;
}
div.small {
  font-size: 12px;
}
div.more_version {
  padding: 12px;
  font-family: Helvetica, sans-serif, Arial;
  font-size: 10px;
  margin-top: 20px;
  background-color: #eee;
  border: 1px solid black;
}
</style>
