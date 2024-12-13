import { render, screen } from "@testing-library/react";
import { Pill } from "@/components/pill/Pill";

describe("Pill Component", () => {
	it("renders with the correct text content", () => {
		render(<Pill>Pill Text</Pill>);
		expect(screen.getByTestId("pill")).toHaveTextContent("Pill Text");
	});

	it("applies the correct size class", () => {
		render(<Pill size="lg">Large Pill</Pill>);
		const pill = screen.getByTestId("pill");
		expect(pill).toHaveClass("py-1.5 px-4 text-body2");
	});

	it("applies the correct color scheme classes", () => {
		render(<Pill colorScheme="secondary">Secondary Pill</Pill>);
		const pill = screen.getByTestId("pill");
		expect(pill).toHaveClass("bg-secondary-light border-secondary-dark");
	});

	it("applies additional class names", () => {
		render(<Pill className="custom-class">Custom Class Pill</Pill>);
		const pill = screen.getByTestId("pill");
		expect(pill).toHaveClass("custom-class");
	});

	it("renders with default props when no props are provided", () => {
		render(<Pill>Default Pill</Pill>);
		const pill = screen.getByTestId("pill");
		expect(pill).toHaveClass("bg-primary-light border-primary-dark py-1 px-3 text-body2");
	});

	it("renders children correctly", () => {
		render(<Pill>Child Text</Pill>);
		expect(screen.getByTestId("pill")).toHaveTextContent("Child Text");
	});
});
