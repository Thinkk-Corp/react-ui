import type { ISidebarMenu } from "@/interfaces/components/sidebar/ISidebarMenu.ts";
import { icons } from "@/plugins/Icons.tsx";

export default [
	{
		isLabel: true,
		text: "Label 1",
	},
	{ text: "Menu 1", icon: icons.outline.check, action: "/" },
] as ISidebarMenu[];
