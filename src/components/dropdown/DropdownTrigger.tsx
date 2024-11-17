import type { IDropdownTrigger } from "@/interfaces/components/dropdown/IDropdownTrigger.ts";
import classNames from "classnames";
import { forwardRef } from "react";

export const DropdownTrigger = forwardRef<HTMLDivElement, IDropdownTrigger>(({ isOpen, setIsOpen, style, children }, ref) => {
	return (
		<div
			className={classNames(
				{
					"inline-flex items-center text-body2 overflow-hidden text-color-primary rounded-lg cursor-pointer border border-custom-divider bg-paper-level2 px-2 py-1":
						typeof style?.defaultStyleActive === "undefined" || style?.defaultStyleActive === null
							? true
							: style?.defaultStyleActive,
				},
				style?.customStyle,
			)}
			ref={ref}
			onKeyDown={() => {}}
			onClick={() => setIsOpen?.(!isOpen)}
		>
			{children}
		</div>
	);
});

DropdownTrigger.displayName = "DropdownTrigger";
