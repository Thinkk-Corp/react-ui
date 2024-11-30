module.exports = {
	...jest.requireActual("@/actions/client/RedirectNative.ts"),
	redirectNative: jest.fn(),
};
