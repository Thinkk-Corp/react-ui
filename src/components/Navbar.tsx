import { icons } from "@/plugins/Icons.tsx";
import { useUIStore } from "@/stores/UIStore.ts";

export const Navbar = () => {
	const setSidebarCollapsed = useUIStore((state) => state.setSidebarCollapsed);
	const sidebarCollapsed = useUIStore((state) => state.sidebarCollapsed);

	const handleMobileMenuTriggerClick = () => {
		setSidebarCollapsed({ isLocked: sidebarCollapsed.isLocked, status: !sidebarCollapsed.status });
	};

	return (
		<div className={"h-full bg-paper-default flex items-center shadow-md px-4 justify-between lg:px-10"}>
			<div
				onKeyDown={() => {}}
				onClick={handleMobileMenuTriggerClick}
				className={"w-7 lg:hidden block text-color-primary cursor-pointer"}
			>
				{icons.outline.bars_3}
			</div>
			<div className={"flex items-center gap-4"}>
				<div className={"w-7 text-color-primary"}>{icons.outline.search}</div>
			</div>
		</div>
	);
};
