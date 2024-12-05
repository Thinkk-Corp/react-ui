import { FormCreator } from "@/components/form/creator/FormCreator.tsx";
import {
	type FormCreatorFields,
	buttons,
	fields,
	mockButtonAction,
	validationSchema,
	values,
} from "@/components/form/creator/FormCreatorStories.ts";
import type { IFormCreator } from "@/interfaces/components/form/IFormCreator.ts";
import { icons } from "@/plugins/Icons.tsx";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

describe("Form Creator Unit Test", () => {
	const mockSubmit = jest.fn();

	const defaultProps: IFormCreator<FormCreatorFields> = {
		fields,
		validationSchema,
		onSubmit: mockSubmit,
		buttons,
		header: "Test Form",
		icon: icons.outline.x,
		className: "test-class",
	};

	it("Should render FormCreator with default props correctly", () => {
		render(<FormCreator {...defaultProps} />);

		const formCreator = screen.getByTestId("card");
		expect(formCreator).toBeVisible();
		expect(formCreator).toHaveClass("test-class");
	});

	it("Should render Form Header with the correct content", () => {
		render(<FormCreator {...defaultProps} />);

		const formHeaderSection = screen.getByTestId("card-header");
		expect(formHeaderSection).toBeVisible();
		expect(formHeaderSection).toHaveClass("flex", "items-center", "gap-3");

		const formHeader = screen.getByTestId("form-header");
		expect(formHeader).toBeVisible();
		expect(formHeader).toHaveClass("text-h4");
		expect(formHeader).toHaveTextContent("Test Form");

		const formIcon = screen.getByTestId("form-icon");
		expect(formIcon).toBeVisible();
		expect(formIcon.querySelector("svg")).toBeInTheDocument();
		expect(formIcon).toHaveClass("shadow-2", "p-2");
	});

	it("Should render Form Body with all form controls correctly", () => {
		render(<FormCreator {...defaultProps} />);

		const formBody = screen.getByTestId("card-body");
		expect(formBody).toBeVisible();
		expect(formBody).toHaveClass("flex flex-col gap-5");

		const formControls = screen.getAllByTestId("form-control");
		expect(formControls).toHaveLength(6); // Adjusted to 5 for the fields (firstName, lastName, email, phoneNumber, country, language)

		const inputFields = screen.getAllByTestId("input");
		expect(inputFields).toHaveLength(4); // Ensure the correct number of input fields (firstName, lastName, email, phoneNumber)

		const selectFields = screen.getAllByTestId("select-container");
		expect(selectFields).toHaveLength(2); // Country and Language select fields

		const combinedFields = screen.getAllByTestId("combined-fields");
		expect(combinedFields).toHaveLength(1); // Full name combined field

		// Check combined fields contains correct input elements
		const combinedFieldInputs = combinedFields[0].querySelectorAll("[data-testid='form-control']");
		expect(combinedFieldInputs).toHaveLength(2); // Should have two input fields (firstName and lastName)
		expect(combinedFieldInputs[0].querySelector("input")).toBeInTheDocument();
		expect(combinedFieldInputs[1].querySelector("input")).toBeInTheDocument();
	});

	it("Should render Form Buttons correctly", () => {
		render(<FormCreator {...defaultProps} />);

		const formAction = screen.getByTestId("card-action");
		expect(formAction).toBeVisible();

		const formButtons = screen.getAllByTestId("button");
		expect(formButtons).toHaveLength(buttons.length); // Ensure the correct number of buttons are rendered

		buttons.forEach((button, index) => {
			const buttonElement = formButtons[index];
			expect(buttonElement).toHaveTextContent(button.text);
			if (button.colorScheme) {
				expect(buttonElement).toHaveClass(button.colorScheme);
			}
			if (button.variant) {
				expect(buttonElement).toHaveClass(button.variant);
			}
		});
	});

	it("Should call actions when no validation error", async () => {
		render(<FormCreator {...defaultProps} initialValues={values} />);

		const formButtons = screen.getAllByTestId("button");

		fireEvent.click(formButtons[0]); // Submit button

		await waitFor(() => {
			expect(mockSubmit).toHaveBeenCalledTimes(1);
		});

		fireEvent.click(formButtons[1]); // Reset button

		await waitFor(() => {
			expect(mockButtonAction).toHaveBeenCalledTimes(1);
		});
	});

	it("Should call actions when validation error", async () => {
		render(<FormCreator {...defaultProps} />);

		const formButtons = screen.getAllByTestId("button");

		fireEvent.click(formButtons[0]); // Submit button

		await waitFor(() => {
			// Validation errors should show up for required fields (like firstName, email, country, etc.)
			expect(screen.getByText("First name is required")).toBeInTheDocument();
			expect(screen.getByText("Email address is required")).toBeInTheDocument();
			expect(screen.getByText("Country is required")).toBeInTheDocument();
		});
	});
});
