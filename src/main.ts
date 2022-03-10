import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import installElementPlus from './plugins/element'
import './registerServiceWorker'

const app = createApp(App)

app.use(createPinia())
app.use(installElementPlus)
app.use(router)

app.mount('#app')
