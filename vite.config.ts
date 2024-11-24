import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

import { peerDependencies } from "./package.json";

const ReactCompilerConfig = {
	/* ... */
};

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		lib: {
			entry: "./src/index.ts", // Specifies the entry point for building the library.
			name: "react-ui", // Sets the name of the generated library.
			fileName: (format) => `index.${format}.js`, // Generates the output file name based on the format.
			formats: ["cjs", "es"], // Specifies the output formats (CommonJS and ES modules).
		},
		rollupOptions: {
			external: [...Object.keys(peerDependencies)], // Defines external dependencies for Rollup bundling.
		},
		sourcemap: true, // Generates source maps for debugging.
		emptyOutDir: true,
	},

	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	server: {
		port: 3000,
	},
	plugins: [
		react({
			babel: {
				plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]],
			},
		}),
		dts(),
	],
});
