import type { ICustomStylesConfig } from "@/interfaces/types/ICustomStyleConfig.ts";
import type { ReactNode } from "react";

export interface ICardChild {
	style?: ICustomStylesConfig;
	children: ReactNode;
	className?: string;
}
