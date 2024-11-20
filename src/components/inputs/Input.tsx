import type { ISizeSchema } from "@/components/inputs/Toggle.tsx";
import type { IInput } from "@/interfaces/components/inputs/IInput.ts";
import classNames from "classnames";
import type { FC } from "react";

export const Input: FC<IInput> = ({
	type,
	defaultValue,
	onClick,
	isInvalid,
	onChange,
	onBlur,
	placeholder,
	id,
	value,
	name,
	customSize = "md",
	className,
	...props
}) => {
	const sizeSchema: ISizeSchema = {
		sm: "h-9",
		md: "h-10",
		lg: "h-11",
		xl: "h-12",
		"2xl": "h-14",
	};

	return (
		<input
			data-is-invalid={isInvalid}
			type={type}
			defaultValue={defaultValue}
			onClick={onClick}
			value={value}
			onChange={onChange}
			onBlur={onBlur}
			placeholder={placeholder}
			id={id}
			name={name}
			className={classNames(
				"rounded-lg shadow-sm bg-paper-level2 text-body1 px-3",
				"border-custom-divider border text-color-primary hover:border-primary-main focus:border-primary-main focus:outline-0",
				"data-[is-invalid='true']:border-error-main",
				className,
				sizeSchema[customSize],
			)}
			{...props}
		/>
	);
};
