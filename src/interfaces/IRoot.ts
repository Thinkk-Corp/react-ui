import type { ILanguage } from "@/interfaces/ILanguage.ts";
import type { ICustomRouteObject } from "@/interfaces/plugin/ICustomRouteObject.ts";

export interface IRootConfigs {
	pageTitlePrefix: string;
}

export interface IRoot {
	routes: ICustomRouteObject[];
	languageTranslations: ILanguage[];
	configs: IRootConfigs;
}
