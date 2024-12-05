import type { IRadioBox } from "@/interfaces/components/form/inputs/IRadioBox.ts";
import type { ISize } from "@/interfaces/types/IMetrics.ts";
import classNames from "classnames";
import { useEffect, useState } from "react";

export type ISizeSchema = Record<ISize, string>;

/**
 * `Toggle` componenti, özelleştirilebilir bir anahtar (toggle) düğmesi sağlar.
 *
 * - Seçili durumda (checked) arka plan rengi ve ikon değişimi yapılabilir.
 * - Kullanıcı etkileşimleri için bir checkbox (input) elemanını temel alır.
 *
 * @param {IRadioBox} props - Toggle bileşeni için gereken tüm özellikler.
 * @param checked
 * @param {string} [props.color="primary-main"] - Toggle seçili durumunda uygulanacak renk (Tailwind renk sınıfları ile uyumlu).
 * @param {ISize} [props.size="md"] - Toggle boyutu (`sm`, `md`, `lg`, `xl`, `2xl`).
 * @param isInvalid
 * @param value
 * @param {string} props.name - Toggle'un `name` özelliği (form grupları için).
 * @param {string} [props.className] - Ekstra Tailwind sınıfları eklemek için kullanılır.
 * @param {React.InputHTMLAttributes<HTMLInputElement>} props - HTML input elementine ait diğer özellikler.
 *
 * @returns {JSX.Element} Özelleştirilmiş bir toggle bileşeni.
 */
export const Toggle = ({
	size = "sm",
	checked,
	isInvalid,
	value,
	color = "primary-main",
	name,
	className,
	...props
}: IRadioBox): JSX.Element => {
	const [isChecked, setIsChecked] = useState(checked);

	const sizeSchema: ISizeSchema = {
		sm: "h-6 w-10",
		md: "h-8 w-14",
		lg: "h-10 w-[4.5rem]",
		xl: "h-12 w-[5.5rem]",
		"2xl": "h-14 w-24",
	};

	const iconBoxSizeSchema: ISizeSchema = {
		sm: "h-4 w-4",
		md: "h-6 w-6",
		lg: "h-8 w-8",
		xl: "h-10 w-10",
		"2xl": "h-12 w-12",
	};

	useEffect(() => {
		if (typeof value === "undefined" || value === null) return;
		setIsChecked(value);
	}, [value]);

	useEffect(() => {
		setIsChecked(checked);
	}, [checked]);

	return (
		<label
			data-testid={"toggle-label"}
			htmlFor={props.id}
			className={classNames(
				"relative inline-block cursor-pointer rounded-full bg-custom-divider transition [-webkit-tap-highlight-color:_transparent]",
				{ [`bg-${color}`]: isChecked && !isInvalid, "bg-error-dark": isInvalid }, // `checked` durumu burada doğru şekilde kontrol edilmelidir
				sizeSchema[size],
				className,
			)}
		>
			<input data-testid={"toggle-input"} checked={isChecked} type="checkbox" {...props} className="sr-only" />
			<span
				data-testid={"toggle-icon-box"}
				className={classNames(
					"absolute inset-y-0 z-10 m-1 inline-flex items-center justify-center rounded-full bg-white transition-transform",
					iconBoxSizeSchema[size],
					{ "translate-x-full": isChecked, "translate-x-0": !isChecked },
				)}
			/>
		</label>
	);
};
