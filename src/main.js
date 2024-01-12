/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'
import storage from './datastorage.js'

// Composables
import { createApp } from 'vue'

const app = createApp(App)
app.use(storage)
registerPlugins(app)
app.mount('#app')
