import { DropdownItem } from "@/components/dropdown/item/DropdownItem.tsx";
import { Dropdown, positionSchema } from "@/components/dropdown/main/Dropdown.tsx";
import { DropdownTrigger } from "@/components/dropdown/trigger/DropdownTrigger.tsx";
import type { IDropdownStyle } from "@/interfaces/components/dropdown/IDropdown.ts";
import { useThemeStore } from "@/stores/ThemeStore.ts";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";

const toggleTheme = useThemeStore.getState().toggleTheme;

describe("Dropdown Component", () => {
	// Test 1: isOpen true olduğunda dropdown'ın, tetikleyici ve öğeler ile doğru şekilde render edilip edilmediğini kontrol et
	it("should render the dropdown with trigger and items when isOpen is true", () => {
		render(
			<Dropdown isOpen={true}>
				<DropdownTrigger>test</DropdownTrigger>
				<DropdownItem>item 1</DropdownItem>
				<DropdownItem>item 2</DropdownItem>
			</Dropdown>,
		);

		const dropdown = screen.getByTestId("dropdown");
		expect(dropdown).toBeInTheDocument();

		const dropdownMenu = screen.getByTestId("dropdown-menu");
		expect(dropdownMenu).toBeInTheDocument();

		const dropdownTrigger = screen.getByTestId("dropdown-trigger");
		expect(dropdownTrigger).toBeInTheDocument();

		const dropdownItems = screen.getAllByTestId("dropdown-item");
		expect(dropdownItems).toHaveLength(2);
		expect(dropdownItems[0]).toHaveTextContent("item 1");
		expect(dropdownItems[1]).toHaveTextContent("item 2");
	});

	// Test 2: isOpen false olduğunda dropdown menüsünün render edilmediğinden emin ol
	it("should not render the dropdown menu when isOpen is false", () => {
		render(
			<Dropdown isOpen={false}>
				<DropdownTrigger>test</DropdownTrigger>
				<DropdownItem>item 1</DropdownItem>
				<DropdownItem>item 2</DropdownItem>
			</Dropdown>,
		);

		const dropdownMenu = screen.queryByTestId("dropdown-menu");
		expect(dropdownMenu).not.toBeInTheDocument();
	});

	// Test 3: Dropdown'ı tıkladığında açılıp kapanmasını ve uygun olay işleyicilerinin çağrıldığını jest-config et
	it("should toggle the dropdown and call the appropriate events on click", async () => {
		const mockOnOpened = jest.fn();
		const mockOnClosed = jest.fn();

		render(
			<Dropdown onClosed={mockOnClosed} onOpened={mockOnOpened}>
				<DropdownTrigger>test</DropdownTrigger>
				<DropdownItem>item 1</DropdownItem>
				<DropdownItem>item 2</DropdownItem>
			</Dropdown>,
		);

		const dropdownTrigger = screen.getByTestId("dropdown-trigger");

		// Dropdown'ı açmak için tıkla
		fireEvent.click(dropdownTrigger);
		const dropdownMenu = screen.getByTestId("dropdown-menu");
		expect(dropdownMenu).toBeInTheDocument();
		expect(mockOnOpened).toHaveBeenCalledTimes(1);

		// Dropdown'ı kapatmak için tıkla
		fireEvent.click(dropdownTrigger);
		expect(dropdownMenu).not.toBeInTheDocument();
		expect(mockOnClosed).toHaveBeenCalledTimes(2);
	});

	// Test 4: position prop'una göre dropdown'ın doğru pozisyonda render edildiğinden emin ol
	it("should render dropdown with correct position class", () => {
		const { rerender } = render(
			<Dropdown isOpen={true}>
				<DropdownTrigger>test</DropdownTrigger>
				<DropdownItem>item 1</DropdownItem>
				<DropdownItem>item 2</DropdownItem>
			</Dropdown>,
		);

		const dropdownMenu = screen.getByTestId("dropdown-menu");
		expect(dropdownMenu).toHaveClass(positionSchema["bottom-right"]);

		rerender(
			<Dropdown position="top-right" isOpen={true}>
				<DropdownTrigger>test</DropdownTrigger>
				<DropdownItem>item 1</DropdownItem>
				<DropdownItem>item 2</DropdownItem>
			</Dropdown>,
		);

		expect(dropdownMenu).toHaveClass(positionSchema["top-right"]);
	});

	// Test 5: size prop'una bağlı olarak dropdown'ın doğru boyut sınıflarını uyguladığından emin ol
	it("should apply the correct size class based on size prop", () => {
		const { rerender } = render(
			<Dropdown isOpen={true}>
				<DropdownTrigger>test</DropdownTrigger>
				<DropdownItem>item 1</DropdownItem>
				<DropdownItem>item 2</DropdownItem>
			</Dropdown>,
		);

		const dropdownMenu = screen.getByTestId("dropdown-menu");
		expect(dropdownMenu).toHaveClass("w-56");

		rerender(
			<Dropdown size="lg" isOpen={true}>
				<DropdownTrigger>test</DropdownTrigger>
				<DropdownItem>item 1</DropdownItem>
				<DropdownItem>item 2</DropdownItem>
			</Dropdown>,
		);

		expect(dropdownMenu).toHaveClass("w-64");
	});

	// Test 6: closeToClickOutside prop'u true ise dışarıya tıklayarak dropdown'ın kapanmasını jest-config et
	it("should close dropdown when clicking outside if closeToClickOutside is true", () => {
		render(
			<Dropdown isOpen={true}>
				<DropdownTrigger>test</DropdownTrigger>
				<DropdownItem>item 1</DropdownItem>
				<DropdownItem>item 2</DropdownItem>
			</Dropdown>,
		);

		const dropdownMenu = screen.getByTestId("dropdown-menu");

		// Dışarıya tıklayarak dropdown'ı kapat
		fireEvent.click(document.body);
		expect(dropdownMenu).not.toBeInTheDocument(); // Dışarıya tıklayınca dropdown kapanmalı

		// Şimdi dışarıya tıklama ile kapanmasını devre dışı bırak
		render(
			<Dropdown isOpen={true} closeToClickOutside={false}>
				<DropdownTrigger>test</DropdownTrigger>
				<DropdownItem>item 1</DropdownItem>
				<DropdownItem>item 2</DropdownItem>
			</Dropdown>,
		);

		const updatedDropdownMenu = screen.getByTestId("dropdown-menu");
		// Dışarıya tekrar tıklayın, şimdi dropdown açılmalı
		fireEvent.click(document.body);

		expect(updatedDropdownMenu).toBeInTheDocument(); // Dropdown hala görünür olmalı
	});

	// Test 7: closeToClickInside prop'u true ise içeride tıklayarak dropdown'ın kapanmasını jest-config et
	it("should close dropdown when clicking inside if closeToClickInside is true", () => {
		render(
			<Dropdown isOpen={true}>
				<DropdownTrigger>test</DropdownTrigger>
				<DropdownItem>item 1</DropdownItem>
				<DropdownItem>item 2</DropdownItem>
			</Dropdown>,
		);

		const dropdownMenu = screen.getByTestId("dropdown-menu");

		// İçeride tıklayarak dropdown'ı kapat
		fireEvent.click(dropdownMenu);
		expect(dropdownMenu).not.toBeInTheDocument(); // İçeride tıklayınca dropdown kapanmalı

		// Şimdi içeride tıklayarak kapanmayı devre dışı bırak
		render(
			<Dropdown isOpen={true} closeToClickInside={false}>
				<DropdownTrigger>test</DropdownTrigger>
				<DropdownItem>item 1</DropdownItem>
				<DropdownItem>item 2</DropdownItem>
			</Dropdown>,
		);

		const updatedDropdownMenu = screen.getByTestId("dropdown-menu");
		// İçeride tekrar tıklayın, dropdown hala açık kalmalı
		fireEvent.click(updatedDropdownMenu);

		expect(updatedDropdownMenu).toBeInTheDocument(); // Dropdown hala görünür olmalı
	});

	// Test 8: styles prop'u eklendiğinde stilin doğru şekilde uygulandığını jest-config et
	it("should apply styles when styles prop added", () => {
		const mockStyles: IDropdownStyle = {
			trigger: {
				defaultStyleActive: true,
				customStyle: "jest-config-style-trigger",
			},
			menu: {
				defaultStyleActive: true,
			},
			item: {
				defaultStyleActive: false,
				customStyle: "jest-config-style-item",
			},
		};
		render(
			<Dropdown styles={mockStyles} isOpen={true}>
				<DropdownTrigger>test</DropdownTrigger>
				<DropdownItem>item 1</DropdownItem>
				<DropdownItem>item 2</DropdownItem>
			</Dropdown>,
		);

		const dropdownTrigger = screen.getByTestId("dropdown-trigger");
		const dropdownMenu = screen.getByTestId("dropdown-menu");
		const dropdownItems = screen.getAllByTestId("dropdown-item");

		expect(dropdownTrigger).toHaveClass("bg-paper-card jest-config-style-trigger");
		expect(dropdownMenu).toHaveClass("bg-paper-card");
		expect(dropdownItems[0]).toHaveClass("jest-config-style-item");
		expect(dropdownItems[0]).not.toHaveClass("text-color-primary");
	});

	it("Should apply correct class to Dropdown Menu when theme change", async () => {
		render(
			<Dropdown isOpen={true}>
				<DropdownTrigger>test</DropdownTrigger>
				<DropdownItem>item 1</DropdownItem>
				<DropdownItem>item 2</DropdownItem>
			</Dropdown>,
		);

		const dropdownMenu = screen.getByTestId("dropdown-menu");

		expect(dropdownMenu).not.toHaveClass("shadow-card");

		act(() => {
			toggleTheme();
		});

		await waitFor(() => {
			expect(dropdownMenu).toHaveClass("shadow-card");
		});
	});
});
