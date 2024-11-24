import type { ReactNode } from "react";

export interface IDialogHeader {
	handleDialogClose?: () => void;
	children: ReactNode;
	closeIcon?: ReactNode;
}
