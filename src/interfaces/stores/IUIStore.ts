export interface ISidebarCollapsed {
	isLocked: boolean;
	status: boolean;
}

export interface UIState {
	sidebarCollapsed: ISidebarCollapsed;
}

export interface UIActions {
	initSidebarCollapsedStatus: () => void;
	setSidebarCollapsed: (data: ISidebarCollapsed) => void;
}

export type UIStore = UIState & UIActions;
