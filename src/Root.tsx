import type { IRoot } from "@/interfaces/IRoot.ts";
import { getI18nInstance, initI18n } from "@/plugins/I18n.ts";
import { useRouterStore } from "@/stores/RouterStore.ts";
import { useThemeStore } from "@/stores/ThemeStore.ts";
import { useUIStore } from "@/stores/UIStore.ts";
import { promiseRejectionErrorHandler } from "@/utils/PromiseRejectionErrorHandler.ts";
import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { I18nextProvider } from "react-i18next";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

/**
 * Uygulamanın kök bileşeni. Temalar, dil seçenekleri ve yönlendirme gibi
 * temel yapılandırmaları içerir.
 *
 * @param {IRoot} param0 - `routes` ve `languageTranslations` özelliklerini içeren yapılandırma nesnesi.
 * @returns {JSX.Element} - Root bileşeni.
 */
export const Root = ({ routes, languageTranslations }: IRoot): JSX.Element => {
	const setRouter = useRouterStore((state) => state.setRouter);
	const router = useRouterStore((state) => state.router);
	const initTheme = useThemeStore((state) => state.initTheme);
	const initSidebarCollapsedStatus = useUIStore((state) => state.initSidebarCollapsedStatus);

	useEffect(() => {
		/**
		 * Uygulama başlatma işlevi. Temalar, dil yapılandırması ve yönlendirmeyi başlatır.
		 */
		const initializeApp = async () => {
			initTheme();
			initSidebarCollapsedStatus();
			await initI18n(languageTranslations, "tr");
			const newRouter = createBrowserRouter(routes, {
				future: {
					v7_relativeSplatPath: true,
					v7_fetcherPersist: true,
					v7_normalizeFormMethod: true,
					v7_partialHydration: true,
					v7_skipActionErrorRevalidation: true,
				},
			});
			setRouter(newRouter);
		};

		initializeApp();

		// Promise hatalarını yönetmek için event dinleyicisi ekler
		const handlePromiseRejections = (event: PromiseRejectionEvent) => {
			promiseRejectionErrorHandler(event);
		};

		window.addEventListener("unhandledrejection", handlePromiseRejections);
		window.addEventListener("rejectionhandled", handlePromiseRejections);

		return () => {
			window.removeEventListener("unhandledrejection", handlePromiseRejections);
			window.removeEventListener("rejectionhandled", handlePromiseRejections);
		};
	}, [routes, languageTranslations, setRouter, initTheme, initSidebarCollapsedStatus]);

	return (
		<I18nextProvider i18n={getI18nInstance()}>
			<ErrorBoundary fallback={<div>Bir hata oluştu</div>}>
				{router ? <RouterProvider future={{ v7_startTransition: true }} router={router} /> : null}
			</ErrorBoundary>
		</I18nextProvider>
	);
};
