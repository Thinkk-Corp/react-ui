import type { Resource } from "i18next";

export interface ILanguage {
	name: string;
	slug: string;
	flag: string;
	is_fallback?: boolean;
	is_default?: boolean;
	translations: Resource;
}
