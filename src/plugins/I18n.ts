import type { ILanguage } from "@/interfaces/ILanguage.ts";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const initI18n = async (languageTranslations: ILanguage[], defaultLang: string) => {
	const supportedLanguages = languageTranslations.map(({ slug }) => slug);

	await i18n.use(initReactI18next).init({
		lng: defaultLang,
		fallbackLng: "en",
		supportedLngs: supportedLanguages,
		interpolation: {
			escapeValue: false,
		},
	});

	for (const { slug, translations } of languageTranslations) {
		i18n.addResources(slug, "translation", translations);
	}
};

export const getI18nInstance = (): typeof i18n => i18n;
