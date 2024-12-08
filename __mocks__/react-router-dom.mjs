const actualReactRouterDom = jest.requireActual("react-router-dom");

module.exports = {
	...actualReactRouterDom,
	useLocation: jest.fn().mockReturnValue({
		pathname: "/",
		search: "",
		hash: "",
		state: null,
	}),
	useMatches: jest.fn(),
};
