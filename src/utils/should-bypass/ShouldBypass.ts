/**
 * Belirli bir URL'nin, geçiş listesinde yer alan yollar arasında olup olmadığını kontrol eder.
 * Eğer yol wildcard karakteri (`*`) içeriyorsa, bu karaktere uygun bir kontrol yapar.
 *
 * @param {string[]} byPassList - Geçiş yapılacak yolların listesi. Wildcard karakterleri içerebilir.
 * @param {string} url - Kontrol edilecek URL.
 * @returns {boolean} - Eğer URL geçiş listesinde yer alıyorsa `true`, aksi halde `false` döner.
 *
 * @example
 * const paths = ["/home", "/user/*"];
 * console.log(shouldBypass(paths, "https://example.com/home")); // true
 * console.log(shouldBypass(paths, "https://example.com/user/123")); // true
 * console.log(shouldBypass(paths, "https://example.com/about")); // false
 *
 * @example
 * const paths = ["/home", "/user/*"];
 * console.log(shouldBypass(paths, "/home")); // true
 * console.log(shouldBypass(paths, "/user/123")); // true
 * console.log(shouldBypass(paths, "/about")); // false
 */
export function shouldBypass(byPassList: string[], url: string): boolean {
	let urlPath: string;
	try {
		// URL'yi geçerli bir formatta olup olmadığını kontrol et
		const parsedUrl = new URL(url);
		urlPath = parsedUrl.pathname;
	} catch (_e) {
		// Eğer URL geçerli değilse, sadece verilen URL'yi yol olarak kullan
		urlPath = url;
	}

	return byPassList.some((path) => {
		// Eğer path bir wildcard içeriyorsa, buna uygun bir kontrol yapalım
		if (path.includes("*")) {
			const regex = new RegExp(`^${path.replace("*", ".*")}$`);
			return regex.test(urlPath);
		}
		// Wildcard yoksa doğrudan karşılaştıralım
		return urlPath === path;
	});
}
