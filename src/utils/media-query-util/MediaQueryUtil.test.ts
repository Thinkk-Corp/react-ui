import { extractNumberFromString, mediaQueryUtil } from "@/utils/media-query-util/MediaQueryUtil.ts"; // adjust the import path

const innerWidthDefine = (value: number) =>
	Object.defineProperty(window, "innerWidth", {
		writable: true,
		configurable: true,
		value, // Set to the 'md' breakpoint
	});

// Mock the screens object from the style file
jest.mock("@/styles/tailwind/Screens.ts", () => ({
	screens: {
		sm: "640px",
		md: "768px",
		lg: "1024px",
		xl: "1280px",
		"2xl": "1536px",
	},
}));

describe("extractNumberFromString", () => {
	it('should correctly extract number from a string with "px"', () => {
		expect(extractNumberFromString("640px")).toBe(640);
	});

	it("should return 0 when no number is present", () => {
		expect(extractNumberFromString("abc")).toBe(0);
	});

	it("should correctly extract number from a string with other units", () => {
		expect(extractNumberFromString("50em")).toBe(50);
		expect(extractNumberFromString("300%")).toBe(300);
	});
});

describe("mediaQueryUtil", () => {
	const originalWindowInnerWidth = window.innerWidth;

	beforeAll(() => innerWidthDefine(1024));

	afterAll(() => innerWidthDefine(originalWindowInnerWidth));

	it("should return correct boolean for a single size", () => {
		const result = mediaQueryUtil("md");
		expect(result).toBe(true); // Since window.innerWidth is 1024, 'md' (768px) should be true
	});

	it("should return an object with booleans for an array of sizes", () => {
		const result = mediaQueryUtil(["sm", "md", "lg"]);
		expect(result).toEqual({
			sm: true, // 640px is less than 1024px
			md: true, // 768px is less than 1024px
			lg: true, // 1024px is equal to 1024px, so it's true
		});
	});

	it("should return null if none of the sizes match the current screen width", () => {
		innerWidthDefine(500);
		const result = mediaQueryUtil(["md", "lg", "xl"]);
		expect(result).toEqual({
			md: false,
			lg: false,
			xl: false,
		});
	});

	it("should return null if the current screen width is smaller than all the sizes provided", () => {
		innerWidthDefine(500);
		const result = mediaQueryUtil("xl");
		expect(result).toBe(false); // 1280px is greater than 500px, so should return false
	});

	it("should return true if the media size is smaller or equal to the screen width", () => {
		innerWidthDefine(768);
		const result = mediaQueryUtil("sm");
		expect(result).toBe(true); // Since 640px is smaller than 768px, it should return true
	});

	it("should handle undefined or incorrect input gracefully", () => {
		const result = mediaQueryUtil(undefined as any);
		expect(result).toBeNull();
	});
});
