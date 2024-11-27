import { DropdownItem } from "@/components/dropdown/DropdownItem";
import type { ICustomStylesConfig } from "@/interfaces/components/dropdown/IDropdown";
import { render, screen } from "@testing-library/react";

describe("DropdownItem Bileşeni", () => {
	// Test 1: DropdownItem bileşeninin doğru sınıflarla render edilmesi
	it("doğru default ve özel stillerle render edilmelidir", () => {
		const style: ICustomStylesConfig = {
			defaultStyleActive: true,
			customStyle: "test-custom-style",
		};

		render(<DropdownItem style={style}>Test Item</DropdownItem>);

		const dropdownItem = screen.getByTestId("dropdown-item");

		// Default ve özel stillerin doğru şekilde uygulanıp uygulanmadığını kontrol et
		expect(dropdownItem).toHaveClass("text-color-primary text-body2 hover:bg-action-hover p-3");
		expect(dropdownItem).toHaveClass("test-custom-style");
		expect(dropdownItem).toHaveTextContent("Test Item");
	});

	// Test 2: Varsayılan stilin uygulanması (defaultStyleActive undefined veya null)
	it("defaultStyleActive undefined veya null olduğunda varsayılan stil uygulanmalıdır", () => {
		const style: ICustomStylesConfig = {
			defaultStyleActive: undefined,
			customStyle: "test-custom-style",
		};

		render(<DropdownItem style={style}>Test Item</DropdownItem>);

		const dropdownItem = screen.getByTestId("dropdown-item");

		// Varsayılan stilin uygulanıp uygulanmadığını kontrol et
		expect(dropdownItem).toHaveClass("text-color-primary text-body2 hover:bg-action-hover p-3");
		expect(dropdownItem).toHaveClass("test-custom-style");
	});

	// Test 3: Varsayılan stilin devre dışı bırakılması (defaultStyleActive false)
	it("defaultStyleActive false olduğunda varsayılan stil devre dışı bırakılmalıdır", () => {
		const style: ICustomStylesConfig = {
			defaultStyleActive: false,
			customStyle: "test-custom-style",
		};

		render(<DropdownItem style={style}>Test Item</DropdownItem>);

		const dropdownItem = screen.getByTestId("dropdown-item");

		// Varsayılan stilin uygulanmadığını kontrol et
		expect(dropdownItem).not.toHaveClass("text-color-primary text-body2 hover:bg-action-hover p-3");
		expect(dropdownItem).toHaveClass("test-custom-style");
	});

	// Test 4: Stil özelliği olmadan render edilmesi
	it("stil prop'u olmadan render edilmelidir", () => {
		render(<DropdownItem>Test Item</DropdownItem>);

		const dropdownItem = screen.getByTestId("dropdown-item");

		// Varsayılan stillerin doğru şekilde uygulanıp uygulanmadığını kontrol et
		expect(dropdownItem).toHaveClass("text-color-primary text-body2 hover:bg-action-hover p-3");
		expect(dropdownItem).not.toHaveClass("test-custom-style");
	});
});
