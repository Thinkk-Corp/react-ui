import type { ICustomStylesConfig } from "@/interfaces/components/dropdown/IDropdown.ts";
import type { ReactNode } from "react";

export interface IDropdownItem {
	children: ReactNode;
	style?: ICustomStylesConfig;
}
