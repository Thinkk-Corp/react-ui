import "@testing-library/jest-dom"; // Jest-DOM'unuzun doğru şekilde yüklendiğinden emin olun

jest.mock("@/actions/client/RedirectNative.ts");

beforeAll(() => {
	// Mock window.scrollTo before any tests run
	global.scrollTo = jest.fn();
});

afterAll(() => {
	jest.clearAllMocks();
	jest.restoreAllMocks();
});
