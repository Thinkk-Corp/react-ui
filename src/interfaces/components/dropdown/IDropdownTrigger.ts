import type { ICustomStylesConfig } from "@/interfaces/types/ICustomStyleConfig.ts";
import type { Dispatch, ReactNode, SetStateAction } from "react";

export interface IDropdownTrigger {
	isOpen?: boolean;
	setIsOpen?: Dispatch<SetStateAction<boolean>>;
	styleClass?: ICustomStylesConfig;
	children: ReactNode | string;
}
