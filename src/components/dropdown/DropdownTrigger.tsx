import type { IDropdownTrigger } from "@/interfaces/components/dropdown/IDropdownTrigger.ts";
import { forwardRef } from "react";

export const DropdownTrigger = forwardRef<HTMLDivElement, IDropdownTrigger>(({ isOpen, setIsOpen, children }, ref) => {
	return (
		<div
			className="inline-flex items-center text-body2 overflow-hidden text-color-primary rounded-lg cursor-pointer border border-custom-divider bg-paper-level2 px-2 py-1"
			ref={ref}
			onKeyDown={() => {}}
			onClick={() => setIsOpen?.(!isOpen)}
		>
			{children}
		</div>
	);
});

DropdownTrigger.displayName = "DropdownTrigger";
