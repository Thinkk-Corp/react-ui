import { SidebarMenus } from "@/components/sidebar/menu/SidebarMenus";
import type { ISidebarMenu } from "@/interfaces/components/sidebar/ISidebarMenu.ts";
import { icons } from "@/plugins/Icons.tsx";
import { useUIStore } from "@/stores/UIStore.ts";
import { act, render, screen, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";

// Sidebar menülerinin örnek verisi
const sidebarMenus: ISidebarMenu[] = [
	{ isLabel: true, text: "test-label-1" },
	{
		text: "test-menu-2",
		icon: icons.outline.x,
		children: [
			{ text: "test-menu-2-child", action: "test-menu-2-child-action" },
			{ text: "test-menu-2-child-2", action: "test-menu-2-child-2-action" },
		],
	},
];

jest.mock("@/components/sidebar/item/SidebarItem.tsx", () => ({
	SidebarItem: ({ children }: { children: ReactNode }) => <div data-testid={"sidebar-item-container"}>{children}</div>,
}));

// UI Store'dan sidebarCollapsed durumunu set eden fonksiyon
const setSidebarCollapsed = useUIStore.getState().setSidebarCollapsed;

describe("SidebarMenus Component", () => {
	// Testlerden önce her testten önce sidebar'ın başlangıç durumunu ayarlıyoruz.
	beforeEach(() => {
		setSidebarCollapsed({ isLocked: true, status: true });
	});

	// **Test 1**: isLabel menüsünün doğru şekilde render edilmesini test ediyoruz.
	it("Should correctly rendered isLabel menu", async () => {
		// SidebarMenus bileşenini render et
		render(<SidebarMenus menus={sidebarMenus} />);

		// İlk durumda isLabel menüsünün render edilmediğini kontrol et
		const isLabelMenu = screen.queryByTestId("isLabel-menu");
		expect(isLabelMenu).not.toBeInTheDocument();

		// Sidebar'ı genişleterek menünün görünmesini sağla
		act(() => {
			setSidebarCollapsed({ isLocked: true, status: false });
		});

		// Sidebar açıldığında isLabel menüsünün görünmesini bekle
		await waitFor(() => {
			const isLabelMenu = screen.queryByTestId("isLabel-menu");
			expect(isLabelMenu).toBeInTheDocument();
			expect(isLabelMenu).toHaveTextContent(sidebarMenus[0].text);
		});
	});

	// **Test 2**: Dropdown menüsünün doğru şekilde sidebar durumu ile ilişkilendirildiğini test ediyoruz.
	it("should correctly render dropdown menu based on sidebar state", async () => {
		// Sidebar'ı açmak için durumu güncelle
		act(() => {
			setSidebarCollapsed({ isLocked: true, status: false });
		});

		// Başlangıç durumunda, boş menü ile render et
		const { rerender } = render(<SidebarMenus menus={[]} />);

		// İlk renderda dropdown menüsünün görünmemesini bekle
		await waitFor(() => {
			expect(screen.queryByTestId("dropdown-menu")).not.toBeInTheDocument();
		});

		// Menüyü güncel verilerle yeniden render et
		rerender(<SidebarMenus menus={sidebarMenus} />);

		// Sidebar'ı kapat ve dropdown menüsünün kaybolduğunu kontrol et
		act(() => {
			setSidebarCollapsed({ isLocked: true, status: true });
		});

		await waitFor(() => {
			const dropdownMenu = screen.queryByTestId("dropdown-menu");
			expect(dropdownMenu).not.toBeInTheDocument();
		});

		// Sidebar'ı tekrar aç ve dropdown menüsünün görünmesini sağla
		act(() => {
			setSidebarCollapsed({ isLocked: true, status: false });
		});

		await waitFor(() => {
			const dropdownMenu = screen.queryByTestId("dropdown-menu");
			expect(dropdownMenu).toBeInTheDocument();
		});
	});

	// **Test 3**: Dropdown menü tetikleyicisinin doğru şekilde render edilmesini test ediyoruz.
	it("Should correctly render dropdown menu trigger", () => {
		// Sidebar'ı açarak menü tetikleyicisini render et
		act(() => {
			setSidebarCollapsed({ isLocked: true, status: false });
		});

		render(<SidebarMenus menus={sidebarMenus} />);

		// Dropdown menü tetikleyicisinin render edilip edilmediğini kontrol et
		const dropdownMenuTrigger = screen.getByTestId("dropdown-menu-trigger");
		expect(dropdownMenuTrigger).toBeInTheDocument();

		// Dropdown menü tetikleyicisinin ikonunun doğru render edilmesini kontrol et
		const dropdownMenuTriggerIcon = screen.queryByTestId("dropdown-menu-trigger-icon");
		expect(dropdownMenuTriggerIcon).toBeInTheDocument();

		// Dropdown menü tetikleyici metninin doğru sınıflarla render edilmesini kontrol et
		const dropdownMenuTriggerText = screen.getByTestId("dropdown-menu-trigger-text");
		expect(dropdownMenuTriggerText).toBeInTheDocument();
		expect(dropdownMenuTriggerText).toHaveClass(
			"ml-4 data-[sidebar-collapsed='true']:md:opacity-0 data-[sidebar-collapsed='true']:md:scale-x-0",
		);

		// Dropdown menü tetikleyici metninin doğru içerikle render edilmesini kontrol et
		expect(dropdownMenuTriggerText).toHaveTextContent("test-menu-2");

		// Dropdown menü tetikleyici chevron ikonunun doğru şekilde render edilmesini kontrol et
		const dropdownMenuTriggerChevronIcon = screen.getByTestId("dropdown-menu-trigger-chevron-icon");
		expect(dropdownMenuTriggerChevronIcon).toBeInTheDocument();
		expect(dropdownMenuTriggerChevronIcon).toHaveClass(
			"data-[sidebar-collapsed='true']:md:hidden data-[sidebar-collapsed='false']:group-open:-rotate-180",
		);

		// Chevron ikonunun doğru veri atributu ile render edilmesini kontrol et
		expect(dropdownMenuTriggerChevronIcon).toHaveAttribute("data-sidebar-collapsed", "false");
	});

	it("Should correctly render dropdown menu childs", () => {
		// Sidebar'ı açarak menüler içindeki alt öğelerin görünür hale gelmesini sağlıyoruz
		act(() => {
			setSidebarCollapsed({ isLocked: true, status: false });
		});

		// SidebarMenus bileşenini render ediyoruz
		render(<SidebarMenus menus={sidebarMenus} />);

		// Dropdown menüsünün içinde alt menülerin yer aldığı listeyi buluyoruz
		const dropdownMenuList = screen.getByTestId("dropdown-menu-list");

		// Liste öğesinin render edilmiş olup olmadığını kontrol ediyoruz
		expect(dropdownMenuList).toBeInTheDocument();

		// Sidebar öğelerini (menü item'larını) buluyoruz
		const sidebarItems = screen.getAllByTestId("sidebar-item-container");

		// İlk sidebar öğesinin render edilmiş olduğunu doğruluyoruz
		expect(sidebarItems[0]).toBeInTheDocument();

		// Sidebar öğelerinin sayısının doğru olduğunu kontrol ediyoruz
		// Burada 2 öğe bekliyoruz: birincisi "test-menu-1" ve ikincisi "test-menu-2" ile ilişkili alt menü
		expect(sidebarItems).toHaveLength(2);
	});
});
