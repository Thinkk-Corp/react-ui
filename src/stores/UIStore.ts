import { storageTypes } from "@/enums/Storage.ts";
import type { UIStore } from "@/interfaces/stores/IUIStore.ts";
import { create } from "zustand";

export const useUIStore = create<UIStore>((set) => ({
	sidebarCollapsed: false,

	initSidebarCollapsedStatus: () => {
		const collapsedStatus = localStorage.getItem(storageTypes.SIDEBAR_COLLAPSE_STORE);
		if (!collapsedStatus) {
			localStorage.setItem(storageTypes.SIDEBAR_COLLAPSE_STORE, "false");
			return set({ sidebarCollapsed: false });
		}
		set({ sidebarCollapsed: collapsedStatus === "true" });
	},

	setSidebarCollapsed: (status: boolean) => {
		localStorage.setItem(storageTypes.SIDEBAR_COLLAPSE_STORE, status.toString());
		set({ sidebarCollapsed: status });
	},
}));
