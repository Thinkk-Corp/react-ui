import type { ILanguage } from "@/interfaces/ILanguage.ts";

export type ILanguageData = Omit<ILanguage, "is_default" | "is_fallback" | "translations">;

export interface ILanguageStore {
	languages: ILanguageData[] | null;
	selectedLanguage: ILanguageData | null;
	setSelectedLanguage(selectedLanguage: ILanguageData): void;
	setLanguages: (languages: ILanguageData[]) => void;
}
