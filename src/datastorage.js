import { createStore } from 'vuex'

// Create a new store instance.
const storage = createStore({
  state: {
    show_waiting: false,
    show_status: false,
    show_login: true,
    show_summary: false,
    show_menu: false,
    server: {
      title: 'Lucterios client!!',
      sub_title: '???',
      applis_version: '',
      server_version: '',
      copy_rigth: '',
      version_current: '',
      version_expected: '',
      info_server: '',
      support_email: '',
      support_html: '',
      logo_iconname: 'favicon.ico',
      background: '',
      style: '',
      login: 'xxx',
      real_name: '',
      instance_name: 'unknown',
      message_before: 'coucou',
      mode: 0,
      login_field: 'username',
      language: '',
      only_admin: false
    }
  },
  mutations: {
    call_waiting(state, waiting) {
      state.show_waiting = waiting
    },
    call_status(state, status) {
      state.show_status = status
    },
    call_login(state, login) {
      state.show_login = login
    },
    change_summary(state, summary) {
      state.show_summary = summary
    },
    change_menu(state, menu) {
      state.show_menu = menu
    },
    change_server(state, server) {
      state.server = server
    }
  },
  actions: {
    toggle_summary(context) {
      context.commit('change_summary', !context.state.show_summary)
    }
  }
})

export default storage
