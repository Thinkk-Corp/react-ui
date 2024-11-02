import type { ISidebarMenu } from "@/interfaces/components/sidebar/ISidebarMenu.ts";
import { icons } from "@/plugins/Icons.tsx";
import { generateId } from "@/utils/GenerateId.ts";
import { redirectNative } from "@/utils/RedirectNative.ts";

export const SidebarMenuRenderer = ({ menus }: { menus: ISidebarMenu[] }) => {
	const handleMenuClick = (action: ISidebarMenu["action"]) => {
		if (typeof action === "string") {
			return redirectNative({ url: action });
		}
		action?.();
	};

	if (!menus || menus.length === 0) return null;
	return menus.map((menu) => {
		if (menu.isLabel) {
			return (
				<li>
					<p className={"text-body2 leading-8 text-color-primary"}>{menu.text}</p>
				</li>
			);
		}
		if (menu.children && menu.children.length > 0) {
			return (
				<details className="group [&_summary::-webkit-details-marker]:hidden">
					<summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
						<span className="text-sm font-medium">{menu.text}</span>
						<span className="shrink-0 transition duration-300 size-5 group-open:-rotate-180">{icons.outline.chevron_down}</span>
					</summary>
					<ul className="mt-2 space-y-1 px-4">
						{menu.children.map((subMenu) => (
							<li className={"flex items-center gap-4"} key={generateId()}>
								{subMenu.icon && <span className={"size-5"}>{subMenu.icon}</span>}
								<p
									onKeyDown={() => {}}
									onClick={() => handleMenuClick(subMenu.action)}
									className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
								>
									{subMenu.text}
								</p>
							</li>
						))}
					</ul>
				</details>
			);
		}
	});
};
