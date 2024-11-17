import type { ICustomStylesConfig } from "@/interfaces/components/dropdown/IDropdown.ts";
import type { Dispatch, ReactNode, SetStateAction } from "react";

export interface IDropdownTrigger {
	isOpen?: boolean;
	setIsOpen?: Dispatch<SetStateAction<boolean>>;
	style?: ICustomStylesConfig;
	children: ReactNode | string;
}
