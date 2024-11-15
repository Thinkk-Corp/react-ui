import type { ReactNode } from "react";

export type ISidebarMenuAction = string | (() => void);

export interface ISidebarMenuItem {
	text: string;

	icon: ReactNode;

	action?: ISidebarMenuAction;

	children?: Pick<ISidebarMenuItem, "text" | "action">[];
}

export interface ISidebarMenuLabel {
	isLabel: true;

	text: string;
}

export type ISidebarMenu = ISidebarMenuItem | ISidebarMenuLabel;
