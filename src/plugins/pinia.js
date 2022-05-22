import { createPinia } from 'pinia';


export function installStore (app) {
	const store = createPinia();
	app.use(store);
	return store;
}