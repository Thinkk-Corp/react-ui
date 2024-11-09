import type { IRoot } from "@/interfaces/IRoot.ts";
import { getI18nInstance, initI18n } from "@/plugins/I18n.ts";
import { useRouterStore } from "@/stores/RouterStore.ts";
import useThemeStore from "@/stores/ThemeStore.ts";
import { useUIStore } from "@/stores/UIStore.ts";
import { promiseRejectionErrorHandler } from "@/utils/PromiseRejectionErrorHandler.ts";
import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { I18nextProvider } from "react-i18next";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

export const Root = ({ routes, languageTranslations }: IRoot) => {
	const setRouter = useRouterStore((state) => state.setRouter);
	const router = useRouterStore((state) => state.router);
	const initTheme = useThemeStore((state) => state.initTheme);
	const initSidebarCollapsedStatus = useUIStore((state) => state.initSidebarCollapsedStatus);

	useEffect(() => {
		const initializeApp = async () => {
			initTheme();
			initSidebarCollapsedStatus();
			await initI18n(languageTranslations, "tr");
			const newRouter = createBrowserRouter(routes);
			setRouter(newRouter);
		};

		initializeApp();

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
			<ErrorBoundary fallback={<div>hata</div>}>{router ? <RouterProvider router={router} /> : null}</ErrorBoundary>
		</I18nextProvider>
	);
};
