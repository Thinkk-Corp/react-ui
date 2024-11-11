import type { IDefaultLayout } from "@/interfaces/components/layout/IDefaultLayout.ts";
import { useUIStore } from "@/stores/UIStore.ts";
import classNames from "classnames";
import { Outlet } from "react-router-dom";

/**
 * DefaultLayout bileşeni, uygulamanın ana layout yapısını sağlar.
 * Bu layout, sabit bir Sidebar (kenar çubuğu) ve Navbar (üst menü) ile ana içeriği düzenler.
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
		<div className="h-screen overflow-auto flex">
			{/* Sidebar - Kenar Çubuğu */}
			<div
				data-sidebar-collapsed={sidebarCollapsed.status}
				className={classNames(
					"fixed top-0 left-0 z-50 h-full duration-300 transition-all",
					"data-[sidebar-collapsed='true']:-translate-x-full",
					"data-[sidebar-collapsed='true']:lg:translate-x-0",
					"data-[sidebar-collapsed='false']:lg:translate-x-0",
					"w-screen data-[sidebar-collapsed='true']:lg:w-24",
					"data-[sidebar-collapsed='false']:lg:w-72",
				)}
			>
				{sidebar}
			</div>

			{/* Ana İçerik */}
			<div
				data-sidebar-collapsed={sidebarCollapsed.status}
				className={classNames(
					"flex-1 ml-0 duration-300 transition-all px-5 lg:px-0 flex flex-col",
					"data-[sidebar-collapsed='false']:lg:ml-72",
					"data-[sidebar-collapsed='true']:lg:ml-24",
				)}
			>
				{/* Navbar - Üst Menü */}
				<div
					data-sidebar-collapsed={sidebarCollapsed.status}
					className={classNames(
						"fixed top-0 left-0 duration-300 transition-all right-0 h-16",
						"data-[sidebar-collapsed='false']:lg:left-72",
						"data-[sidebar-collapsed='true']:lg:left-24",
					)}
				>
					{navbar}
				</div>
				{/* İçerik Alanı */}
				<div className={"mt-[6.5rem] px-4 lg:px-10"}>
					<Outlet />
				</div>
			</div>
		</div>
	);
};
