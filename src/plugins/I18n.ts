import type { ILanguage } from "@/interfaces/ILanguage.ts";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

/**
 * i18n çeviri yapılandırmasını başlatan fonksiyon.
 *
 * @param {ILanguage[]} languageTranslations - Desteklenen diller ve çeviri verilerini içeren dizi.
 * @param {string} defaultLang - Varsayılan dil kodu.
 */
export const initI18n = async (languageTranslations: ILanguage[], defaultLang: string) => {
	// Desteklenen dilleri slug alanına göre belirler
	const supportedLanguages = languageTranslations.map(({ slug }) => slug);

	// i18n ayarlarını başlatır
	await i18n.use(initReactI18next).init({
		lng: defaultLang,
		fallbackLng: "tr",
		supportedLngs: supportedLanguages,
		interpolation: {
			escapeValue: false, // React ile uyumlu çeviri sağlamak için escape işlemi kapalıdır
		},
	});

	// Çeviri kaynaklarını i18n yapısına ekler
	for (const { slug, translations } of languageTranslations) {
		i18n.addResources(slug, "translation", translations);
	}
};

/**
 * i18n örneğini döndürür.
 * @returns {typeof i18n} i18n örneği.
 */
export const getI18nInstance = (): typeof i18n => i18n;
