import { useLanguageStore } from "@/stores/LanguageStore.ts";
import { useEffect } from "react";

export const LanguageChanger = () => {
	const selectedLanguage = useLanguageStore((state) => state.selectedLanguage);

	useEffect(() => {
		console.log(selectedLanguage);
	}, [selectedLanguage]);

	return <></>;
};
