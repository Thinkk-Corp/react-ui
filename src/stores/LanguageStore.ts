import { storageTypes } from "@/enums/Storage.ts";
import type { ILanguageData, ILanguageStore } from "@/interfaces/stores/ILanguageStore.ts";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useLanguageStore = create<ILanguageStore>()(
	persist(
		(set) => ({
			languages: null,
			selectedLanguage: null,
			setSelectedLanguage: (selectedLanguage: ILanguageData) => set({ selectedLanguage }), // Sadece selectedLanguage güncellenir
			setLanguages: (languages: ILanguageData[] | null) => set({ languages }), // Bu, storage'e kaydedilmez
		}),
		{
			name: storageTypes.LANGUAGE_STORAGE, // localStorage anahtarı
			partialize: (state) => {
				return state.selectedLanguage; // Sadece selectedLanguage saklanır
			},
		},
	),
);
