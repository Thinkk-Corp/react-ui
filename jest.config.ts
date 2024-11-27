import path from "node:path";
import type { Config } from "jest";

export default {
	preset: "ts-jest",
	testEnvironment: "jest-environment-jsdom",
	transform: {
		"^.+\\.tsx?$": "ts-jest",
	},
	moduleNameMapper: {
		"^@/(.*)$": path.resolve(__dirname, "src/$1"), // Use path.resolve to avoid path issues in Windows
	},
	testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
	setupFilesAfterEnv: ["@testing-library/jest-dom", "<rootDir>/jest-setup.ts"],
} as Config;
