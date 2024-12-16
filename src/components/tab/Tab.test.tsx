import { render, screen, fireEvent } from "@testing-library/react";
import { Tab } from "@/components/tab/Tab"; // Bileşen yolunuza göre güncelleyin

describe("Tab component", () => {
	const tabsMock = [
		{ label: "Tab 1", value: "tab1" },
		{ label: "Tab 2", value: "tab2" },
		{ label: "Tab 3", value: "tab3" },
	];

	const onChangeMock = jest.fn();

	// Sekmelerin doğru şekilde render edildiğini kontrol eder
	test("renders tabs correctly", () => {
		render(<Tab tabs={tabsMock} selectedTab="tab1" onChange={onChangeMock} />);

		const tabItems = screen.getAllByTestId("tab-item");
		expect(tabItems).toHaveLength(tabsMock.length);

		tabsMock.forEach((tab, index) => {
			expect(tabItems[index]).toHaveTextContent(tab.label);
		});
	});

	// Seçili sekmeye doğru aktif stillerin uygulandığını kontrol eder
	test("applies active styles to the selected tab", () => {
		render(<Tab tabs={tabsMock} selectedTab="tab2" onChange={onChangeMock} />);

		const activeTab = screen.getByText("Tab 2");
		expect(activeTab).toHaveAttribute("data-activated", "true");
		expect(activeTab).toHaveClass(
			"data-[activated='true']:text-white data-[activated='true']:opacity-100 data-[activated='false']:hover:opacity-100 data-[activated='false']:hover:bg-action-hover data-[activated='true']:bg-primary-main",
		);
	});

	// Bir sekme tıklandığında onChange fonksiyonunun çağrıldığını kontrol eder
	test("calls onChange when a tab is clicked", () => {
		render(<Tab tabs={tabsMock} selectedTab="tab1" onChange={onChangeMock} />);

		const tabToClick = screen.getByText("Tab 2");
		fireEvent.click(tabToClick);

		expect(onChangeMock).toHaveBeenCalledTimes(1);
		expect(onChangeMock).toHaveBeenCalledWith("tab2");
	});

	// Props değiştiğinde aktif sekmenin güncellendiğini kontrol eder
	test("updates the active tab when props change", () => {
		const { rerender } = render(<Tab tabs={tabsMock} selectedTab="tab1" onChange={onChangeMock} />);

		let activeTab = screen.getByText("Tab 1");
		expect(activeTab).toHaveAttribute("data-activated", "true");

		rerender(<Tab tabs={tabsMock} selectedTab="tab3" onChange={onChangeMock} />);

		activeTab = screen.getByText("Tab 3");
		expect(activeTab).toHaveAttribute("data-activated", "true");
	});

	// Özel className'in doğru şekilde uygulandığını kontrol eder
	test("handles custom className", () => {
		const customClass = "custom-class";
		render(<Tab tabs={tabsMock} selectedTab="tab1" className={customClass} onChange={onChangeMock} />);

		const tabContainer = screen.getByTestId("tab");
		expect(tabContainer).toHaveClass(customClass);
	});

	// Klavye ile sekmelerin doğru şekilde değiştirildiğini kontrol eder
	test("changes correctly selected tab when key press", () => {
		render(<Tab tabs={tabsMock} selectedTab="tab1" onChange={onChangeMock} />);

		const getActivatedTab = (tabNumber: number) => screen.getByText(`Tab ${tabNumber}`);

		const pressKey = (element: Node, key: string) => {
			fireEvent.keyDown(element, { key, code: key });
		};

		// Başlangıçta "Tab 1" seçili olmalı
		const selectedTab = getActivatedTab(1);
		expect(selectedTab).toHaveAttribute("data-activated", "true");

		// Sol ok ile "Tab 1"'de kalma durumu
		pressKey(selectedTab, "ArrowLeft");
		expect(selectedTab).toHaveAttribute("data-activated", "true");

		// Sağ ok ile diğer tablara geçiş
		for (let i = 2; i <= 3; i++) {
			pressKey(selectedTab, "ArrowRight");
			const nextTab = getActivatedTab(i);
			expect(nextTab).toHaveAttribute("data-activated", "true");
		}

		// Döngü tamamlandıktan sonra son tab "Tab 3" seçili olmalı
		const lastTab = getActivatedTab(3);
		expect(lastTab).toHaveAttribute("data-activated", "true");
	});
});
