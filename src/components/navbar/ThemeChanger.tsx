import { IconBox } from "@/components/iconbox/IconBox.tsx";
import { icons } from "@/plugins/Icons.tsx";
import { useThemeStore } from "@/stores/ThemeStore.ts";

export const ThemeChanger = () => {
	const currentTheme = useThemeStore((s) => s.theme);
	const toggleTheme = useThemeStore((s) => s.toggleTheme);

	const handleThemeChange = () => {
		toggleTheme();
	};

	return (
		<IconBox color={"color-primary"} isHoverable onClick={handleThemeChange}>
			{currentTheme === "light" ? icons.outline.sun : icons.outline.moon}
		</IconBox>
	);
};
