import type { ReactNode } from "react";

export const DialogAction = ({ children }: { children: ReactNode }) => {
	return <div className={"flex items-center justify-end gap-4"}>{children}</div>;
};
