import type { ILanguage } from "@/interfaces/ILanguage.ts";
import i18next from "i18next";
import languageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

/**
 * i18n çeviri yapılandırmasını başlatan fonksiyon.
 *
 * @param {ILanguage[]} languageTranslations - Desteklenen diller ve çeviri verilerini içeren dizi.
 */
export const initI18n = async (languageTranslations: ILanguage[]) => {
	// Desteklenen dilleri slug alanına göre belirler
	const supportedLanguages = languageTranslations.map(({ slug }) => slug);

	const defaultLang = languageTranslations.find((lang) => lang.is_default)?.slug || "en";

	const fallbackLang = languageTranslations.find((lang) => lang.is_fallback)?.slug || "en";

	// i18n ayarlarını başlatır
	await i18next
		.use(initReactI18next)
		.use(languageDetector)
		.init({
			lng: defaultLang,
			fallbackLng: fallbackLang,
			supportedLngs: supportedLanguages,
			detection: {
				order: ["querystring", "cookie", "localStorage", "navigator"],
				caches: ["cookie", "localStorage"],
			},
			interpolation: {
				escapeValue: false, // React ile uyumlu çeviri sağlamak için escape işlemi kapalıdır
			},
		});

	// Çeviri kaynaklarını i18n yapısına ekler
	for (const { slug, translations } of languageTranslations) {
		i18next.addResources(slug, "translation", translations);
	}
};

// Dil değişimi için fonksiyon
export const handleLanguageChange = (selectedLanguage: string) => {
	if (selectedLanguage === "auto") {
		const detectedLanguage = i18next.language;
		i18next.changeLanguage(detectedLanguage);
		return;
	}
	i18next.changeLanguage(selectedLanguage);
};
