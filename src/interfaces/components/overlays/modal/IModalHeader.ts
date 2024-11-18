import type { ReactNode } from "react";

export interface IModalHeader {
	handleModalClose?: () => void;
	children: ReactNode;
	closeIcon?: ReactNode;
}
