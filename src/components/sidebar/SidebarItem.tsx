import { redirectNative } from "@/actions/client/RedirectNative.ts";
import { IconBox } from "@/components/iconbox/IconBox.tsx";
import type { ISidebarMenuAction, ISidebarMenuItem } from "@/interfaces/components/sidebar/ISidebarMenu.ts";
import { useUIStore } from "@/stores/UIStore.ts";
import classNames from "classnames";
import { useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom";

/**
 * Menüyü render eden yardımcı fonksiyon. Menü öğelerini sıralı bir liste olarak render eder.
 *
 * @param {ISidebarMenuItem} menu - Render edilecek menü öğesi.
 * @param isChild
 * @returns {JSX.Element} Menü öğesi elemanını döner.
 */
export const SidebarItem = ({ menu, isChild }: { menu: ISidebarMenuItem; isChild?: boolean }): JSX.Element => {
	const location = useLocation();
	const sidebarCollapsed = useUIStore((s) => s.sidebarCollapsed);

	// Menü öğesinin etkin olup olmadığını kontrol etmek için `useMemo` kullanımı
	const isActivatedMenuItem = useMemo(() => {
		if (typeof menu.action !== "string") return false;
		return menu.action === location.pathname;
	}, [menu.action, location.pathname]);

	// Menü öğesine tıklandığında yönlendirme işlemi için `useCallback` kullanımı
	const handleMenuClick = useCallback((action?: ISidebarMenuAction) => {
		if (typeof action === "string") {
			return redirectNative({ url: action, type: "internal" });
		}
		action?.();
	}, []);

	return (
		<li
			data-testid={"sidebar-item-container"}
			className="flex items-center gap-2"
			onKeyDown={() => {}}
			onClick={() => handleMenuClick(menu.action)}
		>
			<div
				data-testid={"sidebar-item-child-dot"}
				data-is-child={isChild}
				data-menu-active={isActivatedMenuItem}
				className={classNames(
					"hidden min-w-3 min-h-3 border border-primary-main rounded-full",
					"data-[menu-active='true']:bg-primary-main data-[is-child='true']:block",
				)}
			/>
			<div
				data-testid={"sidebar-item"}
				data-menu-active={isActivatedMenuItem}
				data-is-child={isChild}
				data-sidebar-collapsed={sidebarCollapsed.status}
				className={classNames(
					"flex rounded-lg items-center w-full px-2 py-2.5 mb-4 flex-1",
					"data-[is-child='true']:mb-0 data-[is-child='false']:mt-1",
					"text-sidebar-item-color hover:text-sidebar-item-active-color",
					"data-[menu-active='true']:text-sidebar-item-active-color",
					"data-[menu-active='true']:bg-sidebar-item-active",
					"data-[menu-active='false']:hover:bg-sidebar-item-hover",
				)}
			>
				{menu.icon && (
					<IconBox
						data-testid={"sidebar-item-icon"}
						color={"text-sidebar-item-color"}
						className={"data-[menu-active='true']:text-sidebar-item-active-color hover:text-sidebar-item-active-color"}
					>
						{menu.icon}
					</IconBox>
				)}
				<span
					data-testid={"sidebar-item-text"}
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
		</li>
	);
};
