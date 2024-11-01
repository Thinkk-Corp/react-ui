import { action } from "./src/styles/tailwind/colors/light/Action.js";
import { color } from "./src/styles/tailwind/colors/light/Color.js";
import { custom } from "./src/styles/tailwind/colors/light/Custom.js";
import { error } from "./src/styles/tailwind/colors/light/Error.js";
import { info } from "./src/styles/tailwind/colors/light/Info.js";
import { paper } from "./src/styles/tailwind/colors/light/Paper.js";
import { primary } from "./src/styles/tailwind/colors/light/Primary.js";
import { secondary } from "./src/styles/tailwind/colors/light/Secondary.js";
import { success } from "./src/styles/tailwind/colors/light/Success.js";
import { warning } from "./src/styles/tailwind/colors/light/Warning.js";

export default {
	content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
	darkMode: ["class", '[data-mode="dark"]'],
	safelist: [
		// Background color classes
		{
			pattern: /bg-(primary|secondary|info|error|warning|success)-(main|light|dark)/,
		},
		// Text color classes
		{
			pattern: /text-(primary|secondary|info|error|warning|success)-(main|light|dark)/,
		},
		// Border color classes
		{
			pattern: /border-(primary|secondary|info|error|warning|success)-(main|light|dark)/,
		},
		// Width classes (e.g., w-1/2, w-1/3)
		{
			pattern: /w-(\d+\/\d+|full|screen|auto)/,
		},
		// Height classes (e.g., h-1/2, h-1/3)
		{
			pattern: /h-(\d+\/\d+|full|screen|auto)/,
		},
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter", "Helvetica", "sans-serif"], // Set default font family here
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
			typography: {
				DEFAULT: {
					css: {
						color: "var(--primary)",
						weight: "medium",
						lineHeight: "normal",
						h1: {
							fontSize: "6xl",
						},
						h2: {
							fontSize: "5xl",
						},
						h3: {
							fontSize: "4xl",
						},
						h5: {
							fontSize: "2xl",
						},
						h6: {
							fontSize: "lg",
						},
						"body-1": {
							fontSize: "base",
							weight: "normal",
							lineHeight: 6,
						},
						"body-2": {
							fontSize: "sm",
							weight: "normal",
							lineHeight: 6,
						},
						"subtitle-1": {
							fontSize: "base",
							lineHeight: 6,
							weight: "medium",
						},
						"subtitle-2": {
							fontSize: "sm",
							weight: "medium",
							lineHeight: 6,
						},
						overline: {
							fontSize: "xs",
							weight: "semibold",
							lineHeight: 6,
						},
						caption: {
							fontSize: "xs",
							weight: "normal",
							lineHeight: 6,
						},
					},
				},
			},
		},
	},
};
