import { DropdownTrigger } from "@/components/dropdown/DropdownTrigger";
import { fireEvent, render, screen } from "@testing-library/react";

describe("DropdownTrigger Bileşeni", () => {
	// Test 1: DropdownTrigger bileşeninin doğru sınıflarla render edilmesi
	it("doğru default ve özel sınıflarla render edilmelidir", () => {
		const mockSetIsOpen = jest.fn();
		const style = {
			defaultStyleActive: true,
			customStyle: "jest-config-custom-style",
		};

		render(
			<DropdownTrigger isOpen={false} setIsOpen={mockSetIsOpen} style={style}>
				Test Trigger
			</DropdownTrigger>,
		);

		const dropdownTrigger = screen.getByTestId("dropdown-trigger");

		// Default ve özel stillerin uygulanıp uygulanmadığını kontrol et
		expect(dropdownTrigger).toHaveClass(
			"inline-flex items-center text-body2 overflow-hidden text-color-primary rounded-lg cursor-pointer border border-custom-divider bg-paper-card px-2 py-1",
		);
		expect(dropdownTrigger).toHaveClass("jest-config-custom-style");
		expect(dropdownTrigger).toHaveTextContent("Test Trigger");
	});

	// Test 2: onClick fonksiyonunun isOpen durumunu değiştirmesi
	it("tıklandığında isOpen durumunu değiştirmelidir", () => {
		const mockSetIsOpen = jest.fn();

		render(
			<DropdownTrigger isOpen={false} setIsOpen={mockSetIsOpen}>
				Test Trigger
			</DropdownTrigger>,
		);

		const dropdownTrigger = screen.getByTestId("dropdown-trigger");

		// Tıklama simülasyonu
		fireEvent.click(dropdownTrigger);

		// setIsOpen fonksiyonunun doğru parametreyle çağrıldığını kontrol et
		expect(mockSetIsOpen).toHaveBeenCalledWith(true);
	});

	// Test 3: setIsOpen undefined olduğunda onClick fonksiyonunun hiçbir şey yapmaması
	it("setIsOpen undefined ise hiçbir şey yapmamalıdır", () => {
		const mockSetIsOpen = jest.fn();

		render(
			<DropdownTrigger isOpen={false} setIsOpen={undefined}>
				Test Trigger
			</DropdownTrigger>,
		);

		const dropdownTrigger = screen.getByTestId("dropdown-trigger");

		// Tıklama simülasyonu
		fireEvent.click(dropdownTrigger);

		// setIsOpen fonksiyonunun çağrılmadığını kontrol et
		expect(mockSetIsOpen).not.toHaveBeenCalled();
	});
});
