import type { ILanguageStore } from "@/interfaces/stores/ILanguageStore.ts";
import { create } from "zustand";

export const useLanguageStore = create<ILanguageStore>((set) => ({
	languages: [],
	setLanguages: (languages) => set({ languages }),
}));
