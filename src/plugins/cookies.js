import { inject, ref, watchEffect } from 'vue';
import Cookies from 'universal-cookie';

const COOKIE_KEY = 'COOKIES';

export const useCookie = (key, defaultValue = undefined, options = { path: '/' }, app) => {
	const cookies = app ? app.cookies : inject(COOKIE_KEY);
	const initialValue = cookies.get(key);
	const x = ref(initialValue || defaultValue);

	watchEffect(() => {
		if (x.value === undefined || x.value === defaultValue) {
			cookies.remove(key, options);
		} else {
			cookies.set(key, x.value, options);
		}
	});

	return x;
};

export default ({ app }) => {
	const cookies = app.cookies = new Cookies();
	app.provide(COOKIE_KEY, cookies);
};
