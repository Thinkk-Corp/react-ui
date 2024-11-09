import type { ISidebar } from "@/interfaces/components/sidebar/ISidebar.ts";
import type { ISidebarMenuAction, ISidebarMenuItem } from "@/interfaces/components/sidebar/ISidebarMenu.ts";
import { icons } from "@/plugins/Icons.tsx";
import { useUIStore } from "@/stores/UIStore.ts";
import { generateId } from "@/utils/GenerateId.ts";
import { redirectNative } from "@/utils/RedirectNative.ts";
import classNames from "classnames";
import { useLocation } from "react-router-dom";

export const Sidebar = ({ logo, collapsedLogo, menus }: ISidebar) => {
	const location = useLocation();

	const setSidebarCollapsed = useUIStore((state) => state.setSidebarCollapsed);
	const sidebarCollapsed = useUIStore((state) => state.sidebarCollapsed);

	const isActivatedMenuItem = (action?: ISidebarMenuAction) => {
		if (typeof action !== "string") return false;
		return action === location.pathname;
	};

	const handleMenuClick = (action?: ISidebarMenuAction) => {
		if (typeof action === "string") {
			return redirectNative({ url: action, type: "internal" });
		}
		action?.();
	};

	const handleSidebarCollapse = () => {
		setSidebarCollapsed(!sidebarCollapsed);
	};

	const handleDetailsClick = () => {
		if (!sidebarCollapsed) return;
		setSidebarCollapsed(false);
	};

	const menuItemRenderer = (menu: ISidebarMenuItem) => (
		<li
			onKeyDown={() => {}}
			key={generateId()}
			data-sidebar-collapsed={sidebarCollapsed}
			data-active={isActivatedMenuItem(menu.action)}
			onClick={() => handleMenuClick(menu.action)}
			className={classNames(
				"flex items-center rounded-lg px-2 py-2.5 gap-4",
				"text-sidebar-item-color hover:text-sidebar-item-active-color",
				"data-[active='true']:text-sidebar-item-active-color",
				"data-[active='true']:bg-sidebar-item-active",
				"data-[active='false']:hover:bg-sidebar-item-hover",
				"data-[sidebar-collapsed='true']:justify-center",
				"transition-opacity duration-300",
			)}
		>
			{menu.icon && <span className={"w-[1.5rem]"}>{menu.icon}</span>}
			<span
				data-sidebar-collapsed={sidebarCollapsed}
				className={"text-nowrap text-body2 duration-300 transition-transform data-[sidebar-collapsed='true']:hidden"}
			>
				{menu.text}
			</span>
		</li>
	);

	return (
		<div className="flex h-screen flex-col justify-between border-e border-sidebar-border bg-sidebar-default">
			<div className="px-4 py-6">
				<div className={"flex items-center mb-10 justify-between"}>
					<div>
						{sidebarCollapsed
							? collapsedLogo && <img alt={"logo"} className={"h-10"} src={collapsedLogo} />
							: logo && <img alt={"logo"} className={"h-10"} src={logo} />}
					</div>

					<div
						className={"size-5 text-sidebar-item-active-color cursor-pointer data-[sidebar-collapsed='false']:rotate-180 "}
						data-sidebar-collapsed={sidebarCollapsed}
						onKeyDown={() => {}}
						onClick={handleSidebarCollapse}
					>
						{icons.outline.arrow_right_circle}
					</div>
				</div>
				<ul data-sidebar-collapsed={sidebarCollapsed} className="space-y-1 data-[sidebar-collapsed='true']:space-y-5">
					{menus &&
						menus.length > 0 &&
						menus.map((menu) => {
							if ("isLabel" in menu && menu.isLabel) {
								return (
									<li key={generateId()}>
										<span
											data-sidebar-collapsed={sidebarCollapsed}
											className={
												"text-nowrap text-body2 mt-6 data-[sidebar-collapsed='true']:hidden leading-5 text-sidebar-group-title-color"
											}
										>
											{menu.text}
										</span>
									</li>
								);
							}
							if ("children" in menu && menu.children) {
								return (
									<details
										onKeyDown={() => {}}
										onClick={handleDetailsClick}
										key={generateId()}
										className="group [&_summary::-webkit-details-marker]:hidden"
									>
										<summary
											data-sidebar-collapsed={sidebarCollapsed}
											className="flex cursor-pointer data-[sidebar-collapsed='true']:gap-3 items-center rounded-lg px-2 py-2.5 justify-between hover:bg-sidebar-item-hover text-sidebar-item-color hover:text-sidebar-item-active-color"
										>
											<div className={"flex items-center gap-4"}>
												{menu.icon && <span className={"w-[1.5rem]"}>{menu.icon}</span>}
												<span
													data-sidebar-collapsed={sidebarCollapsed}
													className={"text-sm font-medium data-[sidebar-collapsed='true']:hidden"}
												>
													{menu.text}
												</span>
											</div>
											<span
												data-sidebar-collapsed={sidebarCollapsed}
												className="shrink-0 data-[sidebar-collapsed='false']:group-open:-rotate-180 data-[sidebar-collapsed='true']:-rotate-90 transition-transform duration-300 transform size-4 "
											>
												{icons.outline.chevron_down}
											</span>
										</summary>
										<ul className="mt-2 space-y-1 px-3 text-sidebar-item-color">
											{menu.children.map((subMenu) => {
												const typedSubMenu = subMenu as ISidebarMenuItem;
												return menuItemRenderer(typedSubMenu);
											})}
										</ul>
									</details>
								);
							}
							if ("icon" in menu) {
								return menuItemRenderer(menu);
							}
						})}
				</ul>
			</div>
		</div>
	);
};
