/**
 * Sidebar bileşeni.
 * Kullanıcının uygulama içerisindeki sayfalara erişmesini sağlayan menüyü render eder.
 *
 * @param {ISidebar} props - Sidebar bileşenine iletilen `logo`, `collapsedLogo` ve `menus` özelliklerini içerir.
 */

import type { ISidebar } from "@/interfaces/components/sidebar/ISidebar.ts";
import type { ISidebarMenuAction, ISidebarMenuItem } from "@/interfaces/components/sidebar/ISidebarMenu.ts";
import { icons } from "@/plugins/Icons.tsx";
import { useUIStore } from "@/stores/UIStore.ts";
import { generateId } from "@/utils/GenerateId.ts";
import { mediaQueryUtil } from "@/utils/MediaQueryUtil.ts";
import { redirectNative } from "@/utils/RedirectNative.ts";
import classNames from "classnames";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const Sidebar = ({ logo, collapsedLogo, menus }: ISidebar) => {
	const location = useLocation();
	const setSidebarCollapsed = useUIStore((state) => state.setSidebarCollapsed);
	const sidebarCollapsed = useUIStore((state) => state.sidebarCollapsed);

	const [isLgScreen, setIsLgScreen] = useState<boolean>(true);

	/**
	 * Belirli bir menü öğesinin etkin olup olmadığını kontrol eder.
	 *
	 * @param {ISidebarMenuAction} action - Menü öğesinin işlevini ifade eden `action`.
	 * @returns {boolean} Menünün etkin olup olmadığını belirtir.
	 */
	const isActivatedMenuItem = (action?: ISidebarMenuAction): boolean => {
		if (typeof action !== "string") return false;
		return action === location.pathname;
	};

	/**
	 * Menü öğesine tıklandığında çağrılır ve yönlendirme işlemini gerçekleştirir.
	 *
	 * @param {ISidebarMenuAction} action - Menü öğesinin yönlendirme veya işlevini ifade eden `action`.
	 */
	const handleMenuClick = (action?: ISidebarMenuAction) => {
		if (typeof action === "string") {
			return redirectNative({ url: action, type: "internal" });
		}
		action?.();
	};

	/**
	 * Sidebar'ın daraltılmış ya da genişletilmiş durumu arasında geçiş yapar.
	 */
	const handleSidebarCollapse = () => {
		setSidebarCollapsed({
			isLocked: !sidebarCollapsed.isLocked,
			status: isLgScreen ? sidebarCollapsed.status : !sidebarCollapsed.status,
		});
	};

	/**
	 * Sidebar üzerinde fareyle gezinme durumuna göre daraltma ya da genişletme durumu arasında geçiş yapar.
	 *
	 * @param {boolean} [hovered] - Sidebar üzerinde fareyle gezilip gezilmediğini belirtir.
	 */
	const handleSidebarHover = (hovered: boolean) => {
		if ((sidebarCollapsed.isLocked && !sidebarCollapsed.status) || !isLgScreen) return null;
		if (!hovered) setSidebarCollapsed({ isLocked: false, status: true });
		setSidebarCollapsed({ isLocked: false, status: !hovered });
	};

	/**
	 * Menüyü render eden yardımcı fonksiyon. Menü öğelerini sıralı bir liste olarak render eder.
	 *
	 * @param {ISidebarMenuItem} menu - Render edilecek menü öğesi.
	 * @param isChild
	 * @returns {JSX.Element} Menü öğesi elemanını döner.
	 */
	const menuItemRenderer = ({ menu, isChild }: { menu: ISidebarMenuItem; isChild?: boolean }): JSX.Element => (
		<li
			className={"flex items-center gap-2"}
			key={generateId()}
			onKeyDown={() => {}}
			onClick={() => handleMenuClick(menu.action)}
		>
			<div
				data-is-child={isChild}
				data-menu-active={isActivatedMenuItem(menu.action)}
				className={classNames(
					"hidden w-3 h-3 border border-primary-main  rounded-full",
					"data-[menu-active='true']:bg-primary-main data-[is-child='true']:block",
				)}
			/>
			<div
				data-sidebar-collapsed={sidebarCollapsed.status}
				data-menu-active={isActivatedMenuItem(menu.action)}
				data-is-child={isChild}
				className={classNames(
					"flex items-center rounded-lg px-2 py-2.5 mb-4 mt-1 gap-4 flex-1",
					"data-[is-child='true']:mb-0 data-[is-child='true']:mt-1",
					"text-sidebar-item-color hover:text-sidebar-item-active-color",
					"data-[menu-active='true']:text-sidebar-item-active-color",
					"data-[menu-active='true']:bg-sidebar-item-active",
					"data-[menu-active='false']:hover:bg-sidebar-item-hover",
					"data-[sidebar-collapsed='true']:lg:justify-center",
					"transition-opacity duration-300",
				)}
			>
				{menu.icon && <span className={"w-[1.5rem]"}>{menu.icon}</span>}
				<span
					data-sidebar-collapsed={sidebarCollapsed.status}
					className={classNames(
						"text-nowrap leading-5 text-body2 duration-300 transition-transform",
						"data-[sidebar-collapsed='true']:lg:hidden",
					)}
				>
					{menu.text}
				</span>
			</div>
		</li>
	);

	/**
	 * Ekran boyutunu kontrol eden fonksiyon
	 */
	const handleScreenSize = useCallback(() => {
		const mediaQueryResult = mediaQueryUtil("lg") as boolean;
		setIsLgScreen(mediaQueryResult);
	}, []);

	/**
	 * Ekran boyutu değişikliğini yakalayan listener effecti
	 */
	useEffect(() => {
		handleScreenSize();
		window.addEventListener("resize", handleScreenSize);

		return () => {
			window.removeEventListener("resize", handleScreenSize);
		};
	}, [handleScreenSize]);

	/**
	 * Ekran boyutu lg olduğunda sidebar collapse statusunu güncelleyen effect
	 */
	useEffect(() => {
		if (isLgScreen) return;
		setSidebarCollapsed({ isLocked: false, status: true });
	}, [isLgScreen]);

	return (
		<div
			className="flex h-screen flex-col justify-between border-e border-sidebar-border bg-sidebar-default"
			onMouseEnter={() => handleSidebarHover(true)}
			onMouseLeave={() => handleSidebarHover(false)}
		>
			<div className="px-4 py-6">
				<div
					data-sidebar-collapsed={sidebarCollapsed.status}
					className={classNames("flex items-center mb-10 lg:justify-center", "data-[sidebar-collapsed='false']:justify-between")}
				>
					<div>
						{sidebarCollapsed.status && isLgScreen
							? collapsedLogo && <img alt={"logo"} className={"h-10"} src={collapsedLogo} />
							: logo && <img alt={"logo"} className={"h-10"} src={logo} />}
					</div>

					{!sidebarCollapsed.status && (
						<div
							className={"size-5 text-sidebar-item-active-color cursor-pointer"}
							onKeyDown={() => {}}
							onClick={handleSidebarCollapse}
						>
							{icons.outline[!isLgScreen ? "x" : sidebarCollapsed.isLocked ? "arrows_pointing_in" : "arrows_pointing_out"]}
						</div>
					)}
				</div>
				<ul data-sidebar-collapsed={sidebarCollapsed.status} className={"data-[sidebar-collapsed='true']:lg:space-y-5"}>
					{menus &&
						menus.length > 0 &&
						menus.map((menu) => {
							if ("isLabel" in menu && menu.isLabel) {
								return (
									<li key={generateId()}>
										<span
											data-sidebar-collapsed={sidebarCollapsed.status}
											className={
												"text-nowrap text-body2 data-[sidebar-collapsed='true']:lg:hidden leading-5 text-sidebar-group-title-color"
											}
										>
											{menu.text}
										</span>
									</li>
								);
							}
							if ("children" in menu && menu.children) {
								return (
									<details key={generateId()} className="group [&_summary::-webkit-details-marker]:hidden">
										<summary
											data-sidebar-collapsed={sidebarCollapsed.status}
											className={classNames(
												"flex cursor-pointer items-center rounded-lg my-1 px-2 py-2.5",
												"hover:text-sidebar-item-active-color justify-between hover:bg-sidebar-item-hover text-sidebar-item-color",
												"data-[sidebar-collapsed='true']:gap-3",
											)}
										>
											<div className={"flex items-center gap-4"}>
												{menu.icon && <span className={"w-[1.5rem]"}>{menu.icon}</span>}
												<span
													data-sidebar-collapsed={sidebarCollapsed.status}
													className={"text-sm font-medium data-[sidebar-collapsed='true']:lg:hidden"}
												>
													{menu.text}
												</span>
											</div>
											<span
												data-sidebar-collapsed={sidebarCollapsed.status}
												className={classNames(
													"shrink-0 transition-transform duration-300 transform size-4",
													" data-[sidebar-collapsed='false']:group-open:-rotate-180",
													"data-[sidebar-collapsed='true']:lg:-rotate-90",
												)}
											>
												{icons.outline.chevron_down}
											</span>
										</summary>
										<ul className="mt-1 pl-[0.79rem] space-y-1 text-sidebar-item-color">
											{menu.children.map((subMenu) => {
												const typedSubMenu = subMenu as ISidebarMenuItem;
												return menuItemRenderer({ menu: typedSubMenu, isChild: true });
											})}
										</ul>
									</details>
								);
							}
							if ("icon" in menu) {
								return menuItemRenderer({ menu });
							}
						})}
				</ul>
			</div>
		</div>
	);
};
