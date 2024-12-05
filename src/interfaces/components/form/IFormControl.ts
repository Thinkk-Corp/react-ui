import type { ReactNode } from "react";

export interface IFormControl {
	error: any;
	isRequired?: boolean;
	label?: string;
	className?: string;
	children: ReactNode;
}
