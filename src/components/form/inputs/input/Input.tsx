import type { ISizeSchema } from "@/components/form/inputs/toggle/Toggle.tsx";
import type { IInput } from "@/interfaces/components/inputs/IInput.ts";
import classNames from "classnames";
import type { FC } from "react";

// Input componenti tanımlanır.
// Kullanıcıdan gelen çeşitli özellikleri destekler ve bu özelliklere göre farklı stiller uygular.
export const Input: FC<IInput> = ({
	type,
	defaultValue,
	onClick,
	isInvalid = false,
	onChange,
	onBlur,
	placeholder,
	id,
	value,
	name,
	icon,
	customSize = "md", // Varsayılan boyut "md" olarak ayarlanmıştır.
	className,
	...props
}) => {
	// Farklı boyutlar için CSS sınıflarını tanımlayan bir schema.
	const sizeSchema: ISizeSchema = {
		sm: "h-9", // Küçük boyut
		md: "h-10", // Orta boyut (varsayılan)
		lg: "h-11", // Büyük boyut
		xl: "h-12", // Ekstra büyük boyut
		"2xl": "h-14", // İki kat ekstra büyük boyut
	};

	return (
		// Ana sarmalayıcı (wrapper) element.
		// Girdi alanını ve opsiyonel ikonu içerir.
		<div
			data-testid={"input-wrapper"} // Testlerde kullanılmak üzere `data-testid` özelliği eklendi.
			data-invalid={isInvalid} // Hata durumunu belirtmek için `data-invalid` özelliği kullanılır.
			className={classNames(
				"relative rounded-lg shadow-sm bg-paper-level2 pr-6", // Temel stiller
				sizeSchema[customSize], // Boyut şeması bazlı sınıflar
				className, // Kullanıcı tarafından sağlanan ek sınıflar
				"border-custom-divider border text-color-primary", // Kenarlık ve metin renk stilleri
				"data-[invalid='true']:border-error-dark", // Hata durumunda kenarlık rengi
				"data-[invalid='false']:hover:border-primary-main", // Hata durumu yokken hover stili
				"data-[invalid='false']:focus-within:border-primary-main", // Fokus stili
			)}
		>
			{/* Girdi alanı (input) */}
			<input
				data-testid={"input"} // Testlerde kullanılmak üzere `data-testid` özelliği eklendi.
				type={type} // Girdi türü (örneğin: text, password)
				defaultValue={defaultValue} // Varsayılan değer
				onClick={onClick} // Tıklama olayını yakalar
				value={value} // Kontrollü değer
				onChange={onChange} // Değer değişikliği olayını yakalar
				onBlur={onBlur} // Fokus dışına çıkıldığında çalışır
				placeholder={placeholder} // Yer tutucu metin
				id={id} // Benzersiz kimlik
				name={name} // Form alanı ismi
				className={classNames(
					"appearance-none text-body1 px-3 border-none shadow-none bg-transparent focus:outline-0 w-full h-full", // Input özel stilleri
				)}
				{...props} // Ekstra özellikler (örneğin, `aria-*` veya `data-*`)
			/>
			{/* Opsiyonel ikon alanı */}
			<div data-testid={"input-icon"} className={"absolute top-1/2 -translate-y-1/2 right-3"}>
				{icon}
			</div>
		</div>
	);
};
