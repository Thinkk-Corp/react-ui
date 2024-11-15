import type { ILanguage } from "@/interfaces/ILanguage.ts";
import type { RouteObject } from "react-router-dom";

export interface IRoot {
	routes: RouteObject[];
	languageTranslations: ILanguage[];
}
