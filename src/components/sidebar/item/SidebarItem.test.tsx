import { redirectNative } from "@/actions/client/RedirectNative.ts";
import { SidebarItem } from "@/components/sidebar/item/SidebarItem";
import { icons } from "@/plugins/Icons.tsx";
import { useUIStore } from "@/stores/UIStore.ts";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { useLocation } from "react-router-dom";

const mockRedirectNative = redirectNative as jest.Mock;
const mockUseLocation = useLocation as jest.Mock;

const setSidebarCollapsed = useUIStore.getState().setSidebarCollapsed;

describe("SidebarItem Component", () => {
	beforeEach(() => {
		// Her testten önce Jest mock'ları sıfırlanır ve varsayılan `useLocation` değeri ayarlanır.
		mockUseLocation.mockReturnValue({ pathname: "/" });
		jest.clearAllMocks();
	});

	it("should render correctly with default props", () => {
		// SidebarItem bileşenini varsayılan özelliklerle render ediyoruz.
		const { getByTestId, queryByTestId } = render(
			<SidebarItem menu={{ text: "Menu 1", icon: icons.outline.x, action: "/menu-1-path" }} />,
		);

		// SidebarItem container'ın görünür olup olmadığını kontrol eder.
		const sidebarItemContainer = getByTestId("sidebar-item-container");
		expect(sidebarItemContainer).toBeVisible();

		// Çocuk noktanın varsayılan olarak gizlenmiş olup olmadığını kontrol eder.
		const sidebarItemChildDot = getByTestId("sidebar-item-child-dot");
		expect(sidebarItemChildDot).toHaveClass("hidden");

		// SidebarItem'in görünür olup olmadığını kontrol eder.
		const sidebarItem = getByTestId("sidebar-item");
		expect(sidebarItem).toBeVisible();

		// İkonun görünür olup olmadığını kontrol eder.
		const sidebarItemIcon = queryByTestId("sidebar-item-icon");
		expect(sidebarItemIcon).toBeVisible();

		// Metnin görünür olup olmadığını kontrol eder.
		const sidebarItemText = getByTestId("sidebar-item-text");
		expect(sidebarItemText).toBeVisible();
	});

	it("should trigger menu action when sidebarItemContainer is clicked", async () => {
		// SidebarItem bileşeni render edilir ve tıklama işlemi test edilir.
		const { getByTestId } = render(<SidebarItem menu={{ text: "Menu 1", icon: icons.outline.x, action: "/menu-1-path" }} />);

		// Tıklama işlemi için container seçilir.
		const sidebarItemContainer = getByTestId("sidebar-item-container");

		// Kullanıcı tıklama simüle edilir.
		fireEvent.click(sidebarItemContainer);

		// redirectNative fonksiyonunun çağrılıp çağrılmadığı kontrol edilir.
		await waitFor(() => {
			expect(mockRedirectNative).toHaveBeenCalledTimes(1);
			expect(mockRedirectNative).toHaveBeenCalledWith({
				url: "/menu-1-path",
				type: "internal",
			});
		});
	});

	it("should apply correct classes and attributes to sidebar item dot when isChild is true and menu is active", async () => {
		// Mevcut konumu test etmek için mock değeri "/test-menu" olarak ayarlanır.
		mockUseLocation.mockReturnValue({ pathname: "/test-menu" });

		// `isChild` özelliği ile bir SidebarItem bileşeni render edilir.
		const { getByTestId } = render(
			<SidebarItem isChild menu={{ text: "Menu 2", icon: icons.outline.x, action: "/test-menu" }} />,
		);

		// Çocuk noktanın uygun sınıfları içerip içermediği kontrol edilir.
		const sidebarItemChildDot = getByTestId("sidebar-item-child-dot");
		expect(sidebarItemChildDot).toHaveClass("data-[is-child='true']:block");
		expect(sidebarItemChildDot).toHaveAttribute("data-is-child", "true");

		// Menü aktif durumunda çocuk noktanın ek sınıf ve niteliklere sahip olup olmadığı kontrol edilir.
		await waitFor(() => {
			expect(sidebarItemChildDot).toHaveAttribute("data-menu-active", "true");
			expect(sidebarItemChildDot).toHaveClass("data-[menu-active='true']:bg-primary-main");
		});
	});

	it("should apply correct classes and attributes to sidebar item when menu is active and isChild is true", async () => {
		// `isChild` ve aktif menü için bir test yapılır.
		mockUseLocation.mockReturnValue({ pathname: "/test-menu" });

		const { getByTestId } = render(
			<SidebarItem isChild menu={{ text: "Menu 2", icon: icons.outline.x, action: "/test-menu" }} />,
		);

		// SidebarItem'ın uygun sınıflara sahip olup olmadığını kontrol eder.
		const sidebarItem = getByTestId("sidebar-item");

		expect(sidebarItem).toHaveClass(
			"data-[menu-active='true']:bg-sidebar-item-active data-[menu-active='true']:text-sidebar-item-active-color",
		);
		expect(sidebarItem).toHaveAttribute("data-is-child", "true");

		// Menü aktif durumunda ek sınıflar ve niteliklere sahip olup olmadığını kontrol eder.
		await waitFor(() => {
			expect(sidebarItem).toHaveAttribute("data-menu-active", "true");
		});
	});

	it("should render icon correctly with appropriate classes and attributes to sidebar item icon when menu is active", async () => {
		// Aktif menü durumunda ikonun görünümünü test eder.
		mockUseLocation.mockReturnValue({ pathname: "/test-menu" });

		const { getByTestId } = render(<SidebarItem menu={{ text: "Menu 2", icon: icons.outline.x, action: "/test-menu" }} />);

		// İkonun SVG içerip içermediğini ve uygun sınıflara sahip olup olmadığını kontrol eder.
		const sidebarItemIcon = getByTestId("sidebar-item-icon");
		expect(sidebarItemIcon.querySelector("svg")).toBeInTheDocument();
		expect(sidebarItemIcon).toHaveClass("data-[menu-active='true']:text-sidebar-item-active-color");

		// Menü aktif durumunda niteliklere sahip olup olmadığını kontrol eder.
		await waitFor(() => {
			expect(sidebarItemIcon).toHaveAttribute("data-menu-active", "true");
		});
	});

	it("Should apply correct classes and attributes to sidebar item text when the sidebar collapsed", async () => {
		// Yan menünün çökük durumu test edilir.
		setSidebarCollapsed({ isLocked: true, status: false });

		const { getByTestId } = render(<SidebarItem menu={{ text: "Menu 2", icon: icons.outline.x, action: "/test-menu" }} />);

		// SidebarItem metninin çökük durumdayken doğru sınıflara sahip olup olmadığını kontrol eder.
		const sidebarItemText = getByTestId("sidebar-item-text");

		expect(sidebarItemText).toHaveClass(
			"ml-4 data-[sidebar-collapsed='true']:md:scale-x-0 origin-left data-[sidebar-collapsed='true']:md:opacity-0",
		);

		// SidebarItem metninin doğru içerikle render edilip edilmediğini kontrol eder.
		expect(sidebarItemText).toHaveTextContent("Menu 2");

		// Çökük durumun niteliklerde doğru görünüp görünmediğini kontrol eder.
		await waitFor(() => {
			expect(sidebarItemText).toHaveAttribute("data-sidebar-collapsed", "false");
		});
	});
});
