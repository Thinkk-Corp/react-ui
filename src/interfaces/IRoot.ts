import type { ILanguage } from "@/interfaces/ILanguage.ts";
import type { RouteObject } from "react-router-dom";

export interface IRootConfigs {
	pageTitlePrefix: string;
}

export interface IRoot {
	routes: RouteObject[];
	languageTranslations: ILanguage[];
	configs: IRootConfigs;
}
