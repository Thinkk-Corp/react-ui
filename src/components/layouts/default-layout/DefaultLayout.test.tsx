import { DefaultLayout } from "@/components/layouts/default-layout/DefaultLayout";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("react-router-dom", () => ({
	...vi.importActual("react-router-dom"),
	Outlet: () => <div data-testid="outlet" />,
}));

// Mock store için bir state yapısı ve güncelleme fonksiyonu oluşturuyoruz.
let mockState = { sidebarCollapsed: { status: true, isLocked: true } };
const mockSetSidebarCollapsed = vi.fn((newState) => {
	mockState.sidebarCollapsed = { ...mockState.sidebarCollapsed, ...newState };
});

// `useUIStore`'u tamamen mock'luyoruz.
vi.mock("@/stores/UIStore", () => ({
	useUIStore: () => ({
		sidebarCollapsed: mockState.sidebarCollapsed,
		setSidebarCollapsed: mockSetSidebarCollapsed,
	}),
}));

// Mock Sidebar ve Navbar bileşenleri
const MockSidebar = () => <div data-testid="sidebar">Mock Sidebar</div>;
const MockNavbar = () => <div data-testid="navbar">Mock Navbar</div>;

describe("DefaultLayout", () => {
	beforeEach(() => {
		// Her testten önce mock state'i sıfırlıyoruz.
		mockState = { sidebarCollapsed: { status: false, isLocked: true } };
		vi.clearAllMocks();
	});

	it("renders sidebar, navbar, and outlet correctly", () => {
		render(<DefaultLayout sidebar={<MockSidebar />} navbar={<MockNavbar />} />);

		// Sidebar render kontrolü
		expect(screen.getByTestId("sidebar-section")).toBeInTheDocument();
		expect(screen.getByTestId("sidebar")).toHaveTextContent("Mock Sidebar");

		// Navbar render kontrolü
		expect(screen.getByTestId("navbar-section")).toBeInTheDocument();
		expect(screen.getByTestId("navbar")).toHaveTextContent("Mock Navbar");

		// Outlet render kontrolü
		expect(screen.getByTestId("content-section")).toBeInTheDocument();
		expect(screen.getByTestId("outlet")).toBeInTheDocument();
	});

	it("applies correct classes when sidebar is collapsed", () => {
		render(<DefaultLayout sidebar={<MockSidebar />} navbar={<MockNavbar />} />);

		// Sidebar ve navbar CSS sınıf kontrolü
		expect(screen.getByTestId("sidebar-section")).toHaveAttribute("data-sidebar-collapsed", "false");
		expect(screen.getByTestId("navbar-section")).toHaveAttribute("data-sidebar-collapsed", "false");
	});

	it("applies correct classes when sidebar collapsed", () => {
		// Mock state'i güncelliyoruz
		mockSetSidebarCollapsed({ status: true });

		render(<DefaultLayout sidebar={<MockSidebar />} navbar={<MockNavbar />} />);

		// Sidebar ve navbar CSS sınıf kontrolü
		expect(screen.getByTestId("sidebar-section")).toHaveAttribute("data-sidebar-collapsed", "true");
		expect(screen.getByTestId("navbar-section")).toHaveAttribute("data-sidebar-collapsed", "true");
	});

	it("toggles sidebar on hover when unlocked", () => {
		// Mock state'i güncelliyoruz
		mockSetSidebarCollapsed({ status: false, isLocked: false });

		render(<DefaultLayout sidebar={<MockSidebar />} navbar={<MockNavbar />} />);

		const sidebarSection = screen.getByTestId("sidebar-section");
		const navbarSection = screen.getByTestId("navbar-section");
		const sidebar = screen.getByTestId("sidebar");

		// İlk durum kontrolü
		expect(sidebarSection).toHaveAttribute("data-sidebar-collapsed", "false");
		expect(navbarSection).toHaveAttribute("data-sidebar-collapsed", "false");

		// Hover işlemi
		fireEvent.mouseOver(sidebar);

		// Güncellenmiş durum kontrolü
		expect(sidebarSection).toHaveAttribute("data-sidebar-collapsed", "true");
		expect(navbarSection).toHaveAttribute("data-sidebar-collapsed", "true");
	});
});
