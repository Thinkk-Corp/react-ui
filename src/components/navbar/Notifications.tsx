import { IconBox } from "@/components/IconBox.tsx";
import { icons } from "@/plugins/Icons.tsx";

export const Notifications = () => {
	return (
		<IconBox color={"text-color-primary"} isHoverable>
			{icons.outline.bell}
		</IconBox>
	);
};
