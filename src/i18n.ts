import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import es from './locales/es.json'

const saved = localStorage.getItem('lang')
const locale = saved || (navigator.language.startsWith('es') ? 'es' : 'en')

export const i18n = createI18n({
  legacy: false,
  locale,
  fallbackLocale: 'en',
  messages: { en, es },
})
