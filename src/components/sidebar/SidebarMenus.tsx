import { IconBox } from "@/components/icon-box/IconBox.tsx";
import { SidebarItem } from "@/components/sidebar/SidebarItem.tsx";
import type { ISidebarMenu, ISidebarMenuItem } from "@/interfaces/components/sidebar/ISidebarMenu.ts";
import { icons } from "@/plugins/Icons.tsx";
import { useUIStore } from "@/stores/UIStore.ts";
import { mediaQueryUtil } from "@/utils/media-query-util/MediaQueryUtil.ts";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Sidebar menülerini listeleyen ve menülerin durumuna göre alt menüleri gösteren bileşen.
 * @param {Object} props - Bileşen özellikleri.
 * @param {ISidebarMenu[]} props.menus - Sidebar menüleri.
 * @param {boolean} props.hasRendered - Bileşenin ilk render edilip edilmediğini belirten flag.
 * @returns {JSX.Element} Sidebar menülerinin render edilmiş hali.
 */
export const SidebarMenus = ({
	menus,
	hasRendered,
}: { menus: ISidebarMenu[]; hasRendered?: boolean }): (JSX.Element | null)[] | undefined => {
	// Sidebar'ın çökme durumunu store'dan alıyoruz
	const sidebarCollapsed = useUIStore((state) => state.sidebarCollapsed);
	const [isMdScreen, setIsMdScreen] = useState<boolean>(true);

	useEffect(() => {
		const handleScreenSize = () => {
			setIsMdScreen(mediaQueryUtil("md") as boolean);
		};

		window.addEventListener("resize", handleScreenSize);

		return () => window.removeEventListener("resize", handleScreenSize);
	}, []);

	// Menüleri döngü ile render ediyoruz
	return menus?.map((menu, index) => {
		// Menü bir etiketse, sadece metni gösteriyoruz
		if ("isLabel" in menu && menu.isLabel) {
			return (
				<li key={index.toString()}>
					<AnimatePresence initial={hasRendered}>
						{/* Sidebar açıldığında, etiketin görünmesini sağlıyoruz */}
						{!sidebarCollapsed.status || (!isMdScreen && sidebarCollapsed.status) ? (
							<motion.div
								data-testid={"isLabel-menu"}
								initial={{ opacity: 0, height: 0 }}
								animate={{ opacity: 1, height: "auto" }}
								exit={{ opacity: 0, height: 0 }}
								transition={{ duration: 0.3 }}
								className={classNames("opacity-100 truncate text-nowrap text-body2 leading-5 text-sidebar-group-title-color")}
							>
								{menu.text}
							</motion.div>
						) : null}
					</AnimatePresence>
				</li>
			);
		}

		// Menüde çocuklar (alt menüler) varsa, bunları detaylı şekilde gösteriyoruz
		if ("children" in menu && menu.children && !sidebarCollapsed.status) {
			return (
				<details
					data-testid={"dropdown-menu"}
					key={index.toString()}
					className="mb-4 group [&_summary::-webkit-details-marker]:hidden"
				>
					<summary
						data-testid={"dropdown-menu-trigger"}
						className={classNames(
							"flex cursor-pointer items-center rounded-lg mb-1 mt-1 px-2 py-2.5",
							"hover:text-sidebar-item-active-color justify-between hover:bg-sidebar-item-hover text-sidebar-item-color",
						)}
					>
						{/* Menü ikonu ve başlık */}
						<div className="flex items-center overflow-hidden">
							{menu.icon && (
								<IconBox
									data-testid={"dropdown-menu-trigger-icon"}
									color={"text-sidebar-item-color"}
									className={"hover:text-sidebar-item-active-color"}
								>
									{menu.icon}
								</IconBox>
							)}
							<span
								data-testid={"dropdown-menu-trigger-text"}
								data-sidebar-collapsed={sidebarCollapsed.status}
								className={classNames(
									"text-nowrap truncate leading-5 text-body2 opacity-100",
									"transition-all duration-300", // Tüm geçişlere animasyon uygulanacak
									"data-[sidebar-collapsed='true']:md:scale-x-0 origin-left data-[sidebar-collapsed='true']:md:opacity-0", // collapsed durumunda width 0 ve opacity 0 olacak
									{ "ml-4": menu.icon && !sidebarCollapsed.status }, // margin sağda icon varsa
								)}
							>
								{menu.text}
							</span>
						</div>
						{/* Çökme durumu ve ok simgesi */}
						<span
							data-testid={"dropdown-menu-trigger-chevron-icon"}
							data-sidebar-collapsed={sidebarCollapsed.status}
							className={classNames(
								"shrink-0 transition-all duration-300 transform size-4",
								"data-[sidebar-collapsed='false']:group-open:-rotate-180",
								"data-[sidebar-collapsed='true']:md:hidden",
							)}
						>
							{icons.outline.chevron_down}
						</span>
					</summary>
					{/* Çocuk menüler (alt menüler) */}
					<ul data-testid={"dropdown-menu-list"} className="mt-1 pl-[0.79rem] space-y-1 text-sidebar-item-color">
						{menu.children.map((subMenu, subIndex) => (
							<SidebarItem key={`${index.toString()}-${subIndex.toString()}`} menu={subMenu as ISidebarMenuItem} isChild={true} />
						))}
					</ul>
				</details>
			);
		}

		// Eğer menüde icon varsa, SidebarItem bileşeni ile gösteriyoruz
		if ("icon" in menu && menu.icon) {
			return <SidebarItem data-test-id={"menu"} key={index.toString()} isChild={false} menu={menu} />;
		}

		// Menü geçerli değilse, null döndürüyoruz
		return null;
	});
};
