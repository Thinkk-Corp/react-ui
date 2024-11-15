import type { IPosition } from "@/interfaces/types/IMetrics.ts";
import type { ReactNode } from "react";

export interface IDropdown {
	children?: ReactNode;
	isOpen?: boolean;
	onCloseToClickOutside?: boolean;
	onCloseToClickInside?: boolean;
	onOpened?: () => void;
	onClosed?: () => void;
	position?: IPosition;
}
