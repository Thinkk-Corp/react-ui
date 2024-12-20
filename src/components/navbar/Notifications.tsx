import { IconBox } from "@/components/IconBox";
import { icons } from "@/plugins/Icons.tsx";

export const Notifications = () => {
	return (
		<IconBox color={"color-primary"} isHoverable>
			{icons.outline.bell}
		</IconBox>
	);
};
