import type { IRadioBox } from "@/interfaces/components/form/inputs/IRadioBox.ts";
import type { ISize } from "@/interfaces/types/IMetrics.ts";
import { icons } from "@/plugins/Icons.tsx";
import classNames from "classnames";
import { useState } from "react";

export const Checkbox = ({
	color = "primary-main",
	checked,
	name,
	isInvalid = false,
	size = "md",
	id,
	className,
	...props
}: IRadioBox) => {
	const [isChecked, setIsChecked] = useState(checked);

	const sizeSchema: Record<ISize, string> = {
		sm: "w-4 h-4",
		md: "w-5 h-5",
		lg: "w-6 h-6",
		xl: "w-8 h-8",
		"2xl": "w-10 h-10",
	};

	const iconSizeScheme: Record<ISize, string> = {
		sm: "w-3 h-3",
		md: "w-4 h-4",
		lg: "w-5 h-5",
		xl: "w-7 h-7",
		"2xl": "w-9 h-9",
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setIsChecked(e.target.checked);
		props.onChange?.(e);
	};

	return (
		<label
			data-testid={"checkbox-label"}
			data-invalid={isInvalid}
			htmlFor={id}
			className={classNames(
				"relative inline-block border rounded",
				{
					[`bg-${color}`]: isChecked,
					"data-[invalid='false']:border-custom-divider": !isChecked,
				},
				"data-[invalid='true']:border-error-dark",
				sizeSchema[size],
				className,
			)}
		>
			<input
				id={id}
				data-testid={"checkbox-input"}
				type="checkbox"
				name={name}
				{...props}
				checked={isChecked}
				onChange={handleChange}
				className={classNames("appearance-none sr-only absolute inset-0")}
			/>
			{isChecked && (
				<div
					data-testid={"checkbox-check"}
					className={classNames("absolute inset-0 flex justify-center items-center transition-all ")}
				>
					<div data-testid={"check-icon"} className={classNames("text-white", iconSizeScheme[size])}>
						{icons.outline.check}
					</div>
				</div>
			)}
		</label>
	);
};
