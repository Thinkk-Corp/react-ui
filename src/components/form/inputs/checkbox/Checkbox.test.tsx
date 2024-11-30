import { Checkbox } from "@/components/form/inputs/checkbox/Checkbox.tsx";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

describe("Checkbox Component - Class and Style Control", () => {
	it("should apply the correct size class based on the 'size' prop", () => {
		const { rerender } = render(<Checkbox name="test-checkbox" size="sm" />);

		// Verify that the checkbox label has the correct size class for 'sm'
		let label = screen.getByTestId("checkbox-label");
		expect(label).toHaveClass("w-4 h-4"); // 'sm' size class

		// Re-render with a different size
		rerender(<Checkbox name="test-checkbox" size="xl" />);

		// Verify the size class for 'xl'
		label = screen.getByTestId("checkbox-label");
		expect(label).toHaveClass("w-8 h-8"); // 'xl' size class
	});

	it("should apply the correct color class when checked", async () => {
		render(<Checkbox name="test-checkbox" readOnly checked={false} color="primary-main" />);

		// Initially, the checkbox should not be checked
		let label = screen.getByTestId("checkbox-label");
		expect(label).not.toHaveClass("bg-primary-main");

		// Check the checkbox
		fireEvent.click(label);

		// After checking, the checkbox should have the background color class
		label = screen.getByTestId("checkbox-label");
		await waitFor(() => expect(label).toHaveClass("bg-primary-main"));
	});

	it("should apply the invalid border style when 'isInvalid' is true", () => {
		render(<Checkbox name="test-checkbox" isInvalid />);

		// Check that the label has the 'data-[invalid=true]' class for invalid state
		const label = screen.getByTestId("checkbox-label");
		expect(label).toHaveClass("data-[invalid='true']:border-error-dark");
	});

	it("should apply custom className passed as a prop", () => {
		render(<Checkbox name="test-checkbox" className="custom-class" />);

		// Ensure the custom class is applied to the label element
		const label = screen.getByTestId("checkbox-label");
		expect(label).toHaveClass("custom-class");
	});

	it("should not apply 'bg-primary-main' when not checked", () => {
		render(<Checkbox name="test-checkbox" color="primary-main" />);

		// Initially, the checkbox is not checked, so 'bg-primary-main' should not be applied
		const label = screen.getByTestId("checkbox-label");
		expect(label).not.toHaveClass("bg-primary-main");
	});

	it("should apply the correct icon size based on the 'size' prop", () => {
		const { rerender } = render(<Checkbox name="test-checkbox" checked size="sm" />);

		// Verify that the check icon has the correct size for 'sm'
		const checkIcon = screen.getByTestId("check-icon");
		expect(checkIcon).toHaveClass("w-3 h-3");

		// Re-render with a larger size
		rerender(<Checkbox name="test-checkbox" size="xl" />);

		// Verify that the check icon has the correct size for 'xl'
		expect(checkIcon).toHaveClass("w-7 h-7");
	});

	it("should apply the correct styles when checked", () => {
		render(<Checkbox name="test-checkbox" checked />);

		// Ensure the check icon is present when the checkbox is checked
		const checkIcon = screen.getByTestId("check-icon");
		expect(checkIcon).toBeInTheDocument();

		// Ensure the checkbox label has the correct background color when checked
		const label = screen.getByTestId("checkbox-label");
		expect(label).toHaveClass("bg-primary-main"); // When checked, should apply color class
	});
});
