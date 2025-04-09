import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './routes' 
import vuetify from './vuetify/vuetify.js' 


createApp(App).use(router).use(vuetify).mount('#app')
