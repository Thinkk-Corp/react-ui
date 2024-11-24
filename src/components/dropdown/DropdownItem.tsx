import type { IDropdownItem } from "@/interfaces/components/dropdown/IDropdownItem";
import classNames from "classnames";

export const DropdownItem = ({ style, children }: IDropdownItem) => {
	return (
		<div
			data-testid={"dropdown-item"}
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
