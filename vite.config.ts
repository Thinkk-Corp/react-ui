import path from "node:path";
import { defineConfig } from "vite";

import { peerDependencies } from "./package.json";

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
		emptyOutDir: true, // Clears the output directory before building.
	},

	resolve: {
		alias: [
			{
				find: /^~(.+)/,
				replacement: path.join(process.cwd(), "node_modules/$1"),
			},
			{
				find: /^@\/(.+)/,
				replacement: path.join(process.cwd(), "src/$1"),
			},
		],
	},

	server: {
		port: 3000,
	},
	preview: {
		port: 3000,
	},
});
