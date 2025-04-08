export const fetchData = async (url, method, payload) => {
	const requestHeaders = new Headers();
	requestHeaders.set("Content-Type", "application/json");

	const res = await fetch(url, {
		body: payload ? JSON.stringify(payload) : undefined,
		headers: requestHeaders,
		method,
	});

	const response_object = await res.json();

	return response_object;
};