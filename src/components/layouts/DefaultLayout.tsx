import type { IDefaultLayout } from "@/interfaces/components/layout/IDefaultLayout.ts";
import { useUIStore } from "@/stores/UIStore.ts";
import { Outlet } from "react-router-dom";

export const DefaultLayout = ({ sidebar, navbar }: IDefaultLayout) => {
	const sidebarCollapsed = useUIStore((state) => state.sidebarCollapsed);

	return (
		<div className="h-screen overflow-auto flex">
			{/* Sidebar */}
			<div
				data-sidebar-collapsed={sidebarCollapsed}
				className={`fixed top-0 left-0 z-50 h-full duration-300 transition-all data-[sidebar-collapsed='true']:w-24 data-[sidebar-collapsed='false']:w-72`}
			>
				{sidebar}
			</div>

			{/* Main Content */}
			<div
				data-sidebar-collapsed={sidebarCollapsed}
				className="flex-1 ml-0 duration-300 transition-all lg:data-[sidebar-collapsed='false']:ml-72 lg:data-[sidebar-collapsed='true']:ml-24 mx-5 md:mx-0 flex flex-col"
			>
				{/* Navbar */}
				<div
					data-sidebar-collapsed={sidebarCollapsed}
					className="fixed top-0 left-0 duration-300 transition-all lg:data-[sidebar-collapsed='false']:left-72 lg:data-[sidebar-collapsed='true']:left-24 right-0 h-16"
				>
					{navbar}
				</div>
				<div className={"mt-16"}>
					<Outlet />
				</div>
			</div>
		</div>
	);
};
