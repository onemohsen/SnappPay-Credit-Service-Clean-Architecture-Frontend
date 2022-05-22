export default function middleware (middlewares, ctx, user, to) {
	if (!Array.isArray(middlewares)) middlewares = [middlewares];
	middlewares.forEach(async function (item) {
		const module = await import(`../middleware/${item}.js`);
		module.default(ctx, user, to);
	});
}
