import { DefaultLayout } from "@/components/layouts/default-layout/DefaultLayout.tsx";
import { useUIStore } from "@/stores/UIStore.ts";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, vi } from "vitest";

vi.mock("react-router-dom", () => ({
	...vi.importActual("react-router-dom"),
	Outlet: () => <div data-testid="outlet" />,
}));

const setSidebarCollapsed = useUIStore.getState().setSidebarCollapsed;
const sidebarCollapsed = useUIStore.getState().sidebarCollapsed;

const MockSidebar = () => (
	<div
		data-testid="sidebar"
		onMouseLeave={() => setSidebarCollapsed({ ...sidebarCollapsed, status: true })}
		onMouseEnter={() => setSidebarCollapsed({ ...sidebarCollapsed, status: false })}
	>
		Mock Sidebar
	</div>
);
const MockNavbar = () => <div data-testid="navbar">Mock Navbar</div>;

describe("DefaultLayout", () => {
	it("should render correctly", () => {
		render(<DefaultLayout sidebar={<MockSidebar />} navbar={<MockNavbar />} />);

		const sidebar = screen.getByTestId("sidebar");
		expect(sidebar).toBeInTheDocument();

		const navbar = screen.getByTestId("navbar");
		expect(navbar).toBeInTheDocument();
	});

	it("should hover over to collapse", () => {
		render(<DefaultLayout sidebar={<MockSidebar />} navbar={<MockNavbar />} />);

		setSidebarCollapsed({ isLocked: false, status: true });

		const sidebar = screen.getByTestId("sidebar");
		const sidebarSection = screen.getByTestId("sidebar-section");

		fireEvent.mouseEnter(sidebar);

		expect(sidebarSection).toHaveAttribute("data-sidebar-collapsed", "false");

		fireEvent.mouseLeave(sidebar);

		expect(sidebarSection).toHaveAttribute("data-sidebar-collapsed", "true");
	});
});
