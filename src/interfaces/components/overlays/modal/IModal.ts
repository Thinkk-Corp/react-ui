import type { ISize } from "@/interfaces/types/IMetrics.ts";
import type { ReactNode } from "react";

export interface IModal {
	id: string;
	size?: ISize;
	onCloseToClickOutside?: boolean;
	children?: ReactNode;
	isOpen?: boolean;
	onOpened?: () => void;
	onClosed?: () => void;
}
