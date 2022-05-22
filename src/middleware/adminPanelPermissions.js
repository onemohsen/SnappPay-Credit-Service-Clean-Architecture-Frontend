export default function (ctx, user, to) {
	if (!user) ctx.router.push('/login');
	const routePermissions = [
		{ name: 'admin', permissions: ['show admin'] },
		{ name: 'admin-dashboard', permissions: ['show dashboard'] },
		{ name: 'admin-users', permissions: ['show user'] },
		{ name: 'admin-users-id', permissions: ['show user'] },
		{ name: 'admin-users-edit-id', permissions: ['edit user'] },
		{ name: 'admin-users-create', permissions: ['create user'] },
		{ name: 'admin-products', permissions: ['show product'] },
		{ name: 'admin-products-id', permissions: ['show product'] },
		{ name: 'admin-products-edit-id', permissions: ['edit product'] },
		{ name: 'admin-products-create', permissions: ['create product'] },
		{ name: 'admin-transactions', permissions: ['show transaction'] },
		{ name: 'admin-transactions-id', permissions: ['show transaction'] },
		{ name: 'admin-credit-packages', permissions: ['show credit-package'] },
		{ name: 'admin-credit-packages-id', permissions: ['show credit-package'] },
		{ name: 'admin-credit-packages-edit-id', permissions: ['edit credit-package'] },
		{ name: 'admin-credit-packages-create', permissions: ['create credit-package'] },
		{ name: 'admin-buy-product', permissions: ['create transaction'] },
		{ name: 'admin-activation-credit-package', permissions: ['create transaction'] },

		{ name: 'admin-', permissions: [''] },
	];
	const currentRoutePermission = routePermissions.find(
		item => item.name === to.name,
	);
	if (!currentRoutePermission) {
		ctx.router.push('/login');
	}
	const userPermissions = user?.permissions ? user.permissions.map(u => u.name) : [];
	const hasPermission = currentRoutePermission?.permissions.every(per =>
		userPermissions.includes(per),
	);
	if (!hasPermission) {
		ctx.router.push('/login');
	}
}
