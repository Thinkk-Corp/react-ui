import type { ISize } from "@/interfaces/IMetrics.ts";
import type { IIconBox } from "@/interfaces/components/IIconBox.ts";
import classNames from "classnames";

// IconBox bileşeni
export const IconBox = ({
	isHoverable = false,
	size = "md",
	color = "text-color-primary",
	className,
	children,
	...props
}: IIconBox) => {
	// Tailwind CSS genişlik ve yükseklik değerleri için boyut haritası
	const sizeMap: Record<ISize, string> = {
		sm: "w-4 h-4", // Küçük boyut
		md: "w-7 h-7", // Orta boyut
		lg: "w-10 h-10", // Büyük boyut
		xl: "w-12 h-12", // Ekstra büyük boyut
		"2xl": "w-14 h-14", // İki kat ekstra büyük boyut
	};

	// Geçersiz `size` değeri varsa varsayılan olarak "md" boyutunu kullan
	const iconSize = sizeMap[size] || sizeMap.md;

	return (
		<div
			className={classNames(
				"flex items-center justify-center rounded-lg w-max h-max cursor-pointer ", // Temel stil sınıfları
				{
					"transition-transform transform hover:bg-action-hover p-2": isHoverable, // Hover efekti
				},
				color,
				className, // Ek kullanıcı sınıfları
			)}
			{...props}
		>
			{/* İkon buraya yerleştirilebilir */}
			<span className={iconSize}>{children}</span>
		</div>
	);
};
