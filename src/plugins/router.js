import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import routes from '~pages'


export function installRouter (app) {
	const router = createRouter({
		history: createWebHistory(import.meta.env.BASE_URL),
		routes,
	});

	app.use(router);

	return router;
}
