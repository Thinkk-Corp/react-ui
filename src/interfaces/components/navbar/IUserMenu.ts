import type { ReactNode } from "react";

export interface IUserMenu {
	icon: ReactNode | string;
	text: string;
	action: string | (() => void);
}
