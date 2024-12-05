import { CardHeader } from "@/components/card/header/CardHeader.tsx";
import { render, screen } from "@testing-library/react";

describe("CardHeader Component", () => {
	// CardHeader bileşeninin içine eklenen children içeriğinin doğru şekilde render edilip edilmediğini test ediyoruz.
	test("renders children content", () => {
		render(
			<CardHeader>
				<p>Test Content</p>
			</CardHeader>,
		);
		const content = screen.getByText("Test Content");

		// İçeriğin DOM'da bulunduğunu doğruluyoruz
		expect(content).toBeInTheDocument();
	});

	// Eğer `style` prop'u verilmezse ya da `defaultStyleActive` true ise, varsayılan stilin uygulanıp uygulanmadığını test ediyoruz.
	test("applies default style if style prop is not provided or defaultStyleActive is true", () => {
		render(<CardHeader>Default Style</CardHeader>);
		const cardHeader = screen.getByTestId("card-header");

		// CardHeader bileşeninin varsayılan stillerle render edildiğini doğruluyoruz
		expect(cardHeader).toHaveClass("text-h4");
		expect(cardHeader).toHaveClass("text-color-primary");
	});

	// `style` prop'u ile özel stil verildiğinde, bu stilin uygulanıp uygulanmadığını test ediyoruz.
	test("applies customStyle if provided in style prop", () => {
		render(<CardHeader style={{ customStyle: "custom-class", defaultStyleActive: false }}>Custom Style</CardHeader>);
		const cardHeader = screen.getByTestId("card-header");

		// Özel stilin ve varsayılan stilin uygulanmadığını kontrol ediyoruz
		expect(cardHeader).toHaveClass("custom-class");
		expect(cardHeader).not.toHaveClass("text-h4");
		expect(cardHeader).not.toHaveClass("text-color-primary");
	});

	// `className` prop'u ile ek sınıfların doğru şekilde uygulandığını test ediyoruz.
	test("applies additional class names provided through className prop", () => {
		render(<CardHeader className="additional-class">Additional Class</CardHeader>);
		const cardHeader = screen.getByTestId("card-header");

		// `className` ile eklenen sınıfın CardHeader bileşenine eklendiğini doğruluyoruz
		expect(cardHeader).toHaveClass("additional-class");
	});

	// `style` ve `className` prop'larının birlikte doğru şekilde birleştiğini test ediyoruz.
	test("combines customStyle and className correctly", () => {
		render(
			<CardHeader style={{ customStyle: "custom-style-class", defaultStyleActive: true }} className="additional-class">
				Combined Classes
			</CardHeader>,
		);
		const cardHeader = screen.getByTestId("card-header");

		// Hem özel stilin hem de eklenen sınıfın CardHeader bileşenine doğru şekilde uygulandığını doğruluyoruz
		expect(cardHeader).toHaveClass("custom-style-class");
		expect(cardHeader).toHaveClass("additional-class");
	});
});
