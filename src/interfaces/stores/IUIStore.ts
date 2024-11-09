export interface UIState {
	sidebarCollapsed: boolean;
}

export interface UIActions {
	initSidebarCollapsedStatus: () => void;
	setSidebarCollapsed: (status: boolean) => void;
}

export type UIStore = UIState & UIActions;
