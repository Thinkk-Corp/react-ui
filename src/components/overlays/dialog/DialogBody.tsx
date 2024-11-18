import type { ReactNode } from "react";

export const DialogBody = ({ children }: { children: ReactNode }) => {
	return <div className={"max-h-96 p-4 mb-8 overflow-hidden overflow-y-auto"}>{children}</div>;
};
