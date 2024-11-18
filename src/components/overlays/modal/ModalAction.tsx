import type { ReactNode } from "react";

export const ModalAction = ({ children }: { children: ReactNode }) => {
	return <div className={"flex items-center justify-end p-4 gap-4"}>{children}</div>;
};