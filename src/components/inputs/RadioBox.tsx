import type { IRadioBox } from "@/interfaces/components/inputs/IRadioBox.ts";
import type { ISize } from "@/interfaces/types/IMetrics.ts";
import classNames from "classnames";

export const RadioBox = ({ color = "primary-main", size = "md", className, ...props }: IRadioBox) => {
	const sizeSchema: Record<ISize, string> = {
		sm: "w-4 h-4",
		md: "w-5 h-5",
		lg: "w-6 h-6",
		xl: "w-8 h-8",
		"2xl": "w-10 h-10",
	};
	return (
		<input
			type="radio"
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
