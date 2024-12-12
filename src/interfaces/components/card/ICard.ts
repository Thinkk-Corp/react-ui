import type { ICustomStylesConfig } from "@/interfaces/types/ICustomStyleConfig.ts";
import type { ISize } from "@/interfaces/types/IMetrics.ts";
import type { ReactNode } from "react";

export interface ICard {
	children: ReactNode;
	size?: ISize | "full";
	styleClass?: {
		card?: ICustomStylesConfig;
		cardHeader?: ICustomStylesConfig;
		cardBody?: ICustomStylesConfig;
		cardAction?: ICustomStylesConfig;
	};
	className?: string;
}
