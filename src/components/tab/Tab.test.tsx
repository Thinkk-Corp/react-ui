import { render, screen, fireEvent } from "@testing-library/react";
import { Tab } from "@/components/tab/Tab"; // Bileşen yolunuza göre güncelleyin

describe("Tab component", () => {
	const tabsMock = [
		{ label: "Tab 1", value: "tab1" },
		{ label: "Tab 2", value: "tab2" },
		{ label: "Tab 3", value: "tab3" },
	];

	const onChangeMock = jest.fn();

	test("renders tabs correctly", () => {
		render(<Tab tabs={tabsMock} selectedTab="tab1" onChange={onChangeMock} />);

		const tabItems = screen.getAllByTestId("tab-item");
		expect(tabItems).toHaveLength(tabsMock.length);

		tabsMock.forEach((tab, index) => {
			expect(tabItems[index]).toHaveTextContent(tab.label);
		});
	});

	test("applies active styles to the selected tab", () => {
		render(<Tab tabs={tabsMock} selectedTab="tab2" onChange={onChangeMock} />);

		const activeTab = screen.getByText("Tab 2");
		expect(activeTab).toHaveAttribute("data-activated", "true");
	});

	test("calls onChange when a tab is clicked", () => {
		render(<Tab tabs={tabsMock} selectedTab="tab1" onChange={onChangeMock} />);

		const tabToClick = screen.getByText("Tab 2");
		fireEvent.click(tabToClick);

		expect(onChangeMock).toHaveBeenCalledTimes(1);
		expect(onChangeMock).toHaveBeenCalledWith("tab2");
	});

	test("updates the active tab when props change", () => {
		const { rerender } = render(<Tab tabs={tabsMock} selectedTab="tab1" onChange={onChangeMock} />);

		let activeTab = screen.getByText("Tab 1");
		expect(activeTab).toHaveAttribute("data-activated", "true");

		rerender(<Tab tabs={tabsMock} selectedTab="tab3" onChange={onChangeMock} />);

		activeTab = screen.getByText("Tab 3");
		expect(activeTab).toHaveAttribute("data-activated", "true");
	});

	test("handles custom className", () => {
		const customClass = "custom-class";
		render(<Tab tabs={tabsMock} selectedTab="tab1" className={customClass} onChange={onChangeMock} />);

		const tabContainer = screen.getByTestId("tab");
		expect(tabContainer).toHaveClass(customClass);
	});
});
