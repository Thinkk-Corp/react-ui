import { Textarea } from "@/components/form/inputs/textarea/Textarea.tsx";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

describe("Textarea Component", () => {
	// Textarea bileşeninin doğru şekilde render olup olmadığını test ediyoruz.
	test("renders correctly", () => {
		render(<Textarea data-testid="textarea" />);

		const textarea = screen.getByTestId("textarea");

		// Textarea öğesinin DOM'da olup olmadığını kontrol ediyoruz
		expect(textarea).toBeInTheDocument();

		// Textarea öğesinin doğru sınıflarla render edildiğini doğruluyoruz
		expect(textarea).toHaveClass("px-3 py-2 w-full rounded-lg border align-top shadow-2 text-body1");
	});

	// onChange olayının doğru şekilde çalışıp çalışmadığını test ediyoruz.
	test("calls onChange event", async () => {
		const handleChange = jest.fn(); // Jest ile mock fonksiyon oluşturuyoruz.
		render(<Textarea onChange={handleChange} data-testid="textarea" />);

		const textarea = screen.getByTestId("textarea");

		// Normalde bir yazı girilmesiyle change olayını tetikliyoruz.
		fireEvent.change(textarea, { target: { value: "Test input" } });

		await waitFor(() => {
			// onChange fonksiyonunun bir kez çağrıldığını doğruluyoruz.
			expect(handleChange).toHaveBeenCalledTimes(1);

			// Girilen değerin doğru şekilde textarea'ya yansıdığını kontrol ediyoruz.
			expect(textarea).toHaveValue("Test input");
		});
	});

	// `isInvalid` prop'unun doğru şekilde çalışıp çalışmadığını test ediyoruz.
	test("applies isInvalid prop correctly", () => {
		const { rerender } = render(<Textarea isInvalid data-testid="textarea" />);

		const textarea = screen.getByTestId("textarea");

		// `isInvalid` prop'u true olduğunda data-invalid atributunun 'true' olarak ayarlandığını kontrol ediyoruz.
		expect(textarea).toHaveAttribute("data-invalid", "true");

		// Hatalı duruma giren sınıfın doğru şekilde eklendiğini doğruluyoruz.
		expect(textarea).toHaveClass("data-[invalid='true']:border-error-dark");

		// `isInvalid` prop'unu false olarak yeniden render ediyoruz.
		rerender(<Textarea isInvalid={false} data-testid="textarea" />);

		// data-invalid atributunun 'false' olarak değiştiğini kontrol ediyoruz.
		expect(textarea).toHaveAttribute("data-invalid", "false");

		// Sınıfların doğru şekilde değiştiğini doğruluyoruz.
		expect(textarea).toHaveClass("data-[invalid='false']:hover:border-primary-main");
	});

	// `rows` ve `className` prop'larının doğru şekilde alındığını test ediyoruz.
	test("accepts custom rows and className props", () => {
		render(<Textarea rows={6} className="custom-class" data-testid="textarea" />);

		const textarea = screen.getByTestId("textarea");

		// `rows` prop'unun doğru şekilde ayarlandığını kontrol ediyoruz.
		expect(textarea).toHaveAttribute("rows", "6");

		// `className` prop'unun doğru şekilde uygulandığını doğruluyoruz.
		expect(textarea).toHaveClass("custom-class");
	});
});
