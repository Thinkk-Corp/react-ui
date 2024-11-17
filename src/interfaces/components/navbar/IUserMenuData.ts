import type { IUserMenu } from "@/interfaces/components/navbar/IUserMenu.ts";

export type IUserMenuData = {
	username: string;
	avatar?: string;
	email: string;
	menus: IUserMenu[];
};
