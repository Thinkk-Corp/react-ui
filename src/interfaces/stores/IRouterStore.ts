import type { Router } from "@remix-run/router";

export interface IRouterStore {
	router: Router | null;
	setRouter: (router: Router | null) => void;
}
