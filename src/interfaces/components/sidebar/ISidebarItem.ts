import type { ISidebarMenuItem } from "./ISidebarMenu";

export interface ISidebarItem {
	menu: ISidebarMenuItem;
	isChild?: boolean;
    isActivated?:boolean;
}
