import { storageTypes } from "@/enums/Storage";
import type { ILanguage } from "@/interfaces/ILanguage.ts";
import { initI18n } from "@/plugins/i18n/I18N.ts";
import i18next from "i18next";

const { getSelectedLanguage } = initI18n([]);

// Jest ile Storage API'lerini izlemek için spy tanımlamaları
jest.spyOn(Storage.prototype, "getItem");
jest.spyOn(Storage.prototype, "setItem");

describe("i18n utility functions", () => {
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
		localStorage.setItem(storageTypes.LANGUAGE_STORAGE, "en");

		// LocalStorage'dan kaydedilen dilin doğru şekilde alındığını doğrula
		expect(getSelectedLanguage()).toBe("en");

		// LocalStorage'ın doğru anahtar ile çağrıldığını kontrol et
		expect(localStorage.getItem).toHaveBeenCalledWith(storageTypes.LANGUAGE_STORAGE);
	});

	// Test: Seçili dili LocalStorage'a doğru şekilde kaydeder
	it("saves selected language to localStorage", () => {
		// "fr" dilini LocalStorage'a kaydet
		saveSelectedLanguage("fr");

		// LocalStorage'ın doğru anahtar ve değer ile çağrıldığını kontrol et
		expect(localStorage.setItem).toHaveBeenCalledWith(storageTypes.LANGUAGE_STORAGE, "fr");
	});

	// Test: i18next yapılandırmasını doğru parametrelerle başlatır
	it("initializes i18n with correct configuration", async () => {
		// LocalStorage'daki dil bilgisini temizle
		localStorage.setItem(storageTypes.LANGUAGE_STORAGE, "");

		// Test için örnek dil çeviri verisi
		const languageTranslations: ILanguage[] = [
			{ name: "English", flag: "", slug: "en", translations: { greeting: "Hello" }, is_default: true, is_fallback: false },
			{ name: "French", flag: "", slug: "fr", translations: { greeting: "Bonjour" }, is_default: false, is_fallback: true },
		];

		// i18n başlatılır
		await initI18n(languageTranslations);

		// i18next'in doğru yapılandırma parametreleri ile çağrıldığını doğrula
		expect(i18next.init).toHaveBeenCalledWith({
			lng: "en", // Varsayılan dil
			fallbackLng: "fr", // Yedek dil
			supportedLngs: ["en", "fr"], // Desteklenen diller
			interpolation: { escapeValue: false }, // React ile uyumlu
		});

		// Çeviri kaynaklarının doğru şekilde eklendiğini kontrol et
		expect(i18next.addResources).toHaveBeenCalledTimes(2); // İki dil kaynağı eklenmeli
		expect(i18next.addResources).toHaveBeenCalledWith("en", "translation", { greeting: "Hello" });
		expect(i18next.addResources).toHaveBeenCalledWith("fr", "translation", { greeting: "Bonjour" });
	});

	// Test: Dil değişimini doğru şekilde işler
	it("handles language change correctly", () => {
		// Dili "fr" olarak değiştir
		handleLanguageChange("fr");

		// i18next'in doğru dil ile çağrıldığını kontrol et
		expect(i18next.changeLanguage).toHaveBeenCalledWith("fr");

		// LocalStorage'ın doğru değer ile güncellendiğini kontrol et
		expect(localStorage.setItem).toHaveBeenCalledWith(storageTypes.LANGUAGE_STORAGE, "fr");
	});

	// Test: Otomatik dil algılama ile dil değişimini işler
	it("handles auto language detection on language change", () => {
		// Tarayıcı dilini manuel olarak "es-ES" olarak ayarla
		Object.defineProperty(window.navigator, "language", {
			value: "es-ES",
			writable: true,
		});

		// Dili otomatik algılama moduna değiştir
		handleLanguageChange("auto");

		// i18next'in tarayıcıdan algılanan dil ile çağrıldığını kontrol et
		expect(i18next.changeLanguage).toHaveBeenCalledWith("es");

		// LocalStorage'ın doğru değer ile güncellendiğini kontrol et
		expect(localStorage.setItem).toHaveBeenCalledWith(storageTypes.LANGUAGE_STORAGE, "es");
	});
});
