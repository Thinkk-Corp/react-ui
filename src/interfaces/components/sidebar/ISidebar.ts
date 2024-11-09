import type { ISidebarMenu } from "@/interfaces/components/sidebar/ISidebarMenu.ts";

export interface ISidebar {
	logo: string;
	collapsedLogo: string;
	menus: ISidebarMenu[];
}
