import { DefaultLayout } from "@/components/layouts/default-layout/DefaultLayout.tsx";
import { useUIStore } from "@/stores/UIStore.ts";
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
	it("doğru şekilde render edilmelidir", () => {
		render(<DefaultLayout sidebar={<MockSidebar />} navbar={<MockNavbar />} />);

		// Sidebar ve navbar'ın doğru şekilde render edilip edilmediğini kontrol et
		const sidebar = screen.getByTestId("sidebar");
		expect(sidebar).toBeInTheDocument();

		const navbar = screen.getByTestId("navbar");
		expect(navbar).toBeInTheDocument();

		// Ayrıca outlet'ın render edildiğini de kontrol et
		const outlet = screen.getByTestId("outlet");
		expect(outlet).toBeInTheDocument();
	});

	it("hover ile sidebar'ı çökertme ve genişletme", () => {
		render(<DefaultLayout sidebar={<MockSidebar />} navbar={<MockNavbar />} />);

		const sidebar = screen.getByTestId("sidebar");
		const sidebarSection = screen.getByTestId("sidebar-section");

		// Başlangıçta sidebar çökertilmemiştir
		expect(sidebarSection).toHaveAttribute("data-sidebar-collapsed", "false");

		// Aksiyon: Sidebar üzerine gelerek genişletme
		fireEvent.mouseEnter(sidebar);
		expect(sidebarSection).toHaveAttribute("data-sidebar-collapsed", "false");

		// Aksiyon: Sidebar'dan çıkıp çökertme
		fireEvent.mouseLeave(sidebar);
		expect(sidebarSection).toHaveAttribute("data-sidebar-collapsed", "true");

		// Çökertme durumunun düzeni etkilediğini kontrol et (örneğin, genişlik veya görünürlük)
		expect(sidebarSection).toHaveClass("data-[sidebar-collapsed='true']:-translate-x-full");

		// Genişletme durumunun düzeni de etkilediğini kontrol et
		act(() => {
			setSidebarCollapsed({ isLocked: false, status: false });
		});
		expect(sidebarSection).toHaveClass("data-[sidebar-collapsed='false']:md:w-72");
	});

	it("sidebar çökertildiğinde düzenin değişmesi", () => {
		render(<DefaultLayout sidebar={<MockSidebar />} navbar={<MockNavbar />} />);

		const sidebarSection = screen.getByTestId("sidebar-section");
		const navbarSection = screen.getByTestId("navbar-section");
		const navbarContentSection = screen.getByTestId("navbar-content-section");

		// Sidebar çökertmesini simüle et
		act(() => {
			setSidebarCollapsed({ isLocked: false, status: true });
		});

		// Sidebar'ın çökmüş olduğunu doğrula
		expect(sidebarSection).toHaveClass("data-[sidebar-collapsed='true']:-translate-x-full");

		// Navbar'ın, çökertilen duruma göre konumunu ayarladığını doğrula
		expect(navbarSection).toHaveClass("data-[sidebar-collapsed='true']:md:left-[4.5rem]");

		// İçerik alanının da buna göre ayarlandığını doğrula
		expect(navbarContentSection).toHaveClass("data-[sidebar-collapsed='true']:md:ml-[4.5rem]");
	});

	it("sidebar kilitlenmiş olmalı", () => {
		render(<DefaultLayout sidebar={<MockSidebar />} navbar={<MockNavbar />} />);

		// Sidebar durumu kilitlenmiş olarak ayarla ve davranışı kontrol et
		act(() => {
			setSidebarCollapsed({ isLocked: true, status: true });
		});

		// Sidebar'ın manuel olarak çökertilemeyeceğini veya genişletilemeyeceğini kontrol et
		const sidebarSection = screen.getByTestId("sidebar-section");
		expect(sidebarSection).toHaveAttribute("data-sidebar-collapsed", "true");
		expect(sidebarSection).toHaveClass("data-[sidebar-collapsed='true']:-translate-x-full");
	});
});
