import { storageTypes } from "@/enums/Storage";
import type { ILanguage } from "@/interfaces/ILanguage.ts";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";

/**
 * Seçili dili localStorage'dan alır.
 *
 * @returns {string | null} Seçili dil veya null.
 */
export const getSelectedLanguage = (): string | null => {
	const language = localStorage.getItem(storageTypes.LANGUAGE_STORAGE);
	return language !== "" ? language : null;
};

/**
 * Seçili dili localStorage'a kaydeder.
 *
 * @param {string} selectedLanguage - Kaydedilecek dil.
 */
export const saveSelectedLanguage = (selectedLanguage: string): void => {
	localStorage.setItem(storageTypes.LANGUAGE_STORAGE, selectedLanguage);
};

/**
 * Tarayıcı dilini tespit eder.
 *
 * @returns {string} Tespit edilen dil kodu (örn: "en").
 */
export const detectBrowserLanguage = (): string => {
	return navigator.language.split("-")[0];
};

/**
 * i18n yapılandırmasını başlatan fonksiyon.
 *
 * @param {ILanguage[]} languageTranslations - Desteklenen diller ve çeviri verileri.
 */
export const initI18n = async (languageTranslations: ILanguage[]): Promise<void> => {
	// Desteklenen dillerin slug değerlerini belirler
	const supportedLanguages = languageTranslations.map(({ slug }) => slug);

	// Varsayılan ve yedek dil tanımları
	const browserLanguage = detectBrowserLanguage();
	const defaultLanguage = languageTranslations.find((lang) => lang.is_default)?.slug || browserLanguage;
	const fallbackLanguage = languageTranslations.find((lang) => lang.is_fallback)?.slug || browserLanguage;

	// LocalStorage'dan seçili dil alınır, yoksa varsayılan dil kaydedilir
	const selectedLanguage = getSelectedLanguage() ?? defaultLanguage;
	if (!getSelectedLanguage()) {
		saveSelectedLanguage(defaultLanguage);
	}

	// i18next yapılandırmasını başlatır
	try {
		await i18next.use(initReactI18next).init({
			lng: selectedLanguage, // Kullanıcı seçimi veya varsayılan dil
			fallbackLng: fallbackLanguage, // Yedek dil
			supportedLngs: supportedLanguages, // Desteklenen diller
			interpolation: {
				escapeValue: false, // React ile uyumlu çeviri için escape işlemi kapalıdır
			},
		});

		// Çeviri kaynaklarını ekler
		for (const { slug, translations } of languageTranslations) {
			i18next.addResources(slug, "translation", translations);
		}
	} catch (error) {
		console.error("i18n yapılandırma hatası:", error);
	}
};

/**
 * Seçili dili değiştirir.
 *
 * @param {string} selectedLanguage - Yeni dilin slug'ı. "auto" seçeneği tarayıcı dilini tespit eder.
 */
export const handleLanguageChange = (selectedLanguage: string): void => {
	try {
		if (selectedLanguage === "auto") {
			const detectedLanguage = detectBrowserLanguage();
			i18next.changeLanguage(detectedLanguage);
			saveSelectedLanguage(detectedLanguage);
		} else {
			i18next.changeLanguage(selectedLanguage);
			saveSelectedLanguage(selectedLanguage);
		}
	} catch (error) {
		console.error("Dil değişimi hatası:", error);
	}
};
