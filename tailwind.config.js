// tailwind.config.js
import { action } from "./src/styles/tailwind/colors/Action.ts";
import { color } from "./src/styles/tailwind/colors/Color.ts";
import { custom } from "./src/styles/tailwind/colors/Custom.ts";
import { error } from "./src/styles/tailwind/colors/Error.ts";
import { info } from "./src/styles/tailwind/colors/Info.ts";
import { paper } from "./src/styles/tailwind/colors/Paper.ts";
import { primary } from "./src/styles/tailwind/colors/Primary.ts";
import { secondary } from "./src/styles/tailwind/colors/Secondary.ts";
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
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter", "Helvetica", "sans-serif"],
			},
			screens: {
				sm: "640px",
				md: "768px",
				lg: "1024px",
				xl: "1280px",
				"2xl": "1536px",
			},
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
			},
			// Default text color ayarı
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
		},
	},
	plugins: [],
};
