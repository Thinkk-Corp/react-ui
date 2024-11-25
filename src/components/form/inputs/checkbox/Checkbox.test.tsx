import { Checkbox } from "@/components/form/inputs/checkbox/Checkbox.tsx";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { render } from "@testing-library/react";
import { describe, it, vi } from "vitest";

describe("Checkbox Component", () => {
	it("renders correctly with default props", () => {
		render(<Checkbox name={"test"} />);
		const checkbox = screen.getByTestId("checkbox-label");
		expect(checkbox).toBeInTheDocument();
	});

	it("applies isInvalid class when isInvalid prop is true", () => {
		render(<Checkbox name={"test"} isInvalid />);
		const checkbox = screen.getByTestId("checkbox-label");
		expect(checkbox).toHaveStyle("border-color:var(--error-dark)");
	});

	it("applies isInvalid class when isInvalid prop is true and hovered or focused", () => {
		// Checkbox'ı isInvalid prop'u ile render et
		render(<Checkbox name={"test"} isInvalid />);

		const checkbox = screen.getByTestId("checkbox-label");
		const checkboxInput = screen.getByTestId("checkbox-input");

		// Checkbox üzerine gelindiğinde (hover)
		fireEvent.mouseOver(checkboxInput);
		expect(checkbox).toHaveStyle("border-color:var(--error-dark)"); // Hover durumunda doğru stilin uygulanıp uygulanmadığını kontrol et

		// Checkbox'a odaklandığında (focus)
		fireEvent.focus(checkboxInput);
		expect(checkbox).toHaveStyle("border-color:var(--error-dark)"); // Focus durumunda doğru stilin uygulanıp uygulanmadığını kontrol et

		// Odak noktası (blur) sonrası tekrar stil kontrolü
		fireEvent.blur(checkboxInput);
		expect(checkbox).toHaveStyle("border-color:var(--error-dark)"); // Focus kaybolduğunda stilin kaldırılmasını doğrula
	});

	it("calls onChange when checked", () => {
		const mockOnChange = vi.fn();
		render(<Checkbox name={"test"} onChange={mockOnChange} />);

		const checkboxInput = screen.getByTestId("checkbox-input");

		// Checkbox'ı tıklayarak checked durumu değiştir
		fireEvent.click(checkboxInput);

		// onChange fonksiyonunun çağrıldığını doğrula
		expect(mockOnChange).toHaveBeenCalled();

		// Checkbox'ın checked durumunun doğru olduğunu kontrol et
		expect(checkboxInput).toBeChecked();
	});

	it("When checked, a check icon appeared", async () => {
		render(<Checkbox name={"test"} />);
		const checkboxInput = screen.getByTestId("checkbox-input");

		// Checkbox'ı tıklayarak checked durumu değiştir
		fireEvent.click(checkboxInput);

		await waitFor(() => {
			const checkboxCheckIcon = screen.getByTestId("checkbox-check");
			expect(checkboxCheckIcon).toBeInTheDocument();
		});
	});
});
