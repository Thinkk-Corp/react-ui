import { IconBox } from "@/components/IconBox.tsx";
import { Input } from "@/components/inputs/Input.tsx";
import { Notifications } from "@/components/navbar/Notifications.tsx";
import { ThemeChanger } from "@/components/navbar/ThemeChanger.tsx";
import { UserMenu } from "@/components/navbar/UserMenu.tsx";
import { icons } from "@/plugins/Icons.tsx";
import { useThemeStore } from "@/stores/ThemeStore.ts";
import { useUIStore } from "@/stores/UIStore.ts";
import classNames from "classnames";

export const Navbar = () => {
	const setSidebarCollapsed = useUIStore((state) => state.setSidebarCollapsed);
	const sidebarCollapsed = useUIStore((state) => state.sidebarCollapsed);
	const currentTheme = useThemeStore((state) => state.theme);

	const handleMobileMenuTriggerClick = () => {
		setSidebarCollapsed({ isLocked: sidebarCollapsed.isLocked, status: !sidebarCollapsed.status });
	};

	return (
		<div
			className={classNames("h-full bg-paper-default flex items-center justify-between gap-4 px-4 lg:px-10", {
				"shadow-md": currentTheme === "light",
				"border-b border-custom-divider": currentTheme === "dark",
			})}
		>
			<IconBox isHoverable onKeyDown={() => {}} onClick={handleMobileMenuTriggerClick} className={"block md:hidden "}>
				{icons.outline.bars_3}
			</IconBox>
			<div className={"hidden md:flex items-center gap-5 w-1/2"}>
				<label htmlFor={"search-input"}>
					<IconBox isHoverable>{icons.outline.search}</IconBox>
				</label>
				<Input id={"search-input"} placeholder={"Arama yap..."} />
			</div>
			<div className={"flex items-center gap-2 md:gap-5 border-l border-custom-divider pl-4"}>
				<ThemeChanger />
				<Notifications />
				<UserMenu />
			</div>
		</div>
	);
};
