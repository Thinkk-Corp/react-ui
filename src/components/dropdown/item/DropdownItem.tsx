import type { IDropdownItem } from "@/interfaces/components/dropdown/IDropdownItem.ts";
import classNames from "classnames";

export const DropdownItem = ({ isActivated = false, styleClass, children, ...props }: IDropdownItem) => {
	return (
		<div
			data-testid={"dropdown-item"}
			data-activated={isActivated}
			className={classNames(
				{
					[`text-body2 p-3 ${isActivated ? "bg-primary-main text-white" : "hover:bg-action-hover text-color-primary"} `]:
						typeof styleClass?.defaultStyleActive === "undefined" || styleClass?.defaultStyleActive === null
							? true
							: styleClass.defaultStyleActive,
				},
				styleClass?.customStyle,
			)}
			{...props}
		>
			{children}
		</div>
	);
};
