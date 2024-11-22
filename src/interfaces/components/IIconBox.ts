import type { ISize } from "@/interfaces/types/IMetrics.ts";
import type { HTMLAttributes, ReactNode } from "react";

export interface IIconBox extends HTMLAttributes<HTMLDivElement> {
	isHoverable?: boolean;
	size?: ISize;
	className?: string;
	children: ReactNode;
}
