import type { ReactNode } from "react";

export const DropdownItem = ({ children }: { children: ReactNode }) => {
	return <div className={"text-color-primary text-body2 hover:bg-action-hover p-3"}>{children}</div>;
};
