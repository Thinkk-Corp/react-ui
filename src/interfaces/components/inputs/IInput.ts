import type { ISize } from "@/interfaces/types/IMetrics.ts";
import type { InputHTMLAttributes, ReactNode } from "react";

export interface IInput extends InputHTMLAttributes<HTMLInputElement> {
	isInvalid?: boolean;
	customSize?: ISize;
	icon?: ReactNode;
}
