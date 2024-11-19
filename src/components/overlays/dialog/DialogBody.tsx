import classNames from "classnames";
import type { ReactNode } from "react";

export const DialogBody = ({ type, children }: { type?: "modal" | "drawer"; children: ReactNode }) => {
	return (
		<div
			className={classNames("pr-2 overflow-hidden overflow-y-auto", {
				"max-h-96": type === "modal",
				"h-auto": type === "drawer",
			})}
		>
			{children}
		</div>
	);
};
