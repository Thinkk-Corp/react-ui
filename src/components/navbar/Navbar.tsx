import { Input } from "@/components/form/inputs/input/Input.tsx";
import { IconBox } from "@/components/icon-box/IconBox.tsx";
import { LanguageChanger } from "@/components/navbar/LanguageChanger.tsx";
import { Notifications } from "@/components/navbar/Notifications.tsx";
import { ThemeChanger } from "@/components/navbar/ThemeChanger.tsx";
import { UserMenu } from "@/components/navbar/UserMenu.tsx";
import type { INavbar } from "@/interfaces/components/navbar/INavbar.ts";
import { icons } from "@/plugins/Icons.tsx";
import { useLanguageStore } from "@/stores/LanguageStore.ts";
import { useThemeStore } from "@/stores/ThemeStore.ts";
import { useUIStore } from "@/stores/UIStore.ts";
import classNames from "classnames";

export const Navbar = ({ extraComponents, isThemeSwitcherActive = true, userMenus, notifications }: INavbar) => {
	const setSidebarCollapsed = useUIStore((state) => state.setSidebarCollapsed);
	const sidebarCollapsed = useUIStore((state) => state.sidebarCollapsed);
	const currentTheme = useThemeStore((state) => state.theme);
	const languages = useLanguageStore((state) => state.languages);

	const handleMobileMenuTriggerClick = () => {
		setSidebarCollapsed({ isLocked: sidebarCollapsed.isLocked, status: !sidebarCollapsed.status });
	};

	return (
		<div
			className={classNames("h-full bg-paper-default flex items-center justify-between gap-4 px-4 lg:px-10", {
				"shadow-3 bg-common-white": currentTheme === "light",
				"bg-sidebar-default": currentTheme === "dark",
			})}
		>
			<IconBox isHoverable color={"color-primary"} onClick={handleMobileMenuTriggerClick} className={"block md:hidden"}>
				{icons.outline.bars_3}
			</IconBox>
			<div className={"hidden md:flex items-center gap-5 w-1/2"}>
				<label htmlFor={"search-input"}>
					<IconBox color={"color-primary"} isHoverable>
						{icons.outline.search}
					</IconBox>
				</label>
				<Input id={"search-input"} className={"w-full"} placeholder={"Arama yap..."} />
			</div>
			<div className={"flex items-center gap-2 md:gap-4 border-l border-custom-divider pl-4"}>
				{isThemeSwitcherActive && <ThemeChanger />}
				{notifications && <Notifications />}
				{languages && languages.length > 0 && <LanguageChanger />}
				{userMenus && userMenus.menus.length > 0 && <UserMenu data={userMenus} />}
				{extraComponents?.map((content) => content)}
			</div>
		</div>
	);
};
