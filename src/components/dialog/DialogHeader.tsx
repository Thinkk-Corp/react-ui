import { IconBox } from "@/components/iconbox/IconBox.tsx";
import { icons } from "@/plugins/Icons.tsx";
import type { Dispatch, ReactNode, SetStateAction } from "react";

interface IDialogHeader {
	setStatus?: Dispatch<SetStateAction<boolean>>;
	children: ReactNode;
	closeIcon?: ReactNode;
}

export const DialogHeader = ({ setStatus, children, closeIcon = icons.outline.x }: IDialogHeader) => {
	const handleDialogClose = () => {
		setStatus?.(false);
	};

	return (
		<div className={"flex items-center gap-4 justify-between"}>
			<h4 className={"text-h4 text-color-primary"}>{children}</h4>
			<IconBox color={"color-primary"} onClick={handleDialogClose} isHoverable>
				{closeIcon}
			</IconBox>
		</div>
	);
};
