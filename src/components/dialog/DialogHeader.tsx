import { IconBox } from "@/components/IconBox";
import type { IDialogHeader } from "@/interfaces/components/dialog/IDialogHeader.ts";
import { icons } from "@/plugins/Icons.tsx";

export const DialogHeader = ({ handleDialogClose, children, closeIcon = icons.outline.x }: IDialogHeader) => {
	return (
		<div className={"flex items-center gap-4 justify-between"}>
			<h4 className={"text-h4 text-color-primary"}>{children}</h4>
			<IconBox color={"color-primary"} onClick={handleDialogClose} isHoverable>
				{closeIcon}
			</IconBox>
		</div>
	);
};
