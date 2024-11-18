import type { ISize } from "@/interfaces/types/IMetrics.ts";
import type { ReactNode } from "react";

export interface IDialog {
	id: string;
	size?: ISize;
	onCloseToClickOutside?: boolean;
	children?: ReactNode;
	type?: "modal" | "drawer";
	isOpen?: boolean;
	onOpened?: () => void;
	onClosed?: () => void;
}
