import type { IUserMenuData } from "@/interfaces/components/navbar/IUserMenuData.ts";
import type { ReactNode } from "react";

export interface INavbar {
	userMenus?: IUserMenuData;
	notifications?: any; //Todo bildirimler veri tipi ayarlanacak
	isThemeSwitcherActive?: boolean;
	extraComponents?: ReactNode[];
}
