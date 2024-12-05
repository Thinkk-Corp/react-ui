import { fireEvent, render, screen } from "@testing-library/react";
import { Toggle } from "./Toggle"; // Gerekirse import yolunu düzenleyin

describe("Toggle Bileşeni", () => {
	const defaultProps = {
		onChange: jest.fn(),
		onBlur: jest.fn(),
	};

	it("toggle doğru boyut ve renk ile render edilmelidir", () => {
		render(<Toggle {...defaultProps} checked={false} color="primary-main" size="md" name="test-toggle" />);

		// Toggle'ın doğru sınıflara sahip olup olmadığını kontrol et
		const toggle = screen.getByTestId("toggle-label");
		expect(toggle).toHaveClass("h-8 w-14"); // 'md' boyutunun sınıflarını kontrol et
		expect(toggle).toHaveClass("bg-custom-divider"); // Varsayılan arka plan rengi
	});

	it("toggle seçili olduğunda arka plan renginin değiştiğini kontrol et", () => {
		render(<Toggle {...defaultProps} checked={true} color="primary-main" size="md" name="test-toggle" />);

		// Toggle'ın arka plan renginin seçili olduğunda doğru renge dönüştüğünü kontrol et
		const toggle = screen.getByTestId("toggle-label");
		expect(toggle).toHaveClass("bg-primary-main"); // Seçili durumda renk

		// Şimdi, toggle'ı kaldır ve arka plan renginin geri dönüp dönmediğini kontrol et
		fireEvent.click(toggle);
		expect(toggle).toHaveClass("bg-custom-divider"); // Seçili değilken varsayılan renk
	});

	it("toggle'a tıklanıldığında durum değişiyor mu?", () => {
		const { rerender } = render(<Toggle {...defaultProps} checked={false} color="primary-main" size="md" name="test-toggle" />);

		const toggle = screen.getByTestId("toggle-label");
		// Başlangıçta seçili değil
		expect(toggle).toHaveClass("bg-custom-divider");

		// Toggle'ı tıkla ve durumu kontrol et
		fireEvent.click(toggle);
		rerender(<Toggle {...defaultProps} checked={true} color="primary-main" size="md" name="test-toggle" />);
		expect(toggle).toHaveClass("bg-primary-main"); // Seçili durumda olması gerekiyor
	});

	it("boyut prop'ine göre doğru ikon boyutunun render edilmesi", () => {
		render(<Toggle {...defaultProps} checked={true} color="primary-main" size="lg" name="test-toggle" />);

		const iconBox = screen.getByTestId("toggle-icon-box");
		expect(iconBox).toHaveClass("h-8 w-8"); // 'lg' boyutunun sınıflarını kontrol et
	});

	it("value prop'u undefined veya null olduğunda durum değişmemeli", () => {
		const { rerender } = render(
			<Toggle {...defaultProps} checked={false} color="primary-main" size="md" name="test-toggle" value={undefined} />,
		);

		const toggle = screen.getByTestId("toggle-label");
		// Başlangıçta seçili değil
		expect(toggle).toHaveClass("bg-custom-divider");

		// value undefined olduğunda toggle durumunun değişmemesi gerektiğini kontrol et
		rerender(<Toggle {...defaultProps} checked={false} color="primary-main" size="md" name="test-toggle" value={null} />);
		expect(toggle).toHaveClass("bg-custom-divider"); // Hala seçili değil
	});

	it("isInvalid true olduğunda hata durumu uygulanmalı", () => {
		render(<Toggle {...defaultProps} checked={false} color="primary-main" size="md" name="test-toggle" isInvalid={true} />);

		const toggle = screen.getByTestId("toggle-label");
		expect(toggle).toHaveClass("bg-error-dark"); // Hata durumu rengi kontrol et
	});
});
