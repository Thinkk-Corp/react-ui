import { Checkbox } from "@/components/form/inputs/checkbox/Checkbox";
import type { IRadioBox } from "@/interfaces/components/form/inputs/IRadioBox.ts";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

describe("Checkbox Component", () => {
	const defaultProps: IRadioBox = {
		id: "test-checkbox",
		name: "testName",
		color: "primary-main",
		onChange: jest.fn(),
		onBlur: jest.fn(),
		size: "md",
	};

	it("should render the checkbox with default props", () => {
		render(<Checkbox {...defaultProps} />);
		const label = screen.getByTestId("checkbox-label");
		const input = screen.getByTestId("checkbox-input");
		expect(label).toBeInTheDocument();
		expect(input).toBeInTheDocument();
		expect(input).not.toBeChecked();
	});

	it("should apply the correct size class", () => {
		render(<Checkbox {...defaultProps} size="lg" />);
		const label = screen.getByTestId("checkbox-label");
		expect(label).toHaveClass("w-6 h-6");
	});

	it("should render the check icon when checked", async () => {
		render(<Checkbox {...defaultProps} checked={true} />);
		const checkIcon = screen.queryByTestId("check-icon");
		await waitFor(() => {
			expect(checkIcon).toBeInTheDocument();
		});
	});

	it("should toggle checked state when clicked", () => {
		render(<Checkbox {...defaultProps} />);
		const input = screen.getByTestId("checkbox-input");

		expect(input).not.toBeChecked();
		fireEvent.click(input);
		expect(input).toBeChecked();
		fireEvent.click(input);
		expect(input).not.toBeChecked();
	});

	it("should call onChange when the checkbox state changes", () => {
		const handleChange = jest.fn();
		render(<Checkbox {...defaultProps} onChange={handleChange} />);
		const input = screen.getByTestId("checkbox-input");
		fireEvent.click(input);
		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(handleChange).toHaveBeenCalledWith(expect.any(Object)); // ChangeEvent object
	});

	it("should display error styles when isInvalid is true", () => {
		render(<Checkbox {...defaultProps} isInvalid />);
		const label = screen.getByTestId("checkbox-label");
		expect(label).toHaveAttribute("data-invalid", "true");
		expect(label).toHaveClass("data-[invalid='true']:border-error-dark");
	});

	it("should update the checked state when value prop changes", () => {
		const { rerender } = render(<Checkbox {...defaultProps} checked={false} value={false} />); // Başlangıçta kontrolsüz değil, kontrollü bir durum başlatıyoruz.
		const input = screen.getByTestId("checkbox-input");
		expect(input).not.toBeChecked(); // Başlangıçta checked = false

		// value prop'u değiştiğinde, checked durumunun güncellenmesi gerektiğini kontrol et
		rerender(<Checkbox {...defaultProps} checked={false} value={true} />);
		expect(input).toBeChecked(); // value=true olduğunda input checked olmalı

		rerender(<Checkbox {...defaultProps} checked={false} value={false} />);
		expect(input).not.toBeChecked(); // value=false olduğunda input unchecked olmalı
	});

	it("should use defaultValue for initial state", () => {
		render(<Checkbox {...defaultProps} defaultChecked />);
		const input = screen.getByTestId("checkbox-input");
		expect(input).toBeChecked();
	});

	it("should render with custom className", () => {
		render(<Checkbox {...defaultProps} className="custom-class" />);
		const label = screen.getByTestId("checkbox-label");
		expect(label).toHaveClass("custom-class");
	});

	it("should handle uncontrolled behavior correctly", () => {
		render(<Checkbox {...defaultProps} />);
		const input = screen.getByTestId("checkbox-input");
		expect(input).not.toBeChecked();
		fireEvent.click(input);
		expect(input).toBeChecked();
		fireEvent.click(input);
		expect(input).not.toBeChecked();
	});
});
