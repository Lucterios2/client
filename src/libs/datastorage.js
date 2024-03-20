import { createStore } from 'vuex'

// Create a new store instance.
const storage = createStore({
  state: {
    show_waiting: false,
    show_status: true,
    show_summary: true,
    server: {
      title: 'Lucterios',
      subtitle: '',
      version: '',
      serverversion: '',
      clientversion: '',
      copyright: '',
      logoname: '',
      background: '',
      style: '',
      support_email: '',
      support_html: '',
      info_server: [],
      instance: '',
      message_before: '',
      language: '',
      mode: 0,
      login_field: 'username',
      only_admin: false,
      login: '',
      realname: '',
      email: '',
      version_current: '',
      version_expected: ''
    }
  },
  mutations: {
    call_waiting(state, waiting) {
      state.show_waiting = waiting
    },
    call_status(state, status) {
      state.show_status = status
    },
    call_summary(state, summary) {
      state.show_summary = summary
    },
    change_server(state, server) {
      if (server && server.cordovaversion) {
        server.clientversion = server.cordovaversion
      }
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
