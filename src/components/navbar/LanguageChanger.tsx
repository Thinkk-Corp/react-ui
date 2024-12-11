import { useLanguageStore } from "@/stores/LanguageStore.ts";
import { Dropdown } from "@/components/dropdown/main/Dropdown";
import { DropdownTrigger } from "@/components/dropdown/trigger/DropdownTrigger";
import { IconBox } from "../icon-box/IconBox";
import { DropdownItem } from "../dropdown/item/DropdownItem";
import type { ILanguageData } from "@/interfaces/stores/ILanguageStore";
import { handleLanguageChange } from "@/plugins/i18n/I18N";

export const LanguageChanger = () => {
	const selectedLanguage = useLanguageStore((state) => state.selectedLanguage);
	const languages = useLanguageStore((state) => state.languages);

	return (
		<Dropdown position="bottom-left">
			<DropdownTrigger>
				<LanguageItem language={selectedLanguage} />
			</DropdownTrigger>

			{languages?.map((lang, index) => (
				<DropdownItem isActivated={selectedLanguage?.slug === lang.slug} key={index.toString()}>
					<LanguageItem selectedLanguage={selectedLanguage} language={lang} />
				</DropdownItem>
			))}
		</Dropdown>
	);
};

const LanguageItem = ({
	selectedLanguage,
	language,
}: { selectedLanguage?: ILanguageData | null; language: ILanguageData | null }) => {
	const handleLanguageClick = (langSlug: string) => {
		handleLanguageChange(langSlug);
	};

	if (!language) return null;

	return (
		<div
			data-activated={language.slug === selectedLanguage?.slug}
			className={"flex items-center gap-3"}
			onKeyDown={() => {}}
			onClick={() => handleLanguageClick(language.slug)}
		>
			<IconBox>{typeof language.flag === "string" ? <img alt={language.name} src={language.flag} /> : language.flag}</IconBox>
			<p>{language.name}</p>
		</div>
	);
};
