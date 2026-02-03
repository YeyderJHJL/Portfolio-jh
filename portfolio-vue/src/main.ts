import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// Instalar Pinia para gestión de estado
app.use(createPinia())

// Instalar Vue Router para navegación
app.use(router)

app.mount('#app')
