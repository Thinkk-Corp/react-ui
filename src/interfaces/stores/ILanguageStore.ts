import type { ILanguage } from "@/interfaces/ILanguage.ts";

export type ILanguageData = Pick<ILanguage, "name" | "slug" | "flag">;

export interface ILanguageStore {
	languages: ILanguageData[];
	setLanguages: (languages: ILanguageData[]) => void;
}
