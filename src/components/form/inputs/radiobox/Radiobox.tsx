import type { IRadioBox } from "@/interfaces/components/form/inputs/IRadioBox.ts";
import type { ISize } from "@/interfaces/types/IMetrics.ts";
import classNames from "classnames";

/**
 * `Radiobox` componenti, özelleştirilebilir bir radyo düğmesi sağlar.
 * - `appearance-none` sınıfı kullanılarak tarayıcı varsayılan stilleri kaldırılır.
 * - Seçili durumda (checked) arka plan rengi ve gölge efekti özelleştirilebilir.
 *
 * @param {IRadioBox} props - Radiobox bileşeni için gereken tüm özellikler.
 * @param {string} [props.color="primary-main"] - Radiobox seçili durumunda uygulanacak renk (Tailwind renk sınıfları ile uyumlu).
 * @param checked
 * @param {string} props.name - Radiobox'un `name` özelliği (aynı gruptaki radioboxlar için aynı olmalıdır).
 * @param readOnly
 * @param onChange
 * @param {ISize} [props.size="md"] - Radiobox boyutu (`sm`, `md`, `lg`, `xl`, `2xl`).
 * @param {string} [props.className] - Ekstra Tailwind sınıfları eklemek için kullanılır.
 * @param {React.InputHTMLAttributes<HTMLInputElement>} props - HTML input elementine ait diğer özellikler.
 *
 * @returns {JSX.Element} Özelleştirilmiş bir radiobox bileşeni.
 */

export const Radiobox = ({
	color = "primary-main",
	checked = false,
	name,
	readOnly,
	onChange,
	size = "md",
	className,
	...props
}: IRadioBox): JSX.Element => {
	const sizeSchema: Record<ISize, string> = {
		sm: "w-4 h-4",
		md: "w-5 h-5",
		lg: "w-6 h-6",
		xl: "w-8 h-8",
		"2xl": "w-10 h-10",
	};
	return (
		<input
			data-testid={"radiobox"}
			type="radio"
			name={name}
			checked={checked}
			readOnly={readOnly}
			onChange={onChange}
			{...props}
			className={classNames(
				"appearance-none border rounded-full border-custom-divider",
				"checked:border-transparent checked:bg-current",
				`text-${color}`,
				sizeSchema[size],
				className,
				"checked:shadow-[inset_0_0_0_3px_white]", // İçeride bir çerçeve bırakır
			)}
		/>
	);
};
