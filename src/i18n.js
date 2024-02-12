import { createI18n } from 'vue-i18n'
import { messages } from '@/i18n-message.js'

const i18n = createI18n({
  locale: 'fr',
  fallbackLocale: 'fr',
  legacy: false,
  globalInjection: true, // <--- add this
  messages
})

export default i18n
