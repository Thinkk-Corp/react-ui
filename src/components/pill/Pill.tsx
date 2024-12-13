import type { IPill } from "@/interfaces/components/IPill";
import classNames from "classnames";
import type { ISizeSchema } from "@/components/form/inputs/toggle/Toggle";

export const Pill = ({ colorScheme = "primary", size = "md", className = "", children, ...props }: IPill) => {
	const sizeSchema: ISizeSchema = {
		sm: "py-0.5 px-2 text-caption",
		md: "py-1 px-3 text-body2",
		lg: "py-1.5 px-4 text-body2",
		xl: "py-2 px-5 text-subtitle2",
		"2xl": "py-3 px-6 text-h5",
	};

	return (
		<span
			data-testid="pill"
			className={classNames(`bg-${colorScheme}-light rounded border border-${colorScheme}-dark`, sizeSchema[size], className)}
			{...props}
		>
			{children}
		</span>
	);
};
