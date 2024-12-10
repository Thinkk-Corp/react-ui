import { storageTypes } from "@/enums/Storage.ts";
import type { ILanguageData, ILanguageStore } from "@/interfaces/stores/ILanguageStore.ts";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const getInitialSelectedLanguage = (): ILanguageData | null => {
	const storedLanguage = localStorage.getItem(storageTypes.LANGUAGE_STORAGE);
	return storedLanguage ? JSON.parse(storedLanguage).state : null;
};

export const useLanguageStore = create<ILanguageStore>()(
	persist(
		(set) => ({
			languages: null,
			selectedLanguage: getInitialSelectedLanguage(),
			setSelectedLanguage: (selectedLanguage: ILanguageData) => set({ selectedLanguage }),
			setLanguages: (languages: ILanguageData[] | null) => set({ languages }),
		}),
		{
			name: storageTypes.LANGUAGE_STORAGE,
			partialize: (state) => state.selectedLanguage,
		},
	),
);
