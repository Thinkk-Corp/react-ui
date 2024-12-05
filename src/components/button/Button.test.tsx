import { Button } from "@/components/button/Button"; // Gerekirse yolu ayarlayın
import { fireEvent, render, screen } from "@testing-library/react";

describe("Button Component", () => {
	it("renders with default props", () => {
		render(<Button>Click Me</Button>);

		const buttonElement = screen.getByRole("button", { name: /click me/i });

		// Varsayılan boyutun 'md' olup olmadığını kontrol et
		expect(buttonElement).toHaveClass("px-4 py-2 text-body2");
		// Varsayılan stilin 'contained' ve 'primary' olup olmadığını kontrol et
		expect(buttonElement).toHaveClass("bg-primary-main text-white border-primary-main");
	});

	it("renders with custom size", () => {
		render(<Button size="lg">Click Me</Button>);

		const buttonElement = screen.getByRole("button", { name: /click me/i });

		// Boyutun 'lg' olarak ayarlandığını kontrol et
		expect(buttonElement).toHaveClass("px-6 py-3 text-body2");
	});

	it("renders with different color schemes", () => {
		render(
			<>
				<Button colorScheme="secondary">Secondary</Button>
				<Button colorScheme="success">Success</Button>
			</>,
		);

		const secondaryButton = screen.getByRole("button", { name: /secondary/i });
		const successButton = screen.getByRole("button", { name: /success/i });

		// İkincil renk şemasının doğru uygulandığını kontrol et
		expect(secondaryButton).toHaveClass("bg-secondary-main text-white border-secondary-main");
		// Başarı renk şemasının doğru uygulandığını kontrol et
		expect(successButton).toHaveClass("bg-success-main text-white border-success-main");
	});

	it("renders with outlined variant", () => {
		render(<Button variant="outlined">Outlined</Button>);

		const buttonElement = screen.getByRole("button", { name: /outlined/i });

		// 'outlined' varyantının doğru uygulandığını kontrol et
		expect(buttonElement).toHaveClass("bg-transparent border-primary-main text-primary-main");
	});

	it("renders with underlined variant", () => {
		render(<Button variant="underlined">Underlined</Button>);

		const buttonElement = screen.getByRole("button", { name: /underlined/i });

		// 'underlined' varyantının doğru uygulandığını kontrol et
		expect(buttonElement).toHaveClass("bg-transparent hover:underline text-primary-main");
	});

	it("applies custom className", () => {
		render(<Button className="custom-class">Click Me</Button>);

		const buttonElement = screen.getByRole("button", { name: /click me/i });

		// Ekstra sınıfın uygulandığını kontrol et
		expect(buttonElement).toHaveClass("custom-class");
	});

	it("renders children correctly", () => {
		render(<Button>Submit</Button>);

		const buttonElement = screen.getByRole("button", { name: /submit/i });

		// Çocuk öğesinin doğru render edildiğini kontrol et
		expect(buttonElement).toHaveTextContent("Submit");
	});

	it("calls onClick handler when clicked", () => {
		const handleClick = jest.fn();
		render(<Button onClick={handleClick}>Click Me</Button>);

		const buttonElement = screen.getByRole("button", { name: /click me/i });
		fireEvent.click(buttonElement);

		// Tıklama olayının tetiklendiğini kontrol et
		expect(handleClick).toHaveBeenCalledTimes(1);
	});
});
