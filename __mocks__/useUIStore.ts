import type { ISidebarCollapsed } from "@/interfaces/stores/IUIStore.ts";

export const mockUIStore = {
	sidebarCollapsed: {
		isLocked: false,
		status: false,
	},
	initSidebarCollapsedStatus: jest.fn(),
	setSidebarCollapsed: jest.fn((data: ISidebarCollapsed) => {
		mockUIStore.sidebarCollapsed = data;
	}),
};
