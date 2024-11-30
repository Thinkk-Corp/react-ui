import { shouldBypass } from "@/utils/should-bypass/ShouldBypass.ts"; // uygun yolu belirtin

describe("shouldBypass", () => {
	it("should return true when the URL matches exactly with a path", () => {
		const paths = ["/home", "/user/*"];
		expect(shouldBypass(paths, "/home")).toBe(true); // Tam eşleşme, true dönecek
	});

	it("should return true when the URL matches a path with a wildcard", () => {
		const paths = ["/home", "/user/*"];
		expect(shouldBypass(paths, "/user/123")).toBe(true); // /user/* ile eşleşme, true dönecek
	});

	it("should return false when the URL doesn't match any paths", () => {
		const paths = ["/home", "/user/*"];
		expect(shouldBypass(paths, "/about")).toBe(false); // Hiçbir yol eşleşmediği için false dönecek
	});

	it("should return true when the wildcard path matches any URL with the same base", () => {
		const paths = ["/home", "/user/*"];
		expect(shouldBypass(paths, "/user/456")).toBe(true); // /user/* ile eşleşme, true dönecek
	});

	it("should return false if the URL is a different base", () => {
		const paths = ["/home", "/user/*"];
		expect(shouldBypass(paths, "/contact")).toBe(false); // /contact, listede yok, false dönecek
	});

	it("should handle URLs with query parameters", () => {
		const paths = ["/user/*"];
		expect(shouldBypass(paths, "/user/123?name=jest-config")).toBe(true); // URL yoluyla eşleşme, true dönecek
	});

	it("should return false for invalid URLs", () => {
		const paths = ["/home"];
		expect(shouldBypass(paths, "invalid-url")).toBe(false); // Geçersiz URL, false dönecek
	});

	it("should return false if the path has no wildcard and the URL is different", () => {
		const paths = ["/home", "/user/*"];
		expect(shouldBypass(paths, "/about")).toBe(false); // /about, /home veya /user/* ile eşleşmez, false döner
	});
});
