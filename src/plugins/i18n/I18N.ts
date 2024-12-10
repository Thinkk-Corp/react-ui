import { storageTypes } from "@/enums/Storage";
import type { ILanguage } from "@/interfaces/ILanguage.ts";
import { useLanguageStore } from "@/stores/LanguageStore.ts";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";

// Zustand store'dan setSelectedLanguage'ı alıyoruz
const setSelectedLanguage = useLanguageStore.getState().setSelectedLanguage;

/**
 * i18n yapılandırmasını başlatan fonksiyon.
 *
 * @param {ILanguage[]} languageTranslations - Desteklenen diller ve çeviri verileri.
 * @returns {Promise<Object>} Returns an object with utility functions for handling language.
 */
export const initI18n = (languageTranslations: ILanguage[]): object | null => {
	/**
	 * Seçili dili localStorage'dan alır.
	 *
	 * @returns {ILanguage | null} Seçili dil veya null.
	 */
	const getSelectedLanguage = (): ILanguage | null => {
		const language = localStorage.getItem(storageTypes.LANGUAGE_STORAGE);
		if (!language) return null;
		return JSON.parse(language);
	};

	/**
	 * Seçili dili localStorage'a kaydeder ve Zustand store'a ekler.
	 *
	 * @param {string} slug - Kaydedilecek dilin slug'ı.
	 */
	const saveSelectedLanguage = (slug: string): void => {
		const selectedLanguage = languageTranslations.find((lang) => lang.slug === slug);
		if (!selectedLanguage) return;
		setSelectedLanguage(selectedLanguage);
	};

	/**
	 * Tarayıcı dilini tespit eder.
	 *
	 * @returns {string} Tespit edilen dil kodu (örn: "en").
	 */
	const detectBrowserLanguage = (): string => {
		return navigator.language.split("-")[0];
	};

	/**
	 * Seçili dili değiştirir.
	 *
	 * @param {string} selectedLanguage - Yeni dilin slug'ı. "auto" seçeneği tarayıcı dilini tespit eder.
	 */
	const handleLanguageChange = (selectedLanguage: string): void => {
		try {
			if (selectedLanguage === "auto") {
				const detectedLanguage = detectBrowserLanguage();
				i18next.changeLanguage(detectedLanguage);
				saveSelectedLanguage(detectedLanguage); // Tarayıcı dilini kaydet
			} else {
				i18next.changeLanguage(selectedLanguage);
				saveSelectedLanguage(selectedLanguage); // Kullanıcı dilini kaydet
			}
		} catch (error) {
			console.error("Dil değişimi hatası:", error);
		}
	};

	// Varsayılan ve yedek dil tanımları
	const supportedLanguages = languageTranslations.map(({ slug }) => slug);
	const browserLanguage = detectBrowserLanguage();
	const defaultLanguage = languageTranslations.find((lang) => lang.is_default);
	const fallbackLanguage = languageTranslations.find((lang) => lang.is_fallback)?.slug || browserLanguage;

	// LocalStorage'dan seçili dil alınır, yoksa varsayılan dil kaydedilir
	const selectedLanguage = getSelectedLanguage()?.slug ?? defaultLanguage?.slug ?? "tr";

	if (!getSelectedLanguage()) {
		saveSelectedLanguage(selectedLanguage);
	}

	// i18next yapılandırmasını başlatır
	try {
		const initialize = async () => {
			await i18next.use(initReactI18next).init({
				lng: selectedLanguage, // Kullanıcı seçimi veya varsayılan dil
				fallbackLng: fallbackLanguage, // Yedek dil
				supportedLngs: supportedLanguages, // Desteklenen diller
				interpolation: {
					escapeValue: false, // React ile uyumlu çeviri için escape işlemi kapalıdır
				},
			});
		};

		initialize();

		// Çeviri kaynaklarını ekler
		for (const { slug, translations } of languageTranslations) {
			i18next.addResources(slug, "translation", translations);
		}

		return { getSelectedLanguage, saveSelectedLanguage, detectBrowserLanguage, handleLanguageChange };
	} catch (error) {
		console.error("i18n yapılandırma hatası:", error);
		return null;
	}
};
