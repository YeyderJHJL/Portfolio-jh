import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

import { createPinia } from 'pinia'
import router from './router'

import PrimeVue from 'primevue/config'
// import Aura from '@primeuix/themes/aura'
import 'primeicons/primeicons.css'

const app = createApp(App)

// Instalar Pinia para gestión de estado
app.use(createPinia())

// Instalar Vue Router para navegación
app.use(router)

app.use(PrimeVue, {
  ripple: true,
})

app.mount('#app')
