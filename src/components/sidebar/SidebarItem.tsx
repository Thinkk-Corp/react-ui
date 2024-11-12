import type { ISidebarMenuAction, ISidebarMenuItem } from "@/interfaces/components/sidebar/ISidebarMenu.ts";
import { useUIStore } from "@/stores/UIStore.ts";
import { generateId } from "@/utils/GenerateId.ts";
import { redirectNative } from "@/utils/RedirectNative.ts";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

/**
 * Menüyü render eden yardımcı fonksiyon. Menü öğelerini sıralı bir liste olarak render eder.
 *
 * @param {ISidebarMenuItem} menu - Render edilecek menü öğesi.
 * @param isChild
 * @returns {JSX.Element} Menü öğesi elemanını döner.
 */
export const SidebarItem = memo(({ menu, isChild }: { menu: ISidebarMenuItem; isChild?: boolean }): JSX.Element => {
	const location = useLocation();
	const sidebarCollapsed = useUIStore((s) => s.sidebarCollapsed);
	const [hasRendered, setHasRendered] = useState<boolean>(false);

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

	const key = useMemo(() => generateId(), []); // `generateId` her render'da yeniden çağrılmamalı

	useEffect(() => {
		setHasRendered(true);
	}, []);

	return (
		<li className="flex items-center gap-2" key={key} onKeyDown={() => {}} onClick={() => handleMenuClick(menu.action)}>
			<div
				data-is-child={isChild}
				data-menu-active={isActivatedMenuItem}
				className={classNames(
					"hidden w-3 h-3 border border-primary-main rounded-full",
					"data-[menu-active='true']:bg-primary-main data-[is-child='true']:block",
				)}
			/>
			<div
				data-sidebar-collapsed={sidebarCollapsed.status}
				data-menu-active={isActivatedMenuItem}
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
				{menu.icon && <span className="w-[1.5rem] h-[1.5rem]">{menu.icon}</span>}
				<AnimatePresence initial={hasRendered}>
					{!sidebarCollapsed.status && (
						<motion.span
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
		</li>
	);
});
