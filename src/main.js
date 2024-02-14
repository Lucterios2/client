/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from '@/App.vue'
import storage from '@/libs/datastorage.js'
import i18n from '@/libs/i18n.js'

// Composables
import { createApp } from 'vue'

const app = createApp(App)
app.use(storage)
app.use(i18n)
registerPlugins(app)
app.mount('#app')
