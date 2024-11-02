import type { IRouterStore } from "@/interfaces/stores/IRouterStore.ts";
import { create } from "zustand";

export const useRouterStore = create<IRouterStore>((set) => ({
	router: null,
	setRouter: (router) => {
		set({ router });
	},
}));
