import { FormControl } from "@/components/form/control/FormControl.tsx";
import type { IFormControl } from "@/interfaces/components/form/IFormControl.ts";
import { render, screen } from "@testing-library/react";

describe("FormControl Component", () => {
	// Default prop'larla FormControl bileşeninin doğru şekilde render edilip edilmediğini test ediyoruz.
	const defaultProps: IFormControl = {
		error: "",
		isRequired: false,
		label: "",
		children: <input data-testid="input" />,
		className: "",
	};

	// Bileşenin herhangi bir hata olmadan render edilip edilmediğini test ediyoruz.
	it("renders the component without crashing", () => {
		render(<FormControl {...defaultProps} />);
		expect(screen.getByTestId("control")).toBeInTheDocument();
		expect(screen.getByTestId("input")).toBeInTheDocument();
	});

	// `label` prop'u sağlandığında, etiketin doğru şekilde render edilip edilmediğini test ediyoruz.
	it("renders the label when the label prop is provided", () => {
		render(<FormControl {...defaultProps} label="Test Label" />);
		expect(screen.getByTestId("label-box")).toBeInTheDocument();
		expect(screen.getByTestId("label")).toHaveTextContent("Test Label");
	});

	// `label` prop'u sağlanmadığında, etiket kutusunun render edilmediğini test ediyoruz.
	it("does not render the label box when the label prop is not provided", () => {
		render(<FormControl {...defaultProps} />);
		expect(screen.queryByTestId("label-box")).not.toBeInTheDocument();
	});

	// `isRequired` prop'u true olduğunda, zorunlu işareti olan asteriksin doğru şekilde render edilip edilmediğini test ediyoruz.
	it("renders the required asterisk when isRequired is true", () => {
		render(<FormControl {...defaultProps} label="Test Label" isRequired={true} />);
		expect(screen.getByTestId("asterisk")).toBeInTheDocument();
		expect(screen.getByTestId("asterisk")).toHaveTextContent("*");
	});

	// `isRequired` prop'u false olduğunda, zorunlu işareti olan asteriksin render edilmediğini test ediyoruz.
	it("does not render the required asterisk when isRequired is false", () => {
		render(<FormControl {...defaultProps} label="Test Label" isRequired={false} />);
		expect(screen.queryByTestId("asterisk")).not.toBeInTheDocument();
	});

	// `error` prop'u sağlandığında, hata mesajının doğru şekilde render edilip edilmediğini test ediyoruz.
	it("displays the error message when the error prop is provided", () => {
		render(<FormControl {...defaultProps} error="Error message" />);
		const errorElement = screen.getByTestId("error");
		expect(errorElement).toBeInTheDocument();
		expect(errorElement).toHaveTextContent("Error message");
	});

	// `error` prop'u boş olduğunda, hata mesajının render edilmediğini test ediyoruz.
	it("does not display the error message when the error prop is empty", () => {
		render(<FormControl {...defaultProps} error="" />);
		expect(screen.queryByTestId("error")).not.toBeInTheDocument();
	});

	// Hata durumu olduğunda etiketin doğru stil ile render edilip edilmediğini test ediyoruz.
	it("applies the correct styles to the label when there is an error", () => {
		render(<FormControl {...defaultProps} label="Test Label" error="Error message" />);
		const labelElement = screen.getByTestId("label");
		expect(labelElement).toHaveAttribute("data-invalid", "true");
		expect(labelElement).toHaveClass("data-[invalid='true']:text-error-dark");
	});

	// `className` prop'u ile verilen ek sınıfların doğru şekilde render edilip edilmediğini test ediyoruz.
	it("renders additional class names passed via the className prop", () => {
		render(<FormControl {...defaultProps} className="custom-class" />);
		const container = screen.getByTestId("control");
		expect(container).toHaveClass("custom-class");
	});
});
