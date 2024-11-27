import { Toggle } from "@/components/form/inputs/toggle/Toggle.tsx"; // Adjust the import path accordingly
import { fireEvent, render, screen } from "@testing-library/react";

describe("Toggle Component", () => {
	it("renders with default props", () => {
		render(<Toggle name="test-toggle" id="test-toggle" />);

		const toggle = screen.getByTestId("toggle-label");
		const input = screen.getByTestId("toggle-input");
		const iconBox = screen.getByTestId("toggle-iconbox");

		// Check if the default checkbox state is unchecked
		expect(input).not.toBeChecked();
		// Check if the initial background is the default (not the checked color)
		expect(toggle).toHaveClass("bg-custom-divider");
		// Check if the default icon is the 'x' icon
		expect(iconBox).toHaveClass("translate-x-0");
		expect(screen.getByTestId("toggle-icon")).toHaveAttribute("data-icon", "x");
	});

	it("renders with checked state", () => {
		render(<Toggle name="test-toggle" id="test-toggle" checked={true} />);

		const toggle = screen.getByTestId("toggle-label");
		const input = screen.getByTestId("toggle-input");
		const iconBox = screen.getByTestId("toggle-iconbox");

		// Check if the checkbox is initially checked
		expect(input).toBeChecked();
		// Check if the background color is changed when checked
		expect(toggle).toHaveClass("bg-primary-main");
		// Check if the icon is the 'check' icon
		expect(iconBox).toHaveClass("translate-x-full");
		expect(screen.getByTestId("toggle-icon")).toHaveAttribute("data-icon", "check");
	});

	it("toggles on click", () => {
		render(<Toggle name="test-toggle" id="test-toggle" />);

		const toggle = screen.getByTestId("toggle-label");
		const input = screen.getByTestId("toggle-input");
		const iconBox = screen.getByTestId("toggle-iconbox");

		// Initial state: unchecked
		expect(input).not.toBeChecked();
		expect(iconBox).toHaveClass("translate-x-0");
		expect(screen.getByTestId("toggle-icon")).toHaveAttribute("data-icon", "x");

		// Simulate a click event to check the toggle
		fireEvent.click(toggle);

		// After click: checked
		expect(input).toBeChecked();
		expect(iconBox).toHaveClass("translate-x-full");
		expect(screen.getByTestId("toggle-icon")).toHaveAttribute("data-icon", "check");

		// Simulate another click event to uncheck the toggle
		fireEvent.click(toggle);

		// After second click: unchecked
		expect(input).not.toBeChecked();
		expect(iconBox).toHaveClass("translate-x-0");
		expect(screen.getByTestId("toggle-icon")).toHaveAttribute("data-icon", "x");
	});

	it("applies custom className", () => {
		render(<Toggle name="test-toggle" id="test-toggle" className="custom-class" />);

		const toggle = screen.getByTestId("toggle-label");

		// Check if the custom class is applied
		expect(toggle).toHaveClass("custom-class");
	});

	it("applies custom color when checked", () => {
		render(<Toggle name="test-toggle" id="test-toggle" checked={true} color="secondary-main" />);

		const toggle = screen.getByTestId("toggle-label");

		// Check if the correct color class is applied when checked
		expect(toggle).toHaveClass("bg-secondary-main");
	});

	it("fires onChange handler on click", () => {
		const onChangeMock = jest.fn();

		render(<Toggle name="test-toggle" id="test-toggle" onChange={onChangeMock} />);

		const toggle = screen.getByTestId("toggle-label");

		// Simulate click and verify onChange is called
		fireEvent.click(toggle);
		expect(onChangeMock).toHaveBeenCalledTimes(1);

		fireEvent.click(toggle);
		expect(onChangeMock).toHaveBeenCalledTimes(2);
	});
});
