import type { Dispatch, ReactNode, SetStateAction } from "react";

export interface IDropdownTrigger {
	isOpen?: boolean;
	setIsOpen?: Dispatch<SetStateAction<boolean>>;
	children: ReactNode | string;
}
