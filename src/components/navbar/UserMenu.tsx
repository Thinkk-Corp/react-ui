import { Avatar } from "@/components/Avatar.tsx";
import { IconBox } from "@/components/IconBox.tsx";
import { Dropdown } from "@/components/dropdown/Dropdown.tsx";
import type { IDropdownStyle } from "@/interfaces/components/dropdown/IDropdown.ts";
import type { IUserMenu } from "@/interfaces/components/navbar/IUserMenu.ts";
import type { IUserMenuData } from "@/interfaces/components/navbar/IUserMenuData.ts";
import { redirectNative } from "@/utils/RedirectNative.ts";

export const UserMenu = ({ data }: { data: IUserMenuData }) => {
	const dropdownStyleConfig: IDropdownStyle = {
		trigger: {
			defaultStyleActive: false,
			customStyle: "cursor-pointer",
		},
		menu: {
			defaultStyleActive: true,
			customStyle: "mt-4",
		},
	};

	const handleMenuClick = (action: IUserMenu["action"]) => {
		if (typeof action === "string") {
			return redirectNative({ url: action, type: "internal" });
		}
		action();
	};

	return (
		<Dropdown size={"lg"} styles={dropdownStyleConfig} position={"bottom-left"}>
			<Dropdown.Trigger>
				<Avatar className={"hidden md:block"} image={data.avatar ?? "/media/man2.webp"} alt={"user"} />
			</Dropdown.Trigger>
			<Dropdown.Item style={{ defaultStyleActive: false, customStyle: "p-3" }}>
				<h4 className={"text-h4"}>{data.username}</h4>
				<p className={"text-subtitle2"}>{data.email}</p>
			</Dropdown.Item>
			{data.menus.length > 0 &&
				data.menus.map((menu,index) => (
					<Dropdown.Item key={index.toString()}>
						<div onKeyDown={() => {}} onClick={() => handleMenuClick(menu.action)} className={"flex items-center gap-4"}>
							<IconBox>{menu.icon}</IconBox>
							<p>{menu.text}</p>
						</div>
					</Dropdown.Item>
				))}
		</Dropdown>
	);
};
