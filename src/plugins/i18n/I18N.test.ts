import i18next from "i18next";
import { storageTypes } from "@/enums/Storage";
import {
	getSelectedLanguage,
	saveSelectedLanguage,
	detectBrowserLanguage,
	handleLanguageChange,
	initI18n,
} from "@/plugins/i18n/I18N";
import type { ILanguage } from "@/interfaces/ILanguage";


//Todo: Mock hatası düzeltilmeli

describe("i18n Utils", () => {
	const mockLanguageStorageKey = storageTypes.LANGUAGE_STORAGE;

	beforeEach(() => {
		localStorage.clear();
	});

	/** Test getSelectedLanguage */
	test("getSelectedLanguage should return language from localStorage", () => {
		localStorage.setItem(mockLanguageStorageKey, "en");
		expect(getSelectedLanguage()).toBe("en");
	});

	test("getSelectedLanguage should return null if no language is set", () => {
		expect(getSelectedLanguage()).toBeNull();
	});

	/** Test saveSelectedLanguage */
	test("saveSelectedLanguage should save language to localStorage", () => {
		saveSelectedLanguage("tr");
		expect(localStorage.getItem(mockLanguageStorageKey)).toBe("tr");
	});

	/** Test detectBrowserLanguage */
	test("detectBrowserLanguage should return the browser's language prefix", () => {
		Object.defineProperty(window.navigator, "language", { value: "en-US", configurable: true });
		expect(detectBrowserLanguage()).toBe("en");
	});

	/** Test handleLanguageChange */
	test("handleLanguageChange should save language and call i18next.changeLanguage", () => {
		handleLanguageChange("fr");
		const changeLanguageSpy = jest.spyOn(i18next, "changeLanguage");
		expect(changeLanguageSpy).toHaveBeenCalledWith("fr");
		expect(localStorage.getItem(mockLanguageStorageKey)).toBe("fr");
	});

	test("handleLanguageChange should detect browser language if 'auto' is selected", () => {
		Object.defineProperty(window.navigator, "language", { value: "es-ES", configurable: true });
		handleLanguageChange("auto");
		const changeLanguageSpy = jest.spyOn(i18next, "changeLanguage");
		expect(changeLanguageSpy).toHaveBeenCalledWith("es");
		expect(localStorage.getItem(mockLanguageStorageKey)).toBe("es");
	});

	/** Test initI18n */
	test("initI18n should initialize i18next with correct options", async () => {
		const mockLanguages: ILanguage[] = [
			{ name: "English", flag: "", slug: "en", is_default: true, is_fallback: false, translations: { hello: "Hello" } },
			{ name: "Türkçe", flag: "", slug: "tr", is_default: false, is_fallback: true, translations: { hello: "Merhaba" } },
		];

		await initI18n(mockLanguages);

		const useSpy = jest.spyOn(i18next, "use");
		const initSpy = jest.spyOn(i18next, "init");
		const addResourcesSpy = jest.spyOn(i18next, "addResource");

		expect(useSpy).toHaveBeenCalled();
		expect(initSpy).toHaveBeenCalledWith(
			expect.objectContaining({
				lng: "en",
				fallbackLng: "tr",
				supportedLngs: ["en", "tr"],
			}),
		);

		expect(addResourcesSpy).toHaveBeenCalledWith("en", "translation", { hello: "Hello" });
		expect(addResourcesSpy).toHaveBeenCalledWith("tr", "translation", { hello: "Merhaba" });
	});

	test("initI18n should save default language if not already set", async () => {
		const mockLanguages: ILanguage[] = [
			{ name: "English", flag: "", slug: "en", is_default: true, is_fallback: false, translations: {} },
		];

		await initI18n(mockLanguages);

		expect(localStorage.getItem(mockLanguageStorageKey)).toBe("en");
	});
});
