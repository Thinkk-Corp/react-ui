import type { HTMLAttributes } from "react";

export interface ITextarea extends HTMLAttributes<HTMLTextAreaElement> {
	rows?: number;
	isInvalid?: boolean;
	className?: string;
}
