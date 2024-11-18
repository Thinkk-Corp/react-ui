import { IconBox } from "@/components/IconBox.tsx";
import type { IModalHeader } from "@/interfaces/components/overlays/modal/IModalHeader.ts";
import { icons } from "@/plugins/Icons.tsx";

export const ModalHeader = ({ handleModalClose, children, closeIcon = icons.outline.x }: IModalHeader) => {
	return (
		<div className={"p-4 flex items-center gap-4 mb-4 justify-between"}>
			<h4 className={"text-h4 text-color-primary"}>{children}</h4>
			<IconBox color={"text-color-primary"} onClick={handleModalClose} isHoverable>
				{closeIcon}
			</IconBox>
		</div>
	);
};
