import { Select } from "@/components/form/inputs/select/Select";
import type { IOption } from "@/interfaces/components/form/inputs/ISelect";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

describe("Select Component", () => {
	// Testler başlamadan önce mock'ları temizliyoruz
	beforeEach(() => {
		jest.clearAllMocks();
	});

	// Varsayılan seçenekler
	const defaultOptions: IOption[] = [
		{ value: "1", label: "Option 1" },
		{ value: "2", label: "Option 2" },
	];

	// Bileşenin varsayılan props'larla doğru render edildiğini kontrol eder
	it("should render correctly with default props", () => {
		render(<Select options={defaultOptions} />);
		expect(screen.getByTestId("select-container")).toBeInTheDocument();
		expect(screen.getByTestId("select-input")).toHaveValue("Seçiniz");
	});

	// Dropdown açıldığında seçeneklerin görüntülendiğini kontrol eder
	it("should render options when dropdown is open", () => {
		render(<Select options={defaultOptions} />);
		fireEvent.click(screen.getByTestId("select-input"));
		expect(screen.getByTestId("select-menu")).toBeVisible();
		expect(screen.getAllByTestId("select-option").length).toBe(defaultOptions.length + 1); // +1 varsayılan seçenek
	});

	// Dropdown'un tıklama ile açılıp kapandığını kontrol eder
	it("should toggle dropdown on click", async () => {
		render(<Select options={defaultOptions} />);
		const input = screen.getByTestId("select-input");
		fireEvent.click(input);
		const menu = screen.queryByTestId("select-menu");
		expect(menu).not.toHaveClass("hidden");
		fireEvent.click(input);
		await waitFor(() => {
			expect(menu).toHaveClass("hidden");
		});
	});

	// Arama girdisine göre seçeneklerin filtrelendiğini kontrol eder
	it("should filter options based on search input", () => {
		render(<Select options={defaultOptions} isSearchable />);
		const input = screen.getByTestId("select-input");
		fireEvent.change(input, { target: { value: "Option 1" } });
		expect(screen.getAllByTestId("select-option").length).toBe(1);
		expect(screen.getByText("Option 1")).toBeInTheDocument();
	});

	// Bir seçenek seçildiğinde onChange fonksiyonunun çağrıldığını kontrol eder
	it("should call onChange when an option is selected", () => {
		const handleChange = jest.fn();
		render(<Select options={defaultOptions} onChange={handleChange} />);
		fireEvent.click(screen.getByTestId("select-input"));
		fireEvent.click(screen.getByText("Option 1"));
		expect(handleChange).toHaveBeenCalledWith("1");
	});

	// Bileşen dışına tıklanınca dropdown'ın kapandığını kontrol eder
	it("should close dropdown on outside click", async () => {
		render(<Select options={defaultOptions} />);
		fireEvent.click(screen.getByTestId("select-input"));
		expect(screen.getByTestId("select-menu")).not.toHaveClass("hidden");
		fireEvent.click(document.body);
		setTimeout(() => expect(screen.getByTestId("select-menu")).toHaveClass("hidden"), 100);
	});

	// Hatalı durumlarda hata stillerinin gösterildiğini kontrol eder
	it("should display error styles when isInvalid is true", () => {
		render(<Select isInvalid />);
		expect(screen.getByTestId("input-wrapper")).toHaveAttribute("data-invalid", "true");
	});

	// Hiç seçenek olmadığında 'İçerik Bulunamadı' yazısının gösterildiğini kontrol eder
	it("should display 'İçerik Bulunamadı' if no options are available", () => {
		render(<Select options={[]} />);
		fireEvent.click(screen.getByTestId("select-input"));
		expect(screen.getByText("İçerik Bulunamadı")).toBeInTheDocument();
	});

	// Blur olayında arama değerinin sıfırlandığını kontrol eder
	it("should reset searchValue on blur", () => {
		render(<Select options={defaultOptions} isSearchable defaultValue="1" />);
		const input = screen.getByTestId("select-input");
		fireEvent.change(input, { target: { value: "Some search" } });
		fireEvent.click(document.body);
		setTimeout(() => {
			expect(input).toHaveValue("Option 1");
		}, 100);
	});

	// Enter tuşuna basıldığında seçeneğin seçildiğini kontrol eder
	it("should select an option when Enter is pressed", () => {
		const handleChange = jest.fn();
		render(<Select options={defaultOptions} onChange={handleChange} />);
		fireEvent.click(screen.getByTestId("select-input"));
		const option = screen.getByText("Option 1");
		fireEvent.keyDown(option, { key: "Enter", code: "Enter" });
		expect(handleChange).toHaveBeenCalledWith("1");
	});

	// ArrowUp ve ArrowDown tuşlarına basıldığında seçenekler arasında geçiş yapıldığını kontrol eder
	it("should navigate through options with ArrowUp and ArrowDown", () => {
		render(<Select options={defaultOptions} isSearchable />);
		fireEvent.click(screen.getByTestId("select-input"));

		const selectOptions = screen.getAllByTestId("select-option");

		// ArrowDown ile seçenekler arasında geçişi test et
		fireEvent.keyDown(screen.getByTestId("select-input"), { key: "ArrowDown", code: "ArrowDown" });
		expect(selectOptions[1]).toHaveClass("bg-primary-main");

		fireEvent.keyDown(screen.getByTestId("select-input"), { key: "ArrowDown", code: "ArrowDown" });
		expect(selectOptions[2]).toHaveClass("bg-primary-main");

		fireEvent.keyDown(screen.getByTestId("select-input"), { key: "ArrowUp", code: "ArrowUp" });
		expect(selectOptions[1]).toHaveClass("bg-primary-main");
	});
});
