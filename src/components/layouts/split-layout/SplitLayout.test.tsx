import { SplitLayout } from "@/components/layouts/split-layout/SplitLayout.tsx";
import { useThemeStore } from "@/stores/ThemeStore.ts";
import { act, render, screen, waitFor } from "@testing-library/react";

const toggleTheme = useThemeStore.getState().toggleTheme;

describe("SplitLayout", () => {
	it("renders correctly with light theme", () => {
		act(() => {
			toggleTheme();
		});

		render(<SplitLayout image="image.jpg" title="Test Title" subtitle="Test Subtitle" />);

		// İlk temanın doğru bir şekilde uygulandığını test et
		expect(screen.getByTestId("split-layout")).toHaveClass("bg-split-layout-light");
	});

	it("renders content correctly", () => {
		render(<SplitLayout image="image.jpg" title="Test Title" subtitle="Test Subtitle" />);

		// Başlık ve alt başlığın doğru şekilde render edildiğini test et
		expect(screen.getByTestId("title")).toHaveTextContent("Test Title");
		expect(screen.getByTestId("subtitle")).toHaveTextContent("Test Subtitle");
	});

	it("renders the image if passed as a prop", () => {
		render(<SplitLayout image="image.jpg" title="Test Title" subtitle="Test Subtitle" />);

		// Resim elemanının doğru özelliklere sahip olduğunu test et
		const imgElement = screen.getByTestId("image");
		expect(imgElement).toHaveAttribute("src", "image.jpg");
		expect(imgElement).toHaveAttribute("alt", "Test Title");
	});

	it("changes theme to dark when toggled", async () => {
		render(<SplitLayout image="image.jpg" title="Test Title" subtitle="Test Subtitle" />);

		// Başlangıçta ışık temasını bekle
		expect(screen.getByTestId("split-layout")).toHaveClass("bg-split-layout-light");

		// Tema değişimini simüle et
		act(() => {
			toggleTheme();
		});

		// Tema değişiminden sonra karanlık temayı bekle
		await waitFor(() => expect(screen.getByTestId("split-layout")).toHaveClass("bg-split-layout-dark"));
	});
});
