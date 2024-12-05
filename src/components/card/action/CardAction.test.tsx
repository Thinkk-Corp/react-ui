import { CardAction } from "@/components/card/action/CardAction.tsx";
import { render, screen } from "@testing-library/react";

describe("CardAction Component", () => {
	// CardAction bileşeninin içine eklenen children içeriğinin doğru şekilde render edilip edilmediğini test ediyoruz.
	test("renders children content", () => {
		render(
			<CardAction>
				<button type={"button"}>Action Button</button>
			</CardAction>,
		);
		const button = screen.getByText("Action Button");

		// Button'ın DOM'da bulunduğunu doğruluyoruz
		expect(button).toBeInTheDocument();
	});

	// Eğer `style` prop'u verilmezse ya da `defaultStyleActive` true ise, varsayılan stilin uygulanıp uygulanmadığını test ediyoruz.
	test("applies default style if style prop is not provided or defaultStyleActive is true", () => {
		render(<CardAction>Default Style</CardAction>);
		const cardAction = screen.getByTestId("card-action");

		// CardAction bileşeninin varsayılan stillerle render edildiğini doğruluyoruz
		expect(cardAction).toHaveClass("flex");
		expect(cardAction).toHaveClass("items-center");
		expect(cardAction).toHaveClass("justify-end");
		expect(cardAction).toHaveClass("gap-4");
	});

	// `style` prop'u ile özel stil verildiğinde, bu stilin uygulanıp uygulanmadığını test ediyoruz.
	test("applies customStyle if provided in style prop", () => {
		render(<CardAction style={{ customStyle: "custom-class", defaultStyleActive: false }}>Custom Style</CardAction>);
		const cardAction = screen.getByTestId("card-action");

		// Özel stilin ve varsayılan stilin uygulanmadığını kontrol ediyoruz
		expect(cardAction).toHaveClass("custom-class");
		expect(cardAction).not.toHaveClass("flex");
		expect(cardAction).not.toHaveClass("items-center");
		expect(cardAction).not.toHaveClass("justify-end");
		expect(cardAction).not.toHaveClass("gap-4");
	});

	// `className` prop'u ile ek sınıfların doğru şekilde uygulandığını test ediyoruz.
	test("applies additional class names provided through className prop", () => {
		render(<CardAction className="additional-class">Additional Class</CardAction>);
		const cardAction = screen.getByTestId("card-action");

		// `className` ile eklenen sınıfın CardAction bileşenine eklendiğini doğruluyoruz
		expect(cardAction).toHaveClass("additional-class");
	});

	// `style` ve `className` prop'larının birlikte doğru şekilde birleştiğini test ediyoruz.
	test("combines customStyle and className correctly", () => {
		render(
			<CardAction style={{ customStyle: "custom-style-class", defaultStyleActive: true }} className="additional-class">
				Combined Classes
			</CardAction>,
		);
		const cardAction = screen.getByTestId("card-action");

		// Hem özel stilin hem de eklenen sınıfın CardAction bileşenine doğru şekilde uygulandığını doğruluyoruz
		expect(cardAction).toHaveClass("custom-style-class");
		expect(cardAction).toHaveClass("additional-class");
	});
});
