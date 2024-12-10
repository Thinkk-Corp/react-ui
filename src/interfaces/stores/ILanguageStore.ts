import type { ILanguage } from "@/interfaces/ILanguage.ts";

export interface ILanguageStore {
	languages: ILanguage[] | null;
	selectedLanguage: ILanguage | null;
	setSelectedLanguage(selectedLanguage: ILanguage): void;
	setLanguages: (languages: ILanguage[]) => void;
}
