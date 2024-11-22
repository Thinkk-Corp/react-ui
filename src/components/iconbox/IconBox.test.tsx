import { IconBox } from "@/components/iconbox/IconBox"; // İlgili import yolunu düzenleyin
import { icons } from "@/plugins/Icons"; // İlgili import yolunu düzenleyin
import { render, screen } from "@testing-library/react";

describe("IconBox Component", async () => {
	test("varsayılan propslarla render edilir", () => {
		render(<IconBox>{icons.outline.x}</IconBox>);

		const iconBox = screen.getByTestId("icon-box-container");
		const icon = screen.getByTestId("icon-box-child");

		// Varsayılan boyutun 'md' olup olmadığını kontrol et
		expect(iconBox).toHaveClass("text-color-primary"); // Varsayılan renk
		expect(icon).toHaveClass("w-6 h-6"); // Varsayılan boyut 'md' olmalı
		expect(icon).toBeInTheDocument(); // İkonun render edildiğinden emin ol
	});

	test("özelleştirilmiş boyut uygulanır", () => {
		render(<IconBox size="lg">{icons.outline.x}</IconBox>);

		const icon = screen.getByTestId("icon-box-child");

		// Özelleştirilmiş boyutun ('lg') uygulandığını kontrol et
		expect(icon).toHaveClass("w-10 h-10");
	});

	test("özelleştirilmiş renk uygulanır", () => {
		render(<IconBox color="color-secondary">{icons.outline.x}</IconBox>);

		const iconBox = screen.getByTestId("icon-box-container");

		// Özelleştirilmiş rengin uygulandığını kontrol et
		expect(iconBox).toHaveClass("text-color-secondary");
	});

	test("isHoverable true olduğunda hover efekti uygulanır", () => {
		render(<IconBox isHoverable>{icons.outline.x}</IconBox>);

		const iconBox = screen.getByTestId("icon-box-container");

		// Hover sınıfının uygulandığından emin ol
		expect(iconBox).toHaveClass("transition-transform");
		expect(iconBox).toHaveClass("transform");
		expect(iconBox).toHaveClass("hover:bg-action-hover");
	});

	test("özelleştirilmiş className uygulanır", () => {
		render(<IconBox className="custom-class">{icons.outline.x}</IconBox>);

		const iconBox = screen.getByTestId("icon-box-container");

		// Özelleştirilmiş className'in uygulandığını kontrol et
		expect(iconBox).toHaveClass("custom-class");
	});
});
