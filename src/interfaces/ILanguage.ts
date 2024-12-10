import type { ResourceLanguage } from "i18next";
import type { ReactNode } from "react";

export interface ILanguage {
	name: string;
	slug: string;
	flag: string | ReactNode;
	is_fallback?: boolean;
	is_default?: boolean;
	translations: ResourceLanguage;
}
