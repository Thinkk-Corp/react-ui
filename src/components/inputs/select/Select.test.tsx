import { Select } from "@/components/inputs/select/Select";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

describe("Select Component", () => {
	const mockOptions = [
		{ value: "1", label: "Option 1" },
		{ value: "2", label: "Option 2" },
		{ value: "3", label: "Option 3" },
	];

	it("renders correctly with options", () => {
		// Select bileşenini seçeneklerle render et
		render(<Select options={mockOptions} />);

		// Bileşen kapsayıcısının render edildiğini doğrula
		const container = screen.getByTestId("select-container");
		expect(container).toBeInTheDocument();

		// Varsayılan metnin ("Select an option") görüntülendiğini doğrula
		const input = screen.getByTestId("select-input");
		expect(input).toHaveTextContent("Seçiniz");
	});

	it("shows options when clicked", () => {
		// Select bileşenini render et
		render(<Select options={mockOptions} />);

		// Seçim kutusuna tıkla
		const input = screen.getByTestId("select-input");
		fireEvent.click(input);

		// Tıklamadan sonra seçeneklerin görüntülendiğini doğrula
		const options = screen.getAllByTestId("select-option");
		expect(options.length).toBe(mockOptions.length + 1);
		expect(options[1]).toHaveTextContent("Option 1");
	});

	it("calls onChange when an option is selected", () => {
		// onChange fonksiyonunu izlemek için bir mock fonksiyon tanımla
		const mockOnChange = vi.fn();
		render(<Select options={mockOptions} onChange={mockOnChange} />);

		// Seçim kutusuna tıkla
		const input = screen.getByTestId("select-input");
		fireEvent.click(input);

		// Bir seçenek seç ve onChange'in çağrıldığını doğrula
		const options = screen.getAllByTestId("select-option");
		fireEvent.click(options[1]); // "Option 2" seçildi
		expect(mockOnChange).toHaveBeenCalledWith("1");
	});

	it("closes dropdown after selection", async () => {
		// Select bileşenini render et
		render(<Select options={mockOptions} />);

		// Seçim kutusuna tıkla
		const input = screen.getByTestId("select-input");
		fireEvent.click(input);

		// Bir seçenek seç ve açılır menünün kapandığını doğrula
		const options = screen.getAllByTestId("select-option");
		fireEvent.click(options[0]); // "Option 1" seçildi

		const container = screen.getByTestId("select-container");
		expect(container).toHaveAttribute("data-toggle", "false");
	});

	it("supports searchable input", async () => {
		// Arama destekli Select bileşenini render et
		render(<Select options={mockOptions} isSearchable />);

		// Arama girişine bir metin yaz
		const searchInput = screen.getByTestId("select-input");
		fireEvent.change(searchInput, { target: { value: "Option 2" } });

		// Filtrelenmiş sonuçların doğru olduğunu doğrula
		await waitFor(() => {
			const options = screen.getAllByTestId("select-option");
			expect(options.length).toBe(1);
			expect(options[0]).toHaveTextContent("Option 2");
		});
	});

	it("renders 'No content found' when no options match the search", async () => {
		// Arama destekli Select bileşenini render et
		render(<Select options={mockOptions} isSearchable />);

		// Arama girişine eşleşmeyen bir metin yaz
		const searchInput = screen.getByTestId("select-input");
		fireEvent.change(searchInput, { target: { value: "Non-existent" } });

		// Eşleşme olmadığında "İçerik Bulunamadı" mesajını doğrula
		await waitFor(() => {
			const noOptions = screen.getByTestId("select-no-option");
			expect(noOptions).toHaveTextContent("İçerik Bulunamadı");
		});
	});
});
