import { Sidebar } from "@/components/sidebar/Sidebar.tsx";
import type { ISidebarMenuItem } from "@/interfaces/components/sidebar/ISidebarMenu.ts";
import { icons } from "@/plugins/Icons.tsx";
import { useUIStore } from "@/stores/UIStore.ts";
import { screenSizeUtilForTest } from "@/utils/test/ScreenSizeUtilForTest.ts";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";

// Test için kullanılacak menü öğeleri
const sidebarMenus: ISidebarMenuItem[] = [{ icon: icons.outline.x, text: "test-menu-1" }];

const setSidebarCollapsed = useUIStore.getState().setSidebarCollapsed;

describe("Sidebar Component", () => {
	let setSidebarCollapsedSpy: jest.SpyInstance;

	beforeEach(() => {
		// `setSidebarCollapsed` fonksiyonunu spy olarak ayarlayın
		setSidebarCollapsedSpy = jest.spyOn(useUIStore.getState(), "setSidebarCollapsed");
	});

	afterEach(() => {
		jest.clearAllMocks(); // Mock'ları temizle
		jest.restoreAllMocks(); // Spy'ı eski haline getir

		act(() => {
			setSidebarCollapsed({ isLocked: false, status: true });
			screenSizeUtilForTest(1200);
		});
	});

	it("renders Sidebar component correctly", () => {
		render(<Sidebar logo={"./test-logo"} collapsedLogo={"./test-logo-collapsed"} menus={sidebarMenus} />);

		// Sidebar bileşeninin render edildiğini kontrol eder
		const sidebar = screen.getByTestId("sidebar");
		expect(sidebar).toBeInTheDocument();
	});

	it("changes `sidebarCollapsed` status correctly on hover events", async () => {
		render(<Sidebar logo={"./test-logo"} collapsedLogo={"./test-logo-collapsed"} menus={sidebarMenus} />);

		const sidebar = screen.getByTestId("sidebar");

		// İlk durum: Hover işlemi başlamadan önce `setSidebarCollapsed` çağrılmamalıdır
		expect(setSidebarCollapsedSpy).not.toHaveBeenCalled();

		// Mouse hover başlatılıyor
		fireEvent.mouseEnter(sidebar);

		// Hover sonrası durumu kontrol ediyoruz
		await waitFor(() => {
			expect(setSidebarCollapsedSpy).toHaveBeenCalledTimes(1);
			expect(setSidebarCollapsedSpy).toHaveBeenCalledWith({ isLocked: false, status: false });
		});

		// Mouse hover sonlandırılıyor
		fireEvent.mouseLeave(sidebar);

		// Hover bittiğinde durum tekrar kontrol ediliyor
		await waitFor(() => {
			expect(setSidebarCollapsedSpy).toHaveBeenCalledTimes(2);
			expect(setSidebarCollapsedSpy).toHaveBeenCalledWith({ isLocked: false, status: true });
		});

		// Sidebar kilitli duruma getiriliyor
		act(() => {
			setSidebarCollapsed({ isLocked: true, status: false });
		});

		// Kilitliyken hover etkin olmamalıdır
		fireEvent.mouseEnter(sidebar);
		fireEvent.mouseLeave(sidebar);

		// `setSidebarCollapsed` fonksiyonu, kilitliyken tekrar çağrılmamalıdır
		expect(setSidebarCollapsedSpy).toHaveBeenCalledTimes(2);

		act(() => {
			screenSizeUtilForTest(300);
		});

		await waitFor(() => {
			expect(setSidebarCollapsedSpy).toHaveBeenCalledTimes(3);
			expect(setSidebarCollapsedSpy).toHaveBeenCalledWith({ isLocked: false, status: true });
		});

		// Kilitliyken hover etkin olmamalıdır
		fireEvent.mouseEnter(sidebar);
		fireEvent.mouseLeave(sidebar);

		// `setSidebarCollapsed` fonksiyonu, kilitliyken tekrar çağrılmamalıdır
		expect(setSidebarCollapsedSpy).toHaveBeenCalledTimes(3);
	});

	it("Apply correct class to SidebarHeader when sidebarCollapsed", async () => {
		render(<Sidebar logo={"./test-logo"} collapsedLogo={"./test-logo-collapsed"} menus={sidebarMenus} />);

		const sidebarHeader = screen.getByTestId("sidebar-header");

		expect(sidebarHeader).toBeInTheDocument();

		expect(sidebarHeader).toHaveClass("data-[sidebar-collapsed='false']:justify-between");

		act(() => {
			setSidebarCollapsed({ isLocked: true, status: false });
		});

		await waitFor(() => {
			expect(screen.getByTestId("sidebar-header")).toHaveAttribute("data-sidebar-collapsed", "false");
		});
	});
	it("Apply correct class and image to Sidebar logo when sidebarCollapsed and screen size changed", async () => {
		// Sidebar bileşenini render ediyoruz
		render(<Sidebar logo={"./test-logo"} collapsedLogo={"./test-logo-collapsed"} menus={sidebarMenus} />);

		// Başlangıçta sidebar'ın çökme durumu ve logo öğelerinin var olup olmadığını kontrol edelim
		let sidebarLogo = screen.queryByTestId("sidebar-logo");
		let sidebarCollapsedLogo = screen.queryByTestId("sidebar-collapsed-logo");

		// İlk başta normal logo ve collapsed logo'nun olmaması gerektiğini kontrol ediyoruz
		expect(sidebarLogo).not.toBeInTheDocument();
		expect(sidebarCollapsedLogo).toBeInTheDocument();

		// Sidebar çökme durumu değiştiriliyor ve ekran boyutu simüle ediliyor
		act(() => {
			setSidebarCollapsed({ isLocked: true, status: false }); // sidebar'ı açıyoruz
			screenSizeUtilForTest(300); // Ekran boyutunu 300px olarak simüle ediyoruz
		});

		// Asenkron olarak logo öğesinin doğru şekilde render edilmesini bekliyoruz
		await waitFor(() => {
			// Çökmemiş logo'nun görünür olması gerektiğini kontrol ediyoruz
			sidebarLogo = screen.getByTestId("sidebar-logo");
			expect(sidebarLogo).toBeInTheDocument();

			// Çökmüş logo'nun görünmemesi gerektiğini kontrol ediyoruz
			sidebarCollapsedLogo = screen.queryByTestId("sidebar-collapsed-logo");
			expect(sidebarCollapsedLogo).not.toBeInTheDocument();
		});

		// Eğer ekran boyutunu değiştirirseniz, collapsedLogo'nun görünür olmasını kontrol edebiliriz
		act(() => {
			screenSizeUtilForTest(500); // Ekran boyutunu daha büyük bir değere simüle ediyoruz
		});

		await waitFor(() => {
			// Çökmüş logo'nun görünmemesi gerektiğini kontrol ediyoruz
			sidebarCollapsedLogo = screen.queryByTestId("sidebar-collapsed-logo");
			expect(sidebarCollapsedLogo).not.toBeInTheDocument();

			// Normal logo'nun görünür olmasını kontrol ediyoruz
			sidebarLogo = screen.getByTestId("sidebar-logo");
			expect(sidebarLogo).toBeInTheDocument();
		});
	});

	it("Should correctly rendered SidebarMenus", () => {
		render(<Sidebar logo={"./test-logo"} collapsedLogo={"./test-logo-collapsed"} menus={sidebarMenus} />);

		const sidebarMenuList = screen.getByTestId("sidebar-menu-list");

		expect(sidebarMenuList).toBeInTheDocument();
	});
});
