import type { ICustomStylesConfig } from "@/interfaces/components/dropdown/IDropdown.ts";
import classNames from "classnames";
import type { ReactNode } from "react";

export const DropdownItem = ({ style, children }: { children: ReactNode; style?: ICustomStylesConfig }) => {
	return (
		<div
			className={classNames(
				{
					"text-color-primary text-body2 hover:bg-action-hover p-3":
						typeof style?.defaultStyleActive === "undefined" || style?.defaultStyleActive === null
							? true
							: style.defaultStyleActive,
				},
				style?.customStyle,
			)}
		>
			{children}
		</div>
	);
};
