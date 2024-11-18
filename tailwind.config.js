import { screens } from "./src/styles/tailwind/Screens.ts";
import { shadow } from "./src/styles/tailwind/Shadow.ts";
import { action } from "./src/styles/tailwind/colors/Action.ts";
import { color } from "./src/styles/tailwind/colors/Color.ts";
import { custom } from "./src/styles/tailwind/colors/Custom.ts";
import { error } from "./src/styles/tailwind/colors/Error.ts";
import { info } from "./src/styles/tailwind/colors/Info.ts";
import { paper } from "./src/styles/tailwind/colors/Paper.ts";
import { primary } from "./src/styles/tailwind/colors/Primary.ts";
import { secondary } from "./src/styles/tailwind/colors/Secondary.ts";
import { sidebar } from "./src/styles/tailwind/colors/Sidebar.ts";
import { success } from "./src/styles/tailwind/colors/Success.ts";
import { warning } from "./src/styles/tailwind/colors/Warning.ts";

export default {
	content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
	darkMode: ["class", '[data-mode="dark"]'],
	safelist: [
		{
			pattern: /bg-(primary|secondary|info|error|warning|success)-(main|light|dark)/,
		},
		{
			pattern: /text-(primary|secondary|info|error|warning|success)-(main|light|dark)/,
		},
		{
			pattern: /border-(primary|secondary|info|error|warning|success)-(main|light|dark)/,
		},
		{
			pattern: /w-(\d+\/\d+|full|screen|auto)/,
		},
		{
			pattern: /h-(\d+\/\d+|full|screen|auto)/,
		},
		// Rem değerleri
		"h-[1rem]",
		"h-[1.5rem]",
		"h-[2rem]",
		"h-[2.5rem]",
		"h-[3rem]",
		"h-[3.5rem]",
		"h-[4rem]",
		"h-[4.5rem]",
		"h-[5rem]",
		"h-[6rem]",

		// Pixel değerleri
		"h-[10px]",
		"h-[20px]",
		"h-[30px]",
		"h-[40px]",
		"h-[50px]",
		"h-[60px]",
		"h-[70px]",
		"h-[80px]",
		"h-[90px]",
		"h-[100px]",
		"h-[120px]",
		"h-[150px]",
		"h-[200px]",
		"h-[250px]",
		"h-[300px]",

		// Yüzdelik değerler
		"h-[5%]",
		"h-[10%]",
		"h-[15%]",
		"h-[20%]",
		"h-[25%]",
		"h-[30%]",
		"h-[35%]",
		"h-[40%]",
		"h-[45%]",
		"h-[50%]",
		"h-[60%]",
		"h-[70%]",
		"h-[80%]",
		"h-[90%]",
		"h-[100%]",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter", "Helvetica", "sans-serif"],
			},
			screens,
			colors: {
				action,
				color,
				custom,
				error,
				info,
				paper,
				primary,
				secondary,
				success,
				warning,
				sidebar,
			},
			shadow,
			textColor: {
				DEFAULT: "var(--primary)",
			},
			fontSize: {
				h1: "2.25rem", // 36px
				h2: "1.875rem", // 30px
				h3: "1.5rem", // 24px
				h4: "1.25rem", // 20px
				h5: "1rem", // 16px
				h6: "0.875rem", // 14px
				body1: "1rem", // 16px
				body2: "0.875rem", // 14px
				subtitle1: "1rem", // 16px
				subtitle2: "0.875rem", // 14px
				overline: "0.75rem", // 12px
				caption: "0.75rem", // 12px
			},
			backgroundImage: {
				"split-layout-light": "url('/public/media/split-layout/bg-light.jpeg')",
				"split-layout-dark": "url('/public/media/split-layout/bg-dark.jpeg')",
			},
		},
	},
	plugins: [],
};
