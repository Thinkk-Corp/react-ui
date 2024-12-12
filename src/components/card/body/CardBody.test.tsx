import { CardBody } from "@/components/card/body/CardBody.tsx";
import { render, screen } from "@testing-library/react";

describe("CardBody Component", () => {
	// CardBody bileşeninin içine eklenen children içeriğinin doğru şekilde render edilip edilmediğini test ediyoruz.
	test("renders children content", () => {
		render(
			<CardBody>
				<p>Test Content</p>
			</CardBody>,
		);
		const content = screen.getByText("Test Content");

		// İçeriğin DOM'da bulunduğunu doğruluyoruz
		expect(content).toBeInTheDocument();
	});

	// Eğer `style` prop'u verilmezse ya da `defaultStyleActive` true ise, varsayılan stilin uygulanıp uygulanmadığını test ediyoruz.
	test("applies default style if style prop is not provided or defaultStyleActive is true", () => {
		render(<CardBody>Default Style</CardBody>);
		const cardBody = screen.getByTestId("card-body");

		// CardBody bileşeninin varsayılan stillerle render edildiğini doğruluyoruz
		expect(cardBody).toHaveClass("text-body2");
		expect(cardBody).toHaveClass("text-color-primary");
	});

	// `style` prop'u ile özel stil verildiğinde, bu stilin uygulanıp uygulanmadığını test ediyoruz.
	test("applies customStyle if provided in style prop", () => {
		render(<CardBody styleClass={{ customStyle: "custom-class", defaultStyleActive: false }}>Custom Style</CardBody>);
		const cardBody = screen.getByTestId("card-body");

		// Özel stilin ve varsayılan stilin uygulanmadığını kontrol ediyoruz
		expect(cardBody).toHaveClass("custom-class");
		expect(cardBody).not.toHaveClass("text-body2");
		expect(cardBody).not.toHaveClass("text-color-primary");
	});

	// `className` prop'u ile ek sınıfların doğru şekilde uygulandığını test ediyoruz.
	test("applies additional class names provided through className prop", () => {
		render(<CardBody className="additional-class">Additional Class</CardBody>);
		const cardBody = screen.getByTestId("card-body");

		// `className` ile eklenen sınıfın CardBody bileşenine eklendiğini doğruluyoruz
		expect(cardBody).toHaveClass("additional-class");
	});

	// `style` ve `className` prop'larının birlikte doğru şekilde birleştiğini test ediyoruz.
	test("combines customStyle and className correctly", () => {
		render(
			<CardBody styleClass={{ customStyle: "custom-style-class", defaultStyleActive: true }} className="additional-class">
				Combined Classes
			</CardBody>,
		);
		const cardBody = screen.getByTestId("card-body");

		// Hem özel stilin hem de eklenen sınıfın CardBody bileşenine doğru şekilde uygulandığını doğruluyoruz
		expect(cardBody).toHaveClass("custom-style-class");
		expect(cardBody).toHaveClass("additional-class");
	});
});
