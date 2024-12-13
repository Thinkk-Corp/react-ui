import type { IColorVariants, ISize } from "@/interfaces/types/IMetrics";
import type { HTMLAttributes } from "react";

export interface IPill extends HTMLAttributes<HTMLSpanElement> {
	colorScheme?: IColorVariants;
	size?: ISize;
	className?: string;
}
