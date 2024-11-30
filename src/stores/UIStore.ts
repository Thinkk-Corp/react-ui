import { storageTypes } from "@/enums/Storage.ts";
import type { ISidebarCollapsed, UIStore } from "@/interfaces/stores/IUIStore.ts";
import { create } from "zustand";

export const useUIStore = create<UIStore>((set) => ({
	sidebarCollapsed: {
		isLocked: false,
		status: false,
	},

	initSidebarCollapsedStatus: () => {
		const collapsedStatus = localStorage.getItem(storageTypes.SIDEBAR_COLLAPSE_STORE);
		if (typeof collapsedStatus === "undefined" || collapsedStatus === null) {
			localStorage.setItem(storageTypes.SIDEBAR_COLLAPSE_STORE, JSON.stringify({ isLocked: false, isCollapsed: false }));
			return set({ sidebarCollapsed: { isLocked: false, status: false } });
		}
		set({ sidebarCollapsed: JSON.parse(collapsedStatus) });
	},

	setSidebarCollapsed: (data: ISidebarCollapsed) => {
		localStorage.setItem(storageTypes.SIDEBAR_COLLAPSE_STORE, JSON.stringify(data));
		set({ sidebarCollapsed: data });
	},
}));
