import type { ISizeSchema } from "@/components/form/inputs/Toggle";
import type { ITab } from "@/interfaces/components/ITab";
import { keyboardUtil } from "@/utils/KeyboardUtil";
import classNames from "classnames";
import { useEffect, useState } from "react";

/**
 * Tab bileşeni, sekmeler arası geçiş yapılmasını sağlar.
 *
 * @param {ITab} props - Bileşenin aldığı prop'lar.
 * @param {Array} props.tabs - Sekme verileri (label ve value içerir).
 * @param {string} [props.size="md"] - Sekmelerin boyutu. Varsayılan "md" boyutudur.
 * @param {string} [props.className=""] - Ekstra stil sınıfları.
 * @param {string} props.selectedTab - Başlangıçta seçili olan sekme.
 * @param {Function} props.onChange - Sekme değiştiğinde çağrılacak geri çağırma fonksiyonu.
 *
 * @returns {JSX.Element} - Tab bileşeni.
 */
export const Tab = ({ direction = "horizontal", tabs, size = "md", className = "", selectedTab, onChange }: ITab) => {
	// İçsel seçili sekme durumu için state
	const [internalSelectedTab, setInternalSelectedTab] = useState<string>(selectedTab);

	// Boyutlara göre stil sınıflarını tutan şema
	const sizeSchema: ISizeSchema = {
		sm: "py-1 px-2 text-caption",
		md: "py-2 px-4 text-body2",
		lg: "py-3 px-6 text-body2",
		xl: "py-4 px-8 text-body1",
		"2xl": "py-5 px-10 text-body1",
	};

	// Seçili sekme değiştiğinde içsel durumu güncelleyen efekt
	useEffect(() => {
		if (selectedTab !== internalSelectedTab) {
			setInternalSelectedTab(selectedTab);
		}
	}, [selectedTab]);

	/**
	 * Sekmeye tıklanıldığında, seçili sekmeyi günceller ve onChange fonksiyonunu çağırır.
	 *
	 * @param {string} selectedTab - Seçilen sekmenin değeri.
	 */
	const handleTabClick = (selectedTab: string) => {
		setInternalSelectedTab(selectedTab);
		onChange?.(selectedTab); // Eğer onChange varsa, tetikler.
	};

	/**
	 * Verilen sekme değerine göre sekmenin aktif olup olmadığını kontrol eder.
	 *
	 * @param {string} tabValue - Kontrol edilecek sekme değeri.
	 * @returns {boolean} - Sekme aktif mi?
	 */
	const isTabActive = (tabValue: string) => {
		return internalSelectedTab === tabValue;
	};

	/**
	 * Klavye ok tuşları ile sekmeler arası geçişi sağlar.
	 *
	 * @param {"ArrowLeft" | "ArrowRight"} key - Basılan tuşun yönü (sol veya sağ ok).
	 */
	const handleKeyDown = (key: "ArrowLeft" | "ArrowRight") => {
		// Mevcut sekmenin index'ini bulur
		const getTabIndex = tabs.findIndex((tab) => tab.value === internalSelectedTab);

		// Sol ok tuşuna basıldığında, bir önceki sekmeye geçer
		if (key === "ArrowLeft" && getTabIndex > 0) {
			setInternalSelectedTab(tabs[getTabIndex - 1].value);
		}
		// Sağ ok tuşuna basıldığında, bir sonraki sekmeye geçer
		if (key === "ArrowRight" && getTabIndex < tabs.length - 1) {
			setInternalSelectedTab(tabs[getTabIndex + 1].value);
		}
	};

	return (
		<nav
			className={classNames(
				"flex pb-1 overflow-y-hidden overflow-x-auto",
				{ "flex-col gap-3 w-max": direction === "vertical", "gap-6": direction === "horizontal" },
				className,
			)}
			aria-label="Tabs"
			data-testid="tab"
		>
			{/* Sekme butonlarını render et */}
			{tabs?.map((tab, index) => (
				<button
					type="button"
					key={index.toString()}
					onKeyDown={(e) => {
						// Ok tuşlarına basıldığında geçiş sağlanacak fonksiyonlar
						keyboardUtil({ e, key: "ArrowLeft", callback: () => handleKeyDown("ArrowLeft") });
						keyboardUtil({ e, key: "ArrowRight", callback: () => handleKeyDown("ArrowRight") });
					}}
					data-testid="tab-item"
					data-activated={isTabActive(tab.value)} // Aktif sekme için data-attribute
					onClick={() => handleTabClick(tab.value)} // Sekme tıklama işlemi
					className={classNames(
						"shrink-0 rounded-lg bg-transparent opacity-80 text-color-primary cursor-pointer",
						"data-[activated='true']:text-white", // Aktif sekme için beyaz renk
						"data-[activated='true']:bg-primary-main", // Aktif sekme için arka plan rengi
						"data-[activated='false']:hover:bg-action-hover", // Pasif sekme için hover rengi
						"data-[activated='false']:hover:opacity-100", // Pasif sekme için hover opaklık
						"data-[activated='true']:opacity-100", // Aktif sekme için opaklık
						sizeSchema[size], // Boyut için stil
					)}
				>
					{tab.label} {/* Sekme etiketi */}
				</button>
			))}
		</nav>
	);
};
