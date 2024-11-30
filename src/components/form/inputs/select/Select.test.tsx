import { Select } from "@/components/form/inputs/select/Select.tsx"; // Adjust the import path as necessary
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

// Mocking the server call (getOptionsAction)
jest.mock("@/actions/server/GetOptionsAction.ts", () => ({
	getOptionsAction: jest.fn(),
}));

describe("Select Component", () => {
	const defaultProps = {
		options: [
			{ value: "1", label: "Option 1" },
			{ value: "2", label: "Option 2" },
		],
		endpoint: "",
		className: "jest-config-class",
		isInvalid: false,
		onChange: jest.fn(),
		onClick: jest.fn(),
		onBlur: jest.fn(),
		isSearchable: false,
	};

	it("renders correctly with provided options", () => {
		render(<Select {...defaultProps} />);

		const input = screen.getByTestId("select-input");

		// Select placeholder render edildimi jest-config et
		expect(input).toHaveTextContent("Seçiniz");
		expect(screen.getByText("Option 1")).toBeInTheDocument();
		expect(screen.getByText("Option 2")).toBeInTheDocument();
	});

	it("opens and closes the dropdown when clicked", async () => {
		render(<Select {...defaultProps} />);

		const selectInput = screen.getByTestId("select-input");

		// Başlangıç dropdown kapalı
		expect(screen.getByTestId("select-menu")).toHaveClass("hidden");

		// Select tıklama
		fireEvent.click(selectInput);

		// Dropdown açıldı
		expect(screen.getByTestId("select-menu")).not.toHaveClass("hidden");

		// Tekrar tıklama dropdownu kapatır
		fireEvent.click(selectInput);
		expect(screen.getByTestId("select-menu")).toHaveClass("hidden");
	});

	it("handles option selection", () => {
		render(<Select {...defaultProps} />);

		const selectInput = screen.getByTestId("select-input");

		// Dropdownu aç
		fireEvent.click(selectInput);

		// Seçenek seç
		fireEvent.click(screen.getByText("Option 1"));

		// Onchange doğru değeri almışmı kontrol et
		expect(defaultProps.onChange).toHaveBeenCalledWith("1");

		// Seçim sonrası dropdown kapalımı
		expect(screen.getByTestId("select-menu")).toHaveClass("hidden");
	});

	it("filters options based on search input when searchable", async () => {
		const searchableProps = {
			...defaultProps,
			isSearchable: true,
		};

		render(<Select {...searchableProps} />);

		const selectInput = screen.getByTestId("select-input");

		// Dropdownu aç
		fireEvent.click(selectInput);

		// Arama alanına birşey gir
		fireEvent.change(selectInput, { target: { value: "Option 1" } });

		// Sonuçların filtrelenmesini bekle
		await waitFor(() => {
			expect(screen.getByText("Option 1")).toBeInTheDocument();
			expect(screen.queryByText("Option 2")).not.toBeInTheDocument();
		});
	});

	it('displays "No options available" when no options are passed', async () => {
		render(<Select {...defaultProps} options={[]} />);

		const selectInput = screen.getByTestId("select-input");

		// Dropdownu aç
		fireEvent.click(selectInput);

		// Beklenen "İçerik Bulunamadı" yazı görüntülendimi
		expect(screen.getByText("İçerik Bulunamadı")).toBeInTheDocument();
	});

	it("closes dropdown on outside click", async () => {
		render(<Select {...defaultProps} />);

		const selectInput = screen.getByTestId("select-input");

		// Dropdownu aç
		fireEvent.click(selectInput);

		// Dışarı tıkla
		fireEvent.click(document.body);

		// Dropdown kapanmalı
		await waitFor(() => {
			expect(screen.getByTestId("select-menu")).toHaveClass("hidden");
		});
	});
});
