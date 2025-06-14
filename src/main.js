// main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import routerFactory from '@/routers/index.js'
import i18nFactory from '@/utils/i18n/index.js'
import Vue3Lottie from 'vue3-lottie'
import App from './App.vue'
import '@/assets/styles/main.scss'
import 'ant-design-vue/dist/reset.css'

const pinia = createPinia()

const app = createApp(App)

// Подключаем Pinia и другие плагины
app.use(pinia)

const i18n = i18nFactory()

// Подключаем маршруты и i18n
app.use(routerFactory(i18n.global))
app.use(i18n)
app.use(Vue3Lottie)

app.mount('#app')
