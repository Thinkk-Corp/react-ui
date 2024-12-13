import type { IDefaultLayout } from "@/interfaces/components/layouts/IDefaultLayout.ts";
import { useUIStore } from "@/stores/UIStore.ts";
import classNames from "classnames";
import { Outlet } from "react-router-dom";

/**
 * DefaultLayout bileşeni, uygulamanın ana layouts yapısını sağlar.
 * Bu layouts, sabit bir Sidebar (kenar çubuğu) ve Navbar (üst menü) ile ana içeriği düzenler.
 *
 * @param {IDefaultLayout} props - DefaultLayout bileşeni için gereken props.
 * @param {JSX.Element} props.sidebar - Kenar çubuğunu temsil eden JSX bileşeni.
 * @param {JSX.Element} props.navbar - Üst menüyü temsil eden JSX bileşeni.
 * @returns {JSX.Element} Ana düzen bileşeni, içerik ile birlikte Sidebar ve Navbar'ı içerir.
 */
export const DefaultLayout = ({ sidebar, navbar }: IDefaultLayout): JSX.Element => {
	// UI durum yönetimi ile kenar çubuğunun kapalı/açık durumunu alır
	const sidebarCollapsed = useUIStore((state) => state.sidebarCollapsed);

	return (
		<div data-testid={"default-layout"} className="h-screen overflow-auto flex">
			{/* Sidebar - Kenar Çubuğu */}
			<div
				data-testid={"sidebar-section"}
				data-sidebar-collapsed={sidebarCollapsed.status}
				className={classNames(
					"fixed top-0 overflow-hidden left-0 z-60 h-full duration-300 transition-all",
					"data-[sidebar-collapsed='true']:-translate-x-full",
					"data-[sidebar-collapsed='true']:md:translate-x-0",
					"data-[sidebar-collapsed='false']:md:translate-x-0",
					"w-screen data-[sidebar-collapsed='true']:md:w-[4.5rem]",
					"data-[sidebar-collapsed='false']:md:w-72",
				)}
			>
				{sidebar}
			</div>

			{/* Ana İçerik */}
			<div
				data-testid={"navbar-content-section"}
				data-sidebar-collapsed={sidebarCollapsed.status}
				className={classNames(
					"flex-1 ml-0 duration-300 overflow-x-hidden overflow-y-auto transition-all flex flex-col",
					"data-[sidebar-collapsed='false']:md:ml-72",
					"data-[sidebar-collapsed='true']:md:ml-[4.5rem]",
				)}
			>
				{/* Navbar - Üst Menü */}
				<div
					data-testid={"navbar-section"}
					data-sidebar-collapsed={sidebarCollapsed.status}
					className={classNames(
						"fixed top-0 left-0 z-50 duration-300 transition-all right-0 h-[4.5rem]",
						"data-[sidebar-collapsed='false']:md:left-72",
						"data-[sidebar-collapsed='true']:md:left-[4.5rem]",
					)}
				>
					{navbar}
				</div>
				{/* İçerik Alanı */}
				<div data-testid={"content-section"} className={"mt-[6.5rem] pb-10 px-4 lg:px-14"}>
					<Outlet />
				</div>
			</div>
		</div>
	);
};
