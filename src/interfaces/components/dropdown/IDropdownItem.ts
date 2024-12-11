import type { ICustomStylesConfig } from "@/interfaces/types/ICustomStyleConfig.ts";
import type { ReactNode } from "react";

export interface IDropdownItem {
	children: ReactNode;
	isActivated?: boolean;
	style?: ICustomStylesConfig;
}
