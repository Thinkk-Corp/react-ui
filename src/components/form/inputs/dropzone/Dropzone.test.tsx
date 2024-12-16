import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Dropzone } from "@/components/form/inputs/dropzone/Dropzone";

// onFilesAccepted callback fonksiyonunun sahte bir mock versiyonu
const mockOnFilesAccepted = jest.fn();

// Belirtilen boyut, ad ve türde sahte bir dosya oluşturur
const createFile = (size: number, name: string, type: string) => {
	const content = new Array(size).fill("a").join("");
	return new File([content], name, { type });
};

// Test için geçerli dosya ve boyutu büyük dosya örnekleri
const validFile = createFile(1024 * 512, "valid-file.txt", "text/plain"); // 512 KB
const largeFile = createFile(1024 * 1024 + 1, "large-file.txt", "text/plain"); // 1 MB + 1 byte

// Mock dosya girişi fonksiyonu, input elementine dosyaları manuel olarak tanımlar
const mockFileInput = (target: HTMLElement, file: File) => {
	Object.defineProperty(target, "files", {
		value: [file],
		writable: true,
	});
};

describe("Dropzone Component", () => {
	// DataTransfer nesnesinin jest mock fonksiyonu ile taklit edilmesi
	beforeAll(() => {
		global.DataTransfer = jest.fn().mockImplementation(() => ({
			items: {
				add: jest.fn(),
			},
			files: [],
			setData: jest.fn(),
			getData: jest.fn(),
		}));
	});

	// Her testten önce jest mock fonksiyonlarının sıfırlanması
	beforeEach(() => {
		jest.clearAllMocks();
		jest.restoreAllMocks();
	});

	// Dropzone bileşeninin doğru şekilde render edilip edilmediğini kontrol eder
	test("Should render correctly", () => {
		render(<Dropzone />);

		// Gerekli HTML elemanlarının mevcut olup olmadığını kontrol eder
		expect(screen.getByTestId("dropzone")).toBeInTheDocument();
		expect(screen.getByTestId("dropzone-outer-container")).toBeInTheDocument();
		expect(screen.getByTestId("dropzone-container")).toBeInTheDocument();
		expect(screen.getByTestId("dropzone-input")).toBeInTheDocument();
		expect(screen.getByTestId("dropzone-drag-text")).toHaveTextContent("theme.dropzone.drag_inactive_label");
		expect(screen.queryByTestId("dropzone-rules-text")).not.toBeInTheDocument();
		expect(screen.queryAllByTestId("dropzone-file")).toHaveLength(0);
	});

	// Sürükle bırak etkinlikleri sırasında doğru metinlerin görüntülenip görüntülenmediğini kontrol eder
	test("Should display correct text on drag events", () => {
		render(<Dropzone />);

		const container = screen.getByTestId("dropzone-container");

		fireEvent.dragEnter(container);
		expect(screen.getByTestId("dropzone-drag-text")).toHaveTextContent("theme.dropzone.drag_active_label");

		fireEvent.dragLeave(container);
		expect(screen.getByTestId("dropzone-drag-text")).toHaveTextContent("theme.dropzone.drag_inactive_label");
	});

	// Geçerli bir dosya yüklendiğinde onFilesAccepted fonksiyonunun çağrıldığını doğrular
	test("Should call onFilesAccepted when valid file is uploaded", async () => {
		render(<Dropzone onFilesAccepted={mockOnFilesAccepted} maxSize={1024 * 1024} />);

		const input = screen.getByTestId("dropzone-input");

		mockFileInput(input, validFile);
		fireEvent.change(input);

		// onFilesAccepted'in doğru parametrelerle çağrıldığını kontrol eder
		await waitFor(() => {
			expect(mockOnFilesAccepted).toHaveBeenCalledWith([validFile]);
		});
	});

	// Dosya boyutu sınırını aşan bir dosya yüklendiğinde onFilesAccepted'in çağrılmadığını doğrular
	test("Should not call onFilesAccepted when file size exceeds limit", () => {
		render(<Dropzone onFilesAccepted={mockOnFilesAccepted} maxSize={1024 * 1024} />);

		const input = screen.getByTestId("dropzone-input");

		mockFileInput(input, largeFile);
		fireEvent.change(input);

		// onFilesAccepted'in boş bir array ile çağrıldığını ve sadece bir kez çalıştığını doğrular
		expect(mockOnFilesAccepted).toHaveBeenCalledWith([]);
		expect(mockOnFilesAccepted).toHaveBeenCalledTimes(1);
	});

	// Yüklenen dosyaların doğru şekilde görüntülendiğini ve kaldırılabildiğini kontrol eder
	test("Should display uploaded files correctly and allow removal", async () => {
		render(<Dropzone maxSize={1024 * 1024} />);

		const input = screen.getByTestId("dropzone-input");

		mockFileInput(input, validFile);
		fireEvent.change(input);

		// Yüklenen dosyaların doğru şekilde listelendiğini kontrol eder
		const files = screen.queryAllByTestId("dropzone-file");

		await waitFor(() => {
			expect(files).toHaveLength(1);
			expect(files[0]).toHaveTextContent("valid-file.txt");
			expect(files[0]).toHaveTextContent("0.5 MB");
		});

		// Dosya kaldırma simgesinin var olduğunu ve çalıştığını doğrular
		const removeButton = files[0].querySelector("svg");
		expect(removeButton).toBeInTheDocument();

		if (removeButton) {
			fireEvent.click(removeButton);
		}

		// Dosya kaldırıldıktan sonra listenin boş olduğunu kontrol eder
		await waitFor(() => {
			expect(screen.queryAllByTestId("dropzone-file")).toHaveLength(0);
		});
	});
});
