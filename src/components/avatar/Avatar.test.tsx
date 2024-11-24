import { Avatar } from "@/components/avatar/Avatar"; // Gerekirse yolu ayarlayın
import { render, screen } from "@testing-library/react";

describe("Avatar Component", () => {
	test("varsayılan özelliklerle render edilir", () => {
		render(<Avatar alt={"test"} image="https://via.placeholder.com/150" />);

		const avatarContainer = screen.getByTestId("avatar-container");
		const avatarImage = screen.getByTestId("avatar-image");

		// Varsayılan boyutun 'md' olup olmadığını kontrol et
		expect(avatarContainer).toHaveClass("w-12 h-12");
		// Resim src ve alt özelliklerini doğrula
		expect(avatarImage).toHaveAttribute("src", "https://via.placeholder.com/150");
		expect(avatarImage).toHaveAttribute("alt", "test");
	});

	test("özel boyut uygular", () => {
		render(<Avatar alt={"test"} image="https://via.placeholder.com/150" size="lg" />);

		const avatarContainer = screen.getByTestId("avatar-container");

		// Özel boyutun ('lg') uygulandığını kontrol et
		expect(avatarContainer).toHaveClass("w-16 h-16");
	});

	test("özel alt metin uygular", () => {
		render(<Avatar image="https://via.placeholder.com/150" alt="test" />);

		const avatarImage = screen.getByTestId("avatar-image");

		// Özel alt metnin uygulandığını kontrol et
		expect(avatarImage).toHaveAttribute("alt", "test");
	});

	test("özel yuvarlaklık sınıfı uygular", () => {
		render(<Avatar alt={"test"} image="https://via.placeholder.com/150" rounded="lg" />);

		const avatarContainer = screen.getByTestId("avatar-container");

		// Özel yuvarlaklık sınıfının uygulandığını kontrol et
		expect(avatarContainer).toHaveClass("rounded-lg");
	});

	test("varsayılan yuvarlaklık sınıfı uygular", () => {
		render(<Avatar alt={"test"} image="https://via.placeholder.com/150" />);

		const avatarContainer = screen.getByTestId("avatar-container");

		// Varsayılan yuvarlaklık sınıfının uygulandığını kontrol et
		expect(avatarContainer).toHaveClass("rounded-full");
	});

	test("özel className uygular", () => {
		render(<Avatar alt={"test"} image="https://via.placeholder.com/150" className="custom-class" />);

		const avatarContainer = screen.getByTestId("avatar-container");

		// Özel className'in uygulandığını kontrol et
		expect(avatarContainer).toHaveClass("custom-class");
	});
});
