import type { IRoot } from "@/interfaces/IRoot.ts";
import type { ICustomHandle } from "@/interfaces/plugins/ICustomRouteObject";
import { initI18n } from "@/plugins/i18n/I18N";
import { useRouterStore } from "@/stores/RouterStore.ts";
import { useThemeStore } from "@/stores/ThemeStore.ts";
import { useUIStore } from "@/stores/UIStore.ts";
import { promiseRejectionErrorHandler } from "@/utils/PromiseRejectionErrorHandler.ts";
import type { RouterState } from "@remix-run/router";
import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { type RouteObject, RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Tooltip } from "react-tooltip";

/**
 * Uygulamanın kök bileşeni. Temalar, dil seçenekleri ve yönlendirme gibi
 * temel yapılandırmaları içerir.
 *
 * @param {IRoot} - `routes` ve `languageTranslations` özelliklerini içeren yapılandırma nesnesi.
 * @returns {JSX.Element} - Root bileşeni.
 */
export const Root = ({ routes, languageTranslations, configs }: IRoot): JSX.Element => {
	const setRouter = useRouterStore((state) => state.setRouter);
	const router = useRouterStore((state) => state.router);
	const initTheme = useThemeStore((state) => state.initTheme);
	const initSidebarCollapsedStatus = useUIStore((state) => state.initSidebarCollapsedStatus);
	const pageTitlePrefix = configs.pageTitlePrefix;

	useEffect(() => {
		const initializeLocalization = async () => {
			if (!languageTranslations || languageTranslations.length === 0) return;
			await initI18n(languageTranslations);
		};

		initializeLocalization();

		/**
		 * Uygulama başlatma işlevi. Temalar, dil yapılandırması ve yönlendirmeyi başlatır.
		 */
		const initializeApp = async () => {
			// Tema ve Sidebar durumlarını başlat
			initTheme();
			initSidebarCollapsedStatus();

			// Yeni Router'ı oluştur
			const newRouter = createBrowserRouter(routes as RouteObject[], {
				future: {
					v7_relativeSplatPath: true,
					v7_fetcherPersist: true,
					v7_normalizeFormMethod: true,
					v7_partialHydration: true,
					v7_skipActionErrorRevalidation: true,
				},
			});

			// Router'ı kaydet
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
	}, [routes, setRouter, initTheme, initSidebarCollapsedStatus]);

	useEffect(() => {
		if (!router) return;

		// Crumb verisinden aktif sayfa başlığını al
		const handlePageTitle = (routerState: RouterState) => {
			if (!routerState.matches?.length) return;

			const { pathname } = routerState.location;

			// Mevcut rotayı matches içinde bul
			const currentMatch = routerState.matches.find((match) => match.pathnameBase === pathname);

			if (!currentMatch) return;

			const handle = currentMatch.route.handle as ICustomHandle;

			// Crumb objesi ve title kontrolü
			const crumb = handle?.crumb;
			if (!crumb?.title?.trim() || !crumb?.path?.trim()) return;

			document.title = `${pageTitlePrefix} | ${crumb.title}`;
		};

		handlePageTitle(router.state);

		router.subscribe((state) => handlePageTitle(state));
	}, [router, pageTitlePrefix, languageTranslations]);

	return (
		<ErrorBoundary fallback={<div>Bir hata oluştu</div>}>
			{router ? <RouterProvider future={{ v7_startTransition: true }} router={router} /> : null}
			<ToastContainer />
			<Tooltip positionStrategy="fixed" place="bottom" id="global-tooltip" />
		</ErrorBoundary>
	);
};
