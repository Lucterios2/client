import { createStore } from 'vuex'

// Create a new store instance.
const storage = createStore({
  state: {
    show_waiting: false,
    show_status: true,
    show_login: false,
    show_summary: true,
    show_menu: true,
    server: {
      title: '',
      sub_title: '',
      applis_version: '',
      server_version: '',
      copy_rigth: '',
      version_current: '',
      version_expected: '',
      info_server: [],
      support_email: '',
      support_html: '',
      logo_iconname: '',
      background: '',
      style: '',
      login: '',
      real_name: '',
      instance_name: '',
      message_before: '',
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
    call_menu(state, menu) {
      state.show_menu = menu
    },
    call_summary(state, summary) {
      state.show_summary = summary
    },
    change_server(state, server) {
      state.server = Object.assign({}, state.server, server)
    }
  },
  actions: {
    toggle_summary(context) {
      context.commit('call_summary', !context.state.show_summary)
    }
  }
})

export default storage
