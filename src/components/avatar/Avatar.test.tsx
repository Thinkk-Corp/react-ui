import { Avatar } from "@/components/avatar/Avatar";
import { render, screen } from "@testing-library/react";

describe("Avatar Component", () => {
	it("should render with the correct size class based on the 'size' prop", () => {
		render(<Avatar alt={""} size="sm" image="test.jpg" />);

		const avatarContainer = screen.getByTestId("avatar-container");
		// 'sm' boyutuna ait sınıfın uygulanıp uygulanmadığını kontrol ediyoruz
		expect(avatarContainer).toHaveClass("w-8 h-8"); // 'sm' boyutu
	});

	it("should apply the correct size class for 'md' by default", () => {
		render(<Avatar alt={""} image="test.jpg" />);

		const avatarContainer = screen.getByTestId("avatar-container");
		// Varsayılan olarak 'md' boyutunun sınıfının uygulanıp uygulanmadığını kontrol ediyoruz
		expect(avatarContainer).toHaveClass("w-12 h-12"); // Default size 'md'
	});

	it("should render with the correct rounded class based on the 'rounded' prop", () => {
		const { rerender } = render(<Avatar alt={""} size="md" rounded="lg" image="test.jpg" />);

		const avatarContainer = screen.getByTestId("avatar-container");
		// 'rounded' prop'u '2xl' olduğunda ilgili sınıfın uygulanıp uygulanmadığını kontrol ediyoruz
		expect(avatarContainer).toHaveClass("rounded-lg"); // '2xl' rounded class

		// 'sm' rounded durumu için testi tekrar yapıyoruz
		rerender(<Avatar alt={""} size="md" rounded="sm" image="test.jpg" />);
		// 'sm' prop'u için 'rounded' sınıfının uygulanıp uygulanmadığını kontrol ediyoruz
		expect(avatarContainer).toHaveClass("rounded");
	});

	it("should render the avatar image with correct alt text", () => {
		render(<Avatar size="md" image="test.jpg" alt="User Avatar" />);

		const avatarImage = screen.getByTestId("avatar-image");
		// 'alt' metninin doğru şekilde render edilip edilmediğini kontrol ediyoruz
		expect(avatarImage).toHaveAttribute("alt", "User Avatar");
	});

	it("should not render an image if the 'image' prop is not provided", () => {
		// @ts-ignore
		render(<Avatar size="md" />);

		const avatarImage = screen.queryByTestId("avatar-image");
		// 'image' prop'u verilmediğinde resmin render edilmediğini kontrol ediyoruz
		expect(avatarImage).not.toBeInTheDocument(); // Image should not be rendered if no 'image' prop
	});

	it("should apply the custom className passed as a prop", () => {
		render(<Avatar alt={""} size="md" image="test.jpg" className="custom-class" />);

		const avatarContainer = screen.getByTestId("avatar-container");
		// 'className' prop'u ile gelen özel sınıfın uygulanıp uygulanmadığını kontrol ediyoruz
		expect(avatarContainer).toHaveClass("custom-class");
	});

	it("should apply the correct class when rounded is 'sm'", () => {
		render(<Avatar alt={""} size="md" rounded="sm" image="test.jpg" />);

		const avatarContainer = screen.getByTestId("avatar-container");
		// 'sm' rounded olduğunda 'rounded' sınıfının uygulanıp uygulanmadığını kontrol ediyoruz
		expect(avatarContainer).toHaveClass("rounded"); // Should have the 'rounded' class when 'sm' is passed
	});
});
