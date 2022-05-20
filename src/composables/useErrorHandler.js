// import { useCookie } from '~/plugins/cookies';
import useNotification, { messages as messagesNotification } from '@/composables/useNotification';
import useHelpers from '@/composables/useHelpers';
import { messages } from '@/composables/useSnappPay';

export default function useErrorHandler (router) {
	async function handler (exception) {
		switch (exception?.response?.status) {
		case 401:
			if (exception.response.data.message === 'Unauthenticated.') {
				useNotification().error(messagesNotification.auth.unauthenticated);

				// const token = useCookie('auth._token.local', undefined, { path: '/' }, app);
				// token.value = '';
				// window.location.reload();
			} // logout
			if (exception.response.data.message === 'User does not have any of the necessary access rights.') {
				useNotification().error(messages.errors.auth.notAccess);
				break;
			}
			await router.push({ name: 'auth-access-denied' });
			break;
		case 403:
			useNotification().error(messages.errors['403']);
			break;
		case 404:
			useNotification().error(messages.errors['404']);
			break;
		case 422:
			useNotification().error(useHelpers().convertErrorToString(exception.response.data.errors));
			// store.dispatch('error/errorHandler', exception.response.data.errors);
			break;
		default:
			useNotification().error(messages.errors.default);
			break;
		}
	}

	return { handler };
}
