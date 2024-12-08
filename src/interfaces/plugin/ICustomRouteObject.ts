import type { ReactNode } from "react";
import type { RouteObject } from "react-router-dom";

export interface ICustomHandle {
	crumb?: {
		title: string;
		icon?: ReactNode;
		path: string;
	};
}

export type ICustomRouteObject = Omit<RouteObject, "handle"> & {
	handle?: ICustomHandle;
};
