import axios from 'axios';
import { inject, computed } from 'vue';

function createApi (_, router, store) {
	const api = axios.create({
		baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api/v1',
	});
	const req = {
		pending: () => {
			
		},
		done: async () => {
			
		},
	};
	api.interceptors.request.use(
		(config) => {
			req.pending();
			return config;
		},
		(error) => {
			req.done();
			return Promise.reject(error);
		},
	);
	api.interceptors.response.use(
		async (response) => {
			req.done();
			return Promise.resolve(response);
		},
		(error) => {
			req.done();
			return Promise.reject(error);
		},
	);

	const setHeader = (name, value, scope = 'common') => {
		if (!value) {
			delete api.defaults.headers[scope][name];
		} else {
			api.defaults.headers[scope][name] = value;
		}
	};

	const setToken = (token, type, scope = 'common') => {
		const value = !token ? null : (type ? type + ' ' : '') + token;
		setHeader('Authorization', value, scope);
	};

	return { ...api, setHeader, setToken };
}

const API_KEY = 'API';

export const useApi = () => {
	return inject(API_KEY);
};

export default (ctx) => {
	const api = createApi(ctx.app, ctx.router, ctx.store);
	ctx.api = ctx.app.api = api;
	ctx.app.provide(API_KEY, api);
};
