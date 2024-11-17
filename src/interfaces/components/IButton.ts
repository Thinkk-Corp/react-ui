import type { IColorVariants, ISize } from "@/interfaces/types/IMetrics.ts";
import type { HTMLAttributes, ReactNode } from "react";

export interface IButton extends HTMLAttributes<HTMLButtonElement> {
	size?: ISize;
	colorScheme?: IColorVariants;
	children: ReactNode | string | number;
	variant?: "contained" | "outlined" | "underlined";
}
