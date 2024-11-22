import { IconBox } from "@/components/iconbox/IconBox.tsx";
import { icons } from "@/plugins/Icons.tsx";

export const Notifications = () => {
	return (
		<IconBox color={"color-primary"} isHoverable>
			{icons.outline.bell}
		</IconBox>
	);
};
