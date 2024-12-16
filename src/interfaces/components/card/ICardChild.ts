import type { ICustomStylesConfig } from "@/interfaces/types/ICustomStyleConfig.ts";
import type { ReactNode } from "react";

export interface ICardChild {
	styleClass?: ICustomStylesConfig;
	children: ReactNode;
	className?: string;
}
