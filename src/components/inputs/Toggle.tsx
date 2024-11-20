import { IconBox } from "@/components/IconBox.tsx";
import type { IRadioBox } from "@/interfaces/components/inputs/IRadioBox.ts";
import type { ISize } from "@/interfaces/types/IMetrics.ts";
import { icons } from "@/plugins/Icons.tsx";
import classNames from "classnames";
import { useState } from "react";

export type ISizeSchema = Record<ISize, string>;

/**
 * `Toggle` componenti, özelleştirilebilir bir anahtar (toggle) düğmesi sağlar.
 *
 * - Seçili durumda (checked) arka plan rengi ve ikon değişimi yapılabilir.
 * - Kullanıcı etkileşimleri için bir checkbox (input) elemanını temel alır.
 *
 * @param {IRadioBox} props - Toggle bileşeni için gereken tüm özellikler.
 * @param {string} [props.color="primary-main"] - Toggle seçili durumunda uygulanacak renk (Tailwind renk sınıfları ile uyumlu).
 * @param {ISize} [props.size="md"] - Toggle boyutu (`sm`, `md`, `lg`, `xl`, `2xl`).
 * @param {string} props.name - Toggle'un `name` özelliği (form grupları için).
 * @param {string} [props.className] - Ekstra Tailwind sınıfları eklemek için kullanılır.
 * @param {React.InputHTMLAttributes<HTMLInputElement>} props - HTML input elementine ait diğer özellikler.
 *
 * @returns {JSX.Element} Özelleştirilmiş bir toggle bileşeni.
 */
export const Toggle = ({ size = "md", color = "primary-main", name, className, ...props }: IRadioBox) => {
	const [isChecked, setIsChecked] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setIsChecked(e.target.checked);
		props.onChange?.(e);
	};

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

	const iconSizeSchema: ISizeSchema = {
		sm: "size-3",
		md: "size-4",
		lg: "size-5",
		xl: "size-6",
		"2xl": "size-7",
	};

	return (
		<label
			htmlFor={props.id}
			className={classNames(
				"relative inline-block cursor-pointer rounded-full bg-custom-divider transition [-webkit-tap-highlight-color:_transparent]",
				{ [`bg-${color}`]: isChecked },
				sizeSchema[size],
				className,
			)}
		>
			<input type="checkbox" checked={isChecked} onChange={handleChange} {...props} className="sr-only" />
			<span
				className={classNames(
					"absolute inset-y-0 z-10 m-1 inline-flex items-center justify-center rounded-full bg-white transition-transform",
					{ "translate-x-full": isChecked, "translate-x-0": !isChecked },
					iconBoxSizeSchema[size],
				)}
			>
				<IconBox className={iconSizeSchema[size]} color={"color-disabled"}>
					{icons.outline[isChecked ? "check" : "x"]}
				</IconBox>
			</span>
		</label>
	);
};
