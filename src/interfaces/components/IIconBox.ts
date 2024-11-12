import type { ISize } from "@/interfaces/IMetrics.ts";
import type { HTMLAttributes } from "react";

export interface IIconBox extends HTMLAttributes<HTMLDivElement> {
	isHoverable?: boolean;
	size?: ISize;
	className?: string;
}
