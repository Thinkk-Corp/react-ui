import { useLanguageStore } from "@/stores/LanguageStore.ts";
import { Dropdown } from "@/components/dropdown/main/Dropdown";
import { DropdownTrigger } from "@/components/dropdown/trigger/DropdownTrigger";
import { IconBox } from "@/components/icon-box/IconBox";
import { DropdownItem } from "@/components/dropdown/item/DropdownItem";
import { handleLanguageChange } from "@/plugins/i18n/I18N";
import type { IDropdownStyle } from "@/interfaces/components/dropdown/IDropdown";

/**
 * Dil değiştirme bileşeni.
 * Kullanıcıya mevcut dili gösterir ve dil seçimi yapabilmesi için bir liste sunar.
 *
 * @component
 */
export const LanguageChanger = () => {
	// Seçili dil verisini store'dan alır
	const selectedLanguage = useLanguageStore((state) => state.selectedLanguage);
	// Dil listesi verisini store'dan alır
	const languages = useLanguageStore((state) => state.languages);

	/**
	 * Dil seçildiğinde dil değişikliğini yönetir.
	 *
	 * @param {string} langSlug - Seçilen dilin slug'ı.
	 */
	const handleLanguageClick = (langSlug: string) => {
		handleLanguageChange(langSlug);
	};

	const dropdownStyleConfig: IDropdownStyle = {
		trigger: { defaultStyleActive: true, customStyle: "flex items-center gap-3" },
		item: { defaultStyleActive: true, customStyle: "flex items-center gap-3" },
	};

	if (!selectedLanguage) return null;

	return (
		<Dropdown styleClass={dropdownStyleConfig} position="bottom-left">
			<DropdownTrigger>
				<IconBox>
					{typeof selectedLanguage.flag === "string" ? (
						<img alt={selectedLanguage.name} src={selectedLanguage.flag} />
					) : (
						selectedLanguage.flag
					)}
				</IconBox>
				<p>{selectedLanguage.name}</p>
			</DropdownTrigger>

			{languages?.map((lang, index) => (
				<DropdownItem
					isActivated={lang.slug === selectedLanguage?.slug}
					key={index.toString()}
					data-activated={lang.slug === selectedLanguage?.slug}
					onClick={() => handleLanguageClick(lang.slug)}
				>
					<IconBox>{typeof lang.flag === "string" ? <img alt={lang.name} src={lang.flag} /> : lang.flag}</IconBox>
					<p>{lang.name}</p>
				</DropdownItem>
			))}
		</Dropdown>
	);
};
