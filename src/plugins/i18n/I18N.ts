import { storageTypes } from "@/enums/Storage";
import type { ILanguage } from "@/interfaces/ILanguage.ts";
import type { ILanguageData } from "@/interfaces/stores/ILanguageStore";
import { useLanguageStore } from "@/stores/LanguageStore.ts";
import i18next, { type Resource } from "i18next";
import { initReactI18next } from "react-i18next";
import { toaster } from "@/plugins/Toaster";

// Zustand store erişimleri
const { setSelectedLanguage, setLanguages } = useLanguageStore.getState();

/**
 * Seçili dili localStorage'dan alır.
 *
 * @returns {ILanguageData | null} Seçili dil veya null.
 */
export const getSelectedLanguage = (): ILanguageData | null => {
	try {
		const language = localStorage.getItem(storageTypes.LANGUAGE_STORAGE);
		return language ? JSON.parse(language).state : null;
	} catch (error) {
		console.error("LocalStorage okunamadı:", error);
		return null;
	}
};

/**
 * Seçili dili localStorage'a kaydeder ve Zustand store'a ekler.
 *
 * @param {string} slug - Kaydedilecek dilin slug'ı.
 * @param {ILanguageData[]} languages - Dil verileri.
 */
export const saveSelectedLanguage = (languages: ILanguageData[], slug: string): void => {
	const selectedLanguage = languages.find((lang) => lang.slug === slug);
	if (!selectedLanguage) {
		console.warn(`Belirtilen slug için dil bulunamadı: ${slug}`);
		return;
	}
	setSelectedLanguage(selectedLanguage);
};

/**
 * Tarayıcı dilini tespit eder.
 *
 * @returns {string} Tespit edilen dil kodu (örn: "en").
 */
export const detectBrowserLanguage = (): string => {
	return (navigator.language || "en").split("-")[0];
};

/**
 * i18n yapılandırmasını başlatan fonksiyon.
 *
 * @param {ILanguage[]} languageTranslations - Desteklenen diller ve çeviri verileri.
 * @returns {Promise<void>}
 */
export const initI18n = async (languageTranslations: ILanguage[]): Promise<void> => {
	try {
		const formattedLanguages = languageTranslations.map(({ is_default, is_fallback, translations, ...lang }) => lang);
		const supportedLanguages = languageTranslations.map(({ slug }) => slug);
		const defaultLanguage = languageTranslations.find((lang) => lang.is_default)?.slug || "tr";
		const fallbackLanguage = languageTranslations.find((lang) => lang.is_fallback)?.slug || detectBrowserLanguage();
		const selectedLanguage = getSelectedLanguage()?.slug || defaultLanguage;

		setLanguages(formattedLanguages);

		saveSelectedLanguage(formattedLanguages, selectedLanguage);

		// i18n yapılandırması
		await i18next.use(initReactI18next).init({
			lng: selectedLanguage,
			fallbackLng: fallbackLanguage,
			supportedLngs: supportedLanguages,
			interpolation: { escapeValue: false },
			resources: languageTranslations.reduce((acc, { slug, translations }) => {
				acc[slug] = { translation: translations };
				return acc;
			}, {} as Resource),
		});

		// Dil değişimi dinleyicisi
		i18next.on("languageChanged", (lang) => {
			saveSelectedLanguage(formattedLanguages, lang);
			toaster({ type: "info", message: i18next.t("theme.messages.language_changed") });
		});
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
		const languageToSet = selectedLanguage === "auto" ? detectBrowserLanguage() : selectedLanguage;
		i18next.changeLanguage(languageToSet);
	} catch (error) {
		console.error("Dil değişimi sırasında bir hata oluştu:", error);
	}
};
