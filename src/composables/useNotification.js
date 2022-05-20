import ElNotification from 'element-plus/lib/components/notification/index';


export default function useNotification () {
	const success = ( message = null) => {
		ElNotification({
			title: 'Success',
			message: message ?? ('has been sent'),
			type: 'success',
			position: 'bottom-right',
			customClass: 'absolute ml-5 p-2 border font-bold w-3/4 bg-green-500 md:w-1/4',
			duration: '6000',
		});
	};

	const error = (message = null) => {
		ElNotification({
			title: 'Error',
			message: message ?? 'error occurred',
			type: 'error',
			position: 'bottom-right',
			customClass: 'absolute ml-5 p-2 border font-bold w-3/4 bg-red-500 md:w-1/4',
			duration: '6000',
		});
	};

	const warning = (message = null) => {
		ElNotification({
			title: 'Warning',
			message: message ?? '',
			type: 'warning',
			position: 'bottom-right',
			customClass: 'absolute ml-5 p-2 border font-bold w-3/4 bg-yellow-500 md:w-1/4',
			duration: '6000',
		});
	};

	return {
		success,
		error,
		warning,
	};
}

export const messages = {
	product: {
		add: 'Product successfully added',
		edit: 'Product successfully edited',
		delete: 'Product successfully deleted',
		approve: 'Product successfully approved',
	},
	user: {
		add: 'User successfully added',
		edit: 'User successfully edited',
		delete: 'User successfully deleted',
		approve: 'User successfully approved',
	},
	creditPackage: {
		add: 'Credit Package successfully added',
		edit: 'Credit Package successfully edited',
		delete: 'Credit Package successfully deleted',
		approve: 'Credit Package successfully approved',
	},
};
