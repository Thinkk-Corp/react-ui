// Create a mock function for Zustand's `useUIStore` hook
export const mockUIStore = () => {
	// Mocking the store functions
	const setSidebarCollapsedMock = jest.fn();
	const initSidebarCollapsedStatusMock = jest.fn();

	const mockStore = {
		sidebarCollapsed: {
			isLocked: false,
			status: false,
		},
		initSidebarCollapsedStatus: initSidebarCollapsedStatusMock,
		setSidebarCollapsed: setSidebarCollapsedMock,
	};

	// Mocking the `useUIStore` hook
	jest.spyOn(require("@/stores/ui-store/UIStore.ts"), "useUIStore").mockImplementation(() => mockStore);

	return {
		mockStore,
		setSidebarCollapsedMock,
		initSidebarCollapsedStatusMock,
	};
};
