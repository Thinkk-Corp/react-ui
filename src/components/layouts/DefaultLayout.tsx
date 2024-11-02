import type { IDefaultLayout } from "@/interfaces/components/layout/IDefaultLayout.ts";
import { Outlet } from "react-router-dom";

export const DefaultLayout = ({ sidebar, navbar }: IDefaultLayout) => {
	return (
		<div id={"default-layout"} className={"grid grid-cols-[300px_1fr] grid-rows-[auto_1fr] h-screen"}>
			<div className={"col-start-1 row-start-1 row-span-2"}>{sidebar}</div>
			<div className={"col-start-2 row-start-1"}>{navbar}</div>
			<div className="container p-16 col-start-2 row-start-2 overflow-auto">
				<Outlet />
			</div>
		</div>
	);
};
