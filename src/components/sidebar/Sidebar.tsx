import { SidebarItem } from "@/components/sidebar/SidebarItem.tsx";
import type { ISidebar } from "@/interfaces/components/sidebar/ISidebar.ts";
import type { ISidebarMenuItem } from "@/interfaces/components/sidebar/ISidebarMenu.ts";
import { icons } from "@/plugins/Icons.tsx";
import { useUIStore } from "@/stores/UIStore.ts";
import { generateId } from "@/utils/GenerateId.ts";
import { mediaQueryUtil } from "@/utils/MediaQueryUtil.ts";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";

export const Sidebar = ({ logo, collapsedLogo, menus }: ISidebar) => {
	const setSidebarCollapsed = useUIStore((state) => state.setSidebarCollapsed);
	const sidebarCollapsed = useUIStore((state) => state.sidebarCollapsed);
	const [isLgScreen, setIsLgScreen] = useState<boolean>(true);
	const [hasRendered, setHasRendered] = useState<boolean>(false);

	/**
	 * Sidebar'ın daraltılmış ya da genişletilmiş durumu arasında geçiş yapar.
	 */
	const handleSidebarCollapse = useCallback(() => {
		setSidebarCollapsed({
			isLocked: !sidebarCollapsed.isLocked,
			status: isLgScreen ? sidebarCollapsed.status : !sidebarCollapsed.status,
		});
	}, [isLgScreen, sidebarCollapsed.isLocked, setSidebarCollapsed, sidebarCollapsed.status]);

	/**
	 * Sidebar üzerinde fareyle gezinme durumuna göre daraltma ya da genişletme durumu arasında geçiş yapar.
	 *
	 * @param {boolean} [hovered] - Sidebar üzerinde fareyle gezilip gezilmediğini belirtir.
	 */
	const handleSidebarHover = useCallback(
		(hovered: boolean) => {
			if ((sidebarCollapsed.isLocked && !sidebarCollapsed.status) || !isLgScreen) return;
			if (!hovered) setSidebarCollapsed({ isLocked: false, status: true });
			setSidebarCollapsed({ isLocked: false, status: !hovered });
		},
		[isLgScreen, setSidebarCollapsed, sidebarCollapsed.isLocked, sidebarCollapsed.status],
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

	useEffect(() => {
		setHasRendered(true);
	}, []);

	// Menülerin optimize edilmiş render'ı
	const memoizedMenus = useMemo(() => {
		return menus?.map((menu) => {
			if ("isLabel" in menu && menu.isLabel) {
				return (
					<li key={generateId()}>
						<AnimatePresence initial={hasRendered}>
							{!sidebarCollapsed.status && (
								<motion.span
									key={generateId()}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 0.3 }}
									className="text-nowrap text-body2 leading-5 text-sidebar-group-title-color"
								>
									{menu.text}
								</motion.span>
							)}
						</AnimatePresence>
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
								<AnimatePresence initial={hasRendered}>
									{!sidebarCollapsed.status && (
										<motion.span
											key={generateId()}
											initial={{ opacity: 0, width: 0 }}
											animate={{ opacity: 1, width: 100 }}
											exit={{ opacity: 0, width: 0 }}
											transition={{ duration: 0.3 }}
											className={"text-nowrap leading-5 text-body2"}
										>
											{menu.text}
										</motion.span>
									)}
								</AnimatePresence>
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
								return <SidebarItem key={generateId()} menu={typedSubMenu} isChild={true} />;
							})}
						</ul>
					</details>
				);
			}
			if ("icon" in menu) {
				return <SidebarItem key={generateId()} menu={menu} />;
			}
		});
	}, [menus, sidebarCollapsed.status]);

	return (
		<div
			className="flex h-screen flex-col justify-between border-e border-sidebar-border bg-sidebar-default"
			onMouseEnter={() => handleSidebarHover(true)}
			onMouseLeave={() => handleSidebarHover(false)}
		>
			<div className="px-4 py-6">
				<div
					data-sidebar-collapsed={sidebarCollapsed.status}
					className={classNames(
						"duration-300 flex items-center mb-10 lg:justify-center",
						"data-[sidebar-collapsed='false']:justify-between",
					)}
				>
					<div>
						{sidebarCollapsed.status && isLgScreen
							? collapsedLogo && <img alt={"logo"} className={"h-10"} src={collapsedLogo} />
							: logo && <img alt={"logo"} className={"h-10"} src={logo} />}
					</div>

					{!sidebarCollapsed.status && (
						<div
							onKeyDown={() => {}}
							className={"size-5 text-sidebar-item-active-color cursor-pointer"}
							onClick={handleSidebarCollapse}
						>
							{icons.outline[!isLgScreen ? "x" : sidebarCollapsed.isLocked ? "arrows_pointing_in" : "arrows_pointing_out"]}
						</div>
					)}
				</div>
				<ul
					data-sidebar-collapsed={sidebarCollapsed.status}
					className={"duration-300 data-[sidebar-collapsed='true']:lg:space-y-5"}
				>
					{memoizedMenus}
				</ul>
			</div>
		</div>
	);
};
