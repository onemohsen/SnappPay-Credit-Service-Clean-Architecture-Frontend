import middleware from '~/middleware';
import { useStorage } from '@vueuse/core';
import { computed, inject, readonly, watch } from 'vue';
import { useCookie } from './cookies';

async function createAuth (app, router) {
	const userSerialized = useStorage('user', 'null');
	const user = computed({
		get () {
			return JSON.parse(userSerialized.value);
		},
		set (x) {
			userSerialized.value = JSON.stringify(x);
		},
	});

	const strategy = useCookie('auth.strategy', '', { path: '/' }, app);
	strategy.value = 'local';
	const token = useCookie('auth._token.local', undefined, { path: '/' }, app);

	if (token.value === undefined) {
		strategy.value = '';
	} else if (token.value) {
		app.api.setToken(token.value);
	}

	const setUser = (_user) => {
		if (_user) {
			_user.fullName = [(_user.name || _user.namePersian)].filter(Boolean).join(' ') || _user.email || _user.phone;
		}
		user.value = _user;
	};

	// watch(user, (t) => {
	// if (!t && router.currentRoute.value.meta.auth) {
	// router.push({ name: 'auth-login' });
	// }
	// });

	const setToken = (_token) => {
		token.value = _token ? `Bearer ${_token}` : undefined;
		app.api.setToken(token.value);
	};

	watch(token, async (t) => {
		if (t) {
			try {
				const response = await app.api.get('/users/current');
				setUser(response.data.data);
			} catch (err) {
				setToken(null);
				setUser(null);
			}
		}
		if (!t) {
			setToken(null);
			setUser(null);
		}
	},
	{ immediate: true },
	);

	const login = (data) => {
		return app.api.post('/login', data).then(({ data }) => {
			setUser(null);
			setToken(null);
			setToken(data.data.access_token);
		});
	};

	const sendOtp = (data) => {
		return app.api.post('/login/first', data);
	};

	const logout = async () => {
		await app.api.post('/logout');
		setUser(null);
		setToken(null);
	};
	

	return {
		// Methods
		login,
		logout,
		sendOtp,
		// confirmRegistration,
		// Setters
		setUser,
		setToken,
		// Getters
		getUser: readonly(user),
		getToken: readonly(token),
	};
}

const AUTH_KEY = 'AUTH';

export const useAuth = () => {
	return inject(AUTH_KEY);
};

export default async (ctx) => {
	const {
		app,
		router,
	} = ctx;

	const auth = await createAuth(app, router);
	app.provide(AUTH_KEY, auth);
	ctx.auth = auth;

	router.beforeEach((to, from, next) => {

		if (to.meta.auth && !(auth.getToken.value)) {
			next({
				name: 'login',
				query: { redirect: to.fullPath },
			});
		}
		
		if (to.meta.middlewares) {
			middleware(to.meta.middlewares, ctx, auth.getUser.value, to);
		}

		next();
	});
};
