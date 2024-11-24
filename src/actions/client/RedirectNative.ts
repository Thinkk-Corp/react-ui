import { useRouterStore } from "@/stores/RouterStore.ts";
import { shouldBypass } from "@/utils/ShouldBypass.ts";

/**
 * Verilen URL'ye yönlendirme yapar.
 *
 * @param {string} url - Yönlendirilmek istenen URL.
 * @param {"local" | "external"} type - Yönlendirmenin türü. "local" yerel yönlendirme, "external" ise harici yönlendirme anlamına gelir.
 *
 * @returns {void} - Fonksiyon herhangi bir değer döndürmez.
 */
export function redirectNative({ url, type = "external" }: { url: string; type?: "internal" | "external" }): void {
	const router = useRouterStore.getState().router;

	if (shouldBypass([url], window.location.href)) return;

	if (router !== null && type === "internal") {
		router.navigate(url);
		return;
	}
	window.location.href = url;
}
