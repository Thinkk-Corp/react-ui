import type { ReactNode } from "react";

export const DialogBody = ({ children }: { children: ReactNode }) => {
	return <div className={"pr-2 flex-1 overflow-hidden overflow-y-auto h-auto"}>{children}</div>;
};
