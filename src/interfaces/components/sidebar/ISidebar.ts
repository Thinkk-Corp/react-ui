import type { ISidebarMenu } from "@/interfaces/components/sidebar/ISidebarMenu.ts";
import type { ReactNode } from "react";

export interface ISidebar {
	logo: ReactNode;
	menus: ISidebarMenu[];
}
