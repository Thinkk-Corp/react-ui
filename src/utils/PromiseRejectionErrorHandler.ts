export const promiseRejectionErrorHandler = (event: PromiseRejectionEvent) => {
	if (!event.reason) return;
	console.error(event.reason);
};
