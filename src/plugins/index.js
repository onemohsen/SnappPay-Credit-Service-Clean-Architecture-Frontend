import Api from '~/plugins/api';
import Auth from '~/plugins/auth';
import Cookies from '~/plugins/cookies';
import ApiQuery from '~/plugins/api-query';
import { installRouter } from '~/plugins/router';
import {installStore} from '~/plugins/pinia';

const plugins = [
	Cookies,
	Api,
	Auth,
	ApiQuery,
];

export async function installPlugins (app) {
	const router = installRouter(app);
	const store = installStore(app);
	const pluginContext = { app, router, store };

	await Promise.all(plugins.map(plugin => plugin(pluginContext)));

	return { router, store };
}
