import { DefaultLayout } from "@/components/layouts/default-layout/DefaultLayout.tsx";
import { useUIStore } from "@/stores/ui-store/UIStore.ts";
import { act, fireEvent, render, screen } from "@testing-library/react";

jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	Outlet: () => <div data-testid="outlet" />,
}));

const setSidebarCollapsed = useUIStore.getState().setSidebarCollapsed;
const sidebarCollapsed = useUIStore.getState().sidebarCollapsed;

const MockNavbar = () => <div data-testid="navbar">Mock Navbar</div>;

const MockSidebar = () => (
	<div
		data-testid="sidebar"
		onMouseLeave={() => act(() => setSidebarCollapsed({ ...sidebarCollapsed, status: true }))}
		onMouseEnter={() => act(() => setSidebarCollapsed({ ...sidebarCollapsed, status: false }))}
	>
		Mock Sidebar
	</div>
);

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

		// Act: wrap state updates inside act()
		act(() => {
			setSidebarCollapsed({ isLocked: false, status: true });
		});

		const sidebar = screen.getByTestId("sidebar");
		const sidebarSection = screen.getByTestId("sidebar-section");

		fireEvent.mouseEnter(sidebar);

		expect(sidebarSection).toHaveAttribute("data-sidebar-collapsed", "false");

		fireEvent.mouseLeave(sidebar);

		expect(sidebarSection).toHaveAttribute("data-sidebar-collapsed", "true");
	});
});
