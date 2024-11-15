import type { ISize } from "@/interfaces/types/IMetrics.ts";
import type { HTMLAttributes } from "react";

export interface IIconBox extends HTMLAttributes<HTMLDivElement> {
	isHoverable?: boolean;
	size?: ISize;
	className?: string;
}
