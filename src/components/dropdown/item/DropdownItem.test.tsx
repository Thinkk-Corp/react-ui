import { DropdownItem } from "@/components/dropdown/item/DropdownItem.tsx";
import type { ICustomStylesConfig } from "@/interfaces/types/ICustomStyleConfig.ts";
import { render, screen } from "@testing-library/react";

describe("DropdownItem Bileşeni", () => {
	// Test 1: DropdownItem bileşeninin doğru sınıflarla render edilmesi
	it("doğru default ve özel stillerle render edilmelidir", () => {
		const style: ICustomStylesConfig = {
			defaultStyleActive: true,
			customStyle: "jest-config-custom-style",
		};

		render(<DropdownItem styleClass={style}>Test Item</DropdownItem>);

		const dropdownItem = screen.getByTestId("dropdown-item");

		// Default ve özel stillerin doğru şekilde uygulanıp uygulanmadığını kontrol et
		expect(dropdownItem).toHaveClass("text-color-primary text-body2 hover:bg-action-hover p-3");
		expect(dropdownItem).toHaveClass("jest-config-custom-style");
		expect(dropdownItem).toHaveTextContent("Test Item");
	});

	// Test 2: Varsayılan stilin uygulanması (defaultStyleActive undefined veya null)
	it("defaultStyleActive undefined veya null olduğunda varsayılan stil uygulanmalıdır", () => {
		const style: ICustomStylesConfig = {
			defaultStyleActive: undefined,
			customStyle: "jest-config-custom-style",
		};

		render(<DropdownItem styleClass={style}>Test Item</DropdownItem>);

		const dropdownItem = screen.getByTestId("dropdown-item");

		// Varsayılan stilin uygulanıp uygulanmadığını kontrol et
		expect(dropdownItem).toHaveClass("text-color-primary text-body2 hover:bg-action-hover p-3");
		expect(dropdownItem).toHaveClass("jest-config-custom-style");
	});

	// Test 3: Varsayılan stilin devre dışı bırakılması (defaultStyleActive false)
	it("defaultStyleActive false olduğunda varsayılan stil devre dışı bırakılmalıdır", () => {
		const style: ICustomStylesConfig = {
			defaultStyleActive: false,
			customStyle: "jest-config-custom-style",
		};

		render(<DropdownItem styleClass={style}>Test Item</DropdownItem>);

		const dropdownItem = screen.getByTestId("dropdown-item");

		// Varsayılan stilin uygulanmadığını kontrol et
		expect(dropdownItem).not.toHaveClass("text-color-primary text-body2 hover:bg-action-hover p-3");
		expect(dropdownItem).toHaveClass("jest-config-custom-style");
	});

	// Test 4: Stil özelliği olmadan render edilmesi
	it("stil prop'u olmadan render edilmelidir", () => {
		render(<DropdownItem>Test Item</DropdownItem>);

		const dropdownItem = screen.getByTestId("dropdown-item");

		// Varsayılan stillerin doğru şekilde uygulanıp uygulanmadığını kontrol et
		expect(dropdownItem).toHaveClass("text-color-primary text-body2 hover:bg-action-hover p-3");
		expect(dropdownItem).not.toHaveClass("jest-config-custom-style");
	});

	it("Dropdown item isActivated propu doğru kontrol ediliyormu", () => {
		const { rerender } = render(<DropdownItem isActivated>Test Item</DropdownItem>);
		const dropdownItem = screen.getByTestId("dropdown-item");
		expect(dropdownItem).toHaveClass("bg-primary-main text-white");
		rerender(<DropdownItem>Test Item</DropdownItem>);
		expect(dropdownItem).toHaveClass("hover:bg-action-hover text-color-primary");
	});
});
