import { Input } from "@/components/form/inputs/input/Input.tsx";
import type { IIconBox } from "@/interfaces/components/IIconBox.ts";
import { fireEvent, render, screen } from "@testing-library/react";

// Mock IconBox component
// `IconBox` bileşeni testlerde gerçek bir bağımlılık olmadan kullanılabilmesi için mocklanmıştır.
jest.mock("@/components/icon-box/IconBox.tsx", () => ({
	IconBox: ({ children, ...props }: IIconBox) => <div {...props}>{children}</div>,
}));

describe("Input Component", () => {
	it("renders with default props", () => {
		// Input bileşeni varsayılan özelliklerle render edilir ve DOM'da bulunup bulunmadığı kontrol edilir.
		render(<Input placeholder="Test input" />);
		const inputElement = screen.getByTestId("input");
		expect(inputElement).toBeInTheDocument(); // Input elementinin render edildiğini doğrular.
	});

	it("renders with the correct size class", () => {
		// Input bileşenine özel bir `customSize` özelliği sağlandığında, doğru sınıfın eklendiği kontrol edilir.
		render(<Input customSize="lg" placeholder="Test input" />);
		const inputWrapper = screen.getByTestId("input-wrapper");
		expect(inputWrapper).toHaveClass("h-11"); // `customSize="lg"` için beklenen `h-11` sınıfının varlığını doğrular.
	});

	it("calls onChange when value changes", () => {
		// Kullanıcı girdiği değeri değiştirdiğinde, `onChange` fonksiyonunun çağrıldığı kontrol edilir.
		const mockOnChange = jest.fn(); // `onChange` için bir mock fonksiyon oluşturulur.
		render(<Input value="" onChange={mockOnChange} placeholder="Test input" />);
		const inputElement = screen.getByTestId("input");
		fireEvent.change(inputElement, { target: { value: "New value" } });
		expect(mockOnChange).toHaveBeenCalled(); // `onChange` fonksiyonunun çağrıldığını doğrular.
	});

	it("applies isInvalid class when isInvalid prop is true", () => {
		// `isInvalid` özelliği `true` olarak ayarlandığında, ilgili hata sınıflarının ve stillerinin uygulandığı kontrol edilir.
		render(<Input isInvalid={true} placeholder="Test input" />);
		const inputWrapper = screen.getByTestId("input-wrapper");
		expect(inputWrapper).toHaveAttribute("data-invalid", "true"); // `data-invalid="true"` özelliğinin varlığını kontrol eder.
		expect(inputWrapper).toHaveStyle("border-color : var(--error-dark)"); // Hata durumunda sınır renginin uygulandığını doğrular.
	});

	it("renders icon if icon prop is provided", () => {
		// `icon` özelliği sağlandığında, ikonun DOM'da render edildiği kontrol edilir.
		render(<Input icon={<span>🔍</span>} placeholder="Test input" />);
		const iconElement = screen.getByTestId("input-icon");
		expect(iconElement).toBeInTheDocument(); // İkonun render edildiğini doğrular.
	});
});
