import { storageTypes } from "@/enums/Storage";
import type { ILanguage } from "@/interfaces/ILanguage.ts";
import {
	initI18n,
	detectBrowserLanguage,
	getSelectedLanguage,
	saveSelectedLanguage,
	handleLanguageChange,
} from "@/plugins/i18n/I18N.ts";
import i18next from "i18next";

// Jest ile Storage API'lerini izlemek için spy tanımlamaları
jest.spyOn(Storage.prototype, "getItem");
jest.spyOn(Storage.prototype, "setItem");

const mockLanguageTranslations: ILanguage[] = [
	{ name: "English", flag: "", slug: "en", translations: { greeting: "Hello" }, is_default: true, is_fallback: false },
	{ name: "French", flag: "", slug: "fr", translations: { greeting: "Bonjour" }, is_default: false, is_fallback: true },
];

const storeFormatTranslator = (data: ILanguage) => {
	const storeObj = { state: data, version: 0 };
	return JSON.stringify(storeObj);
};

describe("i18n utility functions", () => {
	beforeEach(() => {
		localStorage.clear();
	});

	// Test: Tarayıcı dilini doğru şekilde algılar
	it("detects browser language correctly", () => {
		// Tarayıcı dilini manuel olarak "en-US" olarak ayarla
		Object.defineProperty(window.navigator, "language", {
			value: "en-US",
			writable: true,
		});

		// Dil kodunun "en" olarak algılandığını doğrula
		expect(detectBrowserLanguage()).toBe("en");
	});

	// Test: LocalStorage'dan seçili dili doğru şekilde alır
	it("retrieves selected language from localStorage", () => {
		// LocalStorage'a bir dil kaydedilir
		saveSelectedLanguage(mockLanguageTranslations, "en");

		// LocalStorage'dan kaydedilen dilin doğru şekilde alındığını doğrula
		expect(getSelectedLanguage()).toStrictEqual(mockLanguageTranslations[0]);

		// LocalStorage'ın doğru anahtar ile çağrıldığını kontrol et
		expect(localStorage.getItem).toHaveBeenCalledWith(storageTypes.LANGUAGE_STORAGE);
	});

	// Test: Seçili dili LocalStorage'a doğru şekilde kaydeder
	it("saves selected language to localStorage", () => {
		// "fr" dilini LocalStorage'a kaydet
		saveSelectedLanguage(mockLanguageTranslations, "fr");

		// LocalStorage'ın doğru anahtar ve değer ile çağrıldığını kontrol et
		expect(localStorage.setItem).toHaveBeenCalledWith(
			storageTypes.LANGUAGE_STORAGE,
			storeFormatTranslator(mockLanguageTranslations[1]),
		);
	});

	// Test: i18next yapılandırmasını doğru parametrelerle başlatır
	it("initializes i18n with correct configuration", async () => {
		// i18n başlatılır
		await initI18n(mockLanguageTranslations);

		// i18next'in doğru yapılandırma parametreleri ile çağrıldığını doğrula
		expect(i18next.init).toHaveBeenCalledWith({
			lng: "en", // Varsayılan dil
			fallbackLng: "fr", // Yedek dil
			supportedLngs: ["en", "fr"], // Desteklenen diller
			interpolation: { escapeValue: false }, // React ile uyumlu,
			resources: {
				en: {
					translation: {
						greeting: "Hello",
					},
				},
				fr: {
					translation: {
						greeting: "Bonjour",
					},
				},
			},
		});
	});

	// Test: Dil değişimini doğru şekilde işler
	it("handles language change correctly", () => {
		// Dili "fr" olarak değiştir
		handleLanguageChange("fr");

		// i18next'in doğru dil ile çağrıldığını kontrol et
		expect(i18next.changeLanguage).toHaveBeenCalledWith("fr");

		// LocalStorage'ın doğru değer ile güncellendiğini kontrol et
		expect(localStorage.setItem).toHaveBeenCalledWith(
			storageTypes.LANGUAGE_STORAGE,
			storeFormatTranslator(mockLanguageTranslations[1]),
		);
	});

	// Test: Otomatik dil algılama ile dil değişimini işler
	it("handles auto language detection on language change", () => {
		// Tarayıcı dilini manuel olarak "es-ES" olarak ayarla
		Object.defineProperty(window.navigator, "language", {
			value: "en-EN",
			writable: true,
		});

		// Dili otomatik algılama moduna değiştir
		handleLanguageChange("auto");

		// i18next'in tarayıcıdan algılanan dil ile çağrıldığını kontrol et
		expect(i18next.changeLanguage).toHaveBeenCalledWith("en");

		// LocalStorage'ın doğru değer ile güncellendiğini kontrol et
		expect(localStorage.setItem).toHaveBeenCalledWith(
			storageTypes.LANGUAGE_STORAGE,
			storeFormatTranslator(mockLanguageTranslations[0]),
		);
	});
});
