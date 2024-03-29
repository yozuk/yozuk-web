import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

const app = createApp(App)
app.config.globalProperties.$iframeMode = (window.location !== window.parent.location)
app.mount('#app')