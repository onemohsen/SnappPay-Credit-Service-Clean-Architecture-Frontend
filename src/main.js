import { createApp } from 'vue'
import { installPlugins } from '~/plugins/index';


// import { createPinia } from 'pinia'

import App from './App.vue'
// import router from './router'
import './assets/index.css'


// import axios from 'axios'
// import { Model } from 'vue-api-query'

// inject global axios instance as http client to Model
// Model.$http = axios

// const app = createApp(App)

// app.use(createPinia())
// app.use(router)

// app.mount('#app')




(async () => {
	const app = createApp(App);
	await installPlugins(app);
	app.mount('#app');
})();