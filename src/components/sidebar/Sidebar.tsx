import { SidebarMenus } from "@/components/sidebar/SidebarMenus.tsx";
import type { ISidebar } from "@/interfaces/components/sidebar/ISidebar.ts";
import { icons } from "@/plugins/Icons.tsx";
import { useUIStore } from "@/stores/UIStore.ts";
import { mediaQueryUtil } from "@/utils/media-query-util/MediaQueryUtil.ts";
import classNames from "classnames";
import { useCallback, useEffect, useState } from "react";

export const Sidebar = ({ logo, collapsedLogo, menus }: ISidebar) => {
	const setSidebarCollapsed = useUIStore((state) => state.setSidebarCollapsed);
	const sidebarCollapsed = useUIStore((state) => state.sidebarCollapsed);
	const [isMdScreen, setIsMdScreen] = useState<boolean>(true);
	const [hasRendered, setHasRendered] = useState<boolean>(false);

	/**
	 * Sidebar'ın daraltılmış ya da genişletilmiş durumu arasında geçiş yapar.
	 */
	const handleSidebarCollapse = useCallback(() => {
		setSidebarCollapsed({
			isLocked: !sidebarCollapsed.isLocked,
			status: isMdScreen ? sidebarCollapsed.status : !sidebarCollapsed.status,
		});
	}, [isMdScreen, sidebarCollapsed.isLocked, setSidebarCollapsed, sidebarCollapsed.status]);

	/**
	 * Sidebar üzerinde fareyle gezinme durumuna göre daraltma ya da genişletme durumu arasında geçiş yapar.
	 *
	 * @param {boolean} [hovered] - Sidebar üzerinde fareyle gezilip gezilmediğini belirtir.
	 */
	const handleSidebarHover = useCallback(
		(hovered: boolean) => {
			// Eğer ekran büyük değilse veya sidebar kilitliyse, işleme devam etme
			if (!isMdScreen || (!sidebarCollapsed.status && sidebarCollapsed.isLocked)) return;

			// Eğer hover kaldırıldıysa, sidebar'ı sabit duruma getir
			if (!hovered) {
				setSidebarCollapsed({ isLocked: false, status: true });
				return;
			}

			// Eğer hover başlatıldıysa, sidebar durumunu tersine çevir
			setSidebarCollapsed({ isLocked: false, status: false });
		},
		[isMdScreen, setSidebarCollapsed, sidebarCollapsed.status, sidebarCollapsed.isLocked],
	);

	/**
	 * Ekran boyutunu kontrol eden fonksiyon
	 */
	const handleScreenSize = useCallback(() => {
		const mediaQueryResult = mediaQueryUtil("md") as boolean;
		setIsMdScreen(mediaQueryResult);
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
		if (isMdScreen) return;
		setSidebarCollapsed({ isLocked: false, status: true });
	}, [isMdScreen]);

	useEffect(() => {
		setHasRendered(true);
	}, []);

	return (
		<div
			data-testid={"sidebar"}
			className="flex h-screen flex-col justify-between border-e border-sidebar-border bg-sidebar-default"
			onMouseEnter={() => handleSidebarHover(true)}
			onMouseLeave={() => handleSidebarHover(false)}
		>
			<div className="px-4 py-6">
				<div
					data-testid={"sidebar-header"}
					data-sidebar-collapsed={sidebarCollapsed.status}
					className={classNames(
						"duration-300 flex items-center mb-10 md:justify-center",
						"data-[sidebar-collapsed='false']:justify-between",
					)}
				>
					<div>
						{sidebarCollapsed.status && isMdScreen
							? collapsedLogo && (
									<img alt={"logo"} data-testid={"sidebar-collapsed-logo"} className={"h-10"} src={collapsedLogo} />
								)
							: logo && <img data-testid={"sidebar-logo"} alt={"logo"} className={"h-10"} src={logo} />}
					</div>

					{!sidebarCollapsed.status && (
						<div
							data-testid={"sidebar-collapsed-trigger"}
							onKeyDown={() => {}}
							className={"size-5 text-sidebar-item-active-color cursor-pointer"}
							onClick={handleSidebarCollapse}
						>
							{icons.outline[!isMdScreen ? "x" : sidebarCollapsed.isLocked ? "arrows_pointing_in" : "arrows_pointing_out"]}
						</div>
					)}
				</div>
				<ul data-testid={"sidebar-menu-list"}>
					<SidebarMenus menus={menus} hasRendered={hasRendered} />
				</ul>
			</div>
		</div>
	);
};
