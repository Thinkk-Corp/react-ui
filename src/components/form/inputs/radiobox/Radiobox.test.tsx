import { Radiobox } from "@/components/form/inputs/radiobox/Radiobox.tsx";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Radiobox Component", () => {
	it("renders with default props", () => {
		render(<Radiobox readOnly checked name="test-radio" />);

		// input elemanını seç
		const radiobox = screen.getByTestId("radiobox");

		// input elemanının doğru şekilde render edildiğini doğrula
		expect(radiobox).toBeInTheDocument();
		expect(radiobox).toHaveAttribute("type", "radio");
		expect(radiobox).toHaveAttribute("name", "test-radio");
	});

	it("applies the correct color when the 'color' prop is passed", () => {
		render(<Radiobox readOnly checked name="test-radio" color="primary-main" />);

		const radiobox = screen.getByTestId("radiobox");

		// 'primary-main' rengi doğru şekilde uygulanmalı
		expect(radiobox).toHaveClass("text-primary-main");
	});

	it("applies the correct size based on the 'size' prop", () => {
		render(<Radiobox readOnly checked name="test-radio" size="lg" />);

		const radiobox = screen.getByTestId("radiobox");

		// 'lg' boyutu doğru şekilde uygulanmalı
		expect(radiobox).toHaveClass("w-6 h-6");
	});

	it("triggers the 'onChange' event when checked", () => {
		const mockOnChange = jest.fn();
		render(<Radiobox name="test-radio" onChange={mockOnChange} />);

		const radiobox = screen.getByTestId("radiobox");

		// input'a tıkla
		fireEvent.click(radiobox);

		// onChange fonksiyonunun çağrıldığını doğrula
		expect(mockOnChange).toHaveBeenCalled();
	});

	it("applies the correct shadow when checked", () => {
		render(<Radiobox readOnly checked name="test-radio" color="primary-main" />);

		const radiobox = screen.getByTestId("radiobox");

		// Seçili durumda 'checked' için shadow uygulanmalı
		expect(radiobox).toHaveClass("checked:shadow-[inset_0_0_0_3px_white]");
	});

	it("applies the correct border color when checked", () => {
		render(<Radiobox readOnly checked name="test-radio" color="primary-main" />);

		const radiobox = screen.getByTestId("radiobox");

		// Seçili durumda doğru renk uygulanmalı
		expect(radiobox).toHaveClass("checked:border-transparent checked:bg-current");
	});
});
