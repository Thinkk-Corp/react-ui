import type { IDropdownTrigger } from "@/interfaces/components/dropdown/IDropdownTrigger.ts";
import { keyboardUtil } from "@/utils/KeyboardUtil.ts";
import classNames from "classnames";
import { forwardRef } from "react";

export const DropdownTrigger = forwardRef<HTMLButtonElement, IDropdownTrigger>(
	({ isOpen, setIsOpen, styleClass, children }, ref) => {
		return (
			<button
				type={"button"}
				data-testid={"dropdown-trigger"}
				className={classNames(
					{
						"inline-flex items-center text-body2 overflow-hidden text-color-primary rounded-lg cursor-pointer border border-custom-divider bg-paper-card px-2 py-1":
							typeof styleClass?.defaultStyleActive === "undefined" || styleClass?.defaultStyleActive === null
								? true
								: styleClass?.defaultStyleActive,
					},
					styleClass?.customStyle,
				)}
				ref={ref}
				onKeyDown={(e) =>
					keyboardUtil({
						e,
						key: "Enter",
						callback: () => {
							setIsOpen?.(!isOpen);
						},
					})
				}
				onClick={() => setIsOpen?.(!isOpen)}
			>
				{children}
			</button>
		);
	},
);

DropdownTrigger.displayName = "DropdownTrigger";
