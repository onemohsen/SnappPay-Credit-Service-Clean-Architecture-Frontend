export default function useUrlRouteQuery () {
	function generateRequestUrl (routeQuery, page = null) {
		let result = '';
		Object.entries(routeQuery).forEach(function (queryItem, index) {
			// const a = queryItem[0] + '=' + (queryItem[0] === 'page' && page ? page : queryItem[1]);
			const a = queryItem[0] + '=' + queryItem[1];
			result += (index === 0 ? '' : '&') + a;
		});
		if (page) result += '&page=' + page;
		return result;
	}

	async function getModelWithUrlQuery (model, endpoint, routeQuery, page = null) {
		const url = page ? generateRequestUrl(routeQuery, page) : generateRequestUrl(routeQuery);
		return await model.custom(endpoint + url).get();
	}

	return { getModelWithUrlQuery, generateRequestUrl };
}
