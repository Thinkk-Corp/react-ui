import type { IPosition, ISize } from "@/interfaces/types/IMetrics.ts";
import type { ReactNode } from "react";

export interface ICustomStylesConfig {
	defaultStyleActive?: boolean;
	customStyle?: string;
}

export interface IDropdownStyle {
	trigger?: ICustomStylesConfig;
	menu?: ICustomStylesConfig;
	item?: ICustomStylesConfig;
}

export interface IDropdown {
	children?: ReactNode;
	isOpen?: boolean;
	closeToClickOutside?: boolean;
	closeToClickInside?: boolean;
	onOpened?: () => void;
	onClosed?: () => void;
	size?: ISize;
	styles?: IDropdownStyle;
	position?: IPosition;
}
