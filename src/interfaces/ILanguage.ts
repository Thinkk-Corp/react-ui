export interface ILanguage {
	name: string;
	slug: string;
	flag: string;
	is_default: boolean;
	translations: Record<string, string>;
}
