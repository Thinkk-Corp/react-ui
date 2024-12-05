import type { IButton } from "@/interfaces/components/IButton.ts";
import type { IColorVariants, ISize } from "@/interfaces/types/IMetrics.ts";
import classNames from "classnames";

export const Button = ({
	size = "md",
	variant = "contained",
	colorScheme: colorSchemeProp = "primary",
	children,
	className,
	...props
}: IButton) => {
	// Buton boyutlandırma şeması
	const sizeScheme: Record<ISize, string> = {
		sm: "px-2 py-1 text-caption",
		md: "px-4 py-2 text-body2",
		lg: "px-6 py-3 text-body2",
		xl: "px-8 py-4 text-body1",
		"2xl": "px-10 py-6 text-subtitle1",
	};

	// Buton renk ve stil varyantları
	const colorScheme: Record<"contained" | "outlined" | "underlined", Record<IColorVariants, string>> = {
		contained: {
			primary: "bg-primary-main hover:bg-primary-dark text-white border border-primary-main hover:border-primary-hovered",
			secondary:
				"bg-secondary-main hover:bg-secondary-dark text-white border border-secondary-main hover:border-secondary-hovered",
			success: "bg-success-main hover:bg-success-dark text-white border border-success-main hover:border-success-hovered",
			warning: "bg-warning-main hover:bg-warning-dark text-white border border-warning-main hover:border-warning-hovered",
			error: "bg-error-main hover:bg-error-dark text-white border border-error-main hover:border-error-hovered",
			info: "bg-info-main hover:bg-info-dark text-white border border-info-main hover:border-info-hovered",
		},
		outlined: {
			primary: "bg-transparent hover:bg-primary-hovered border border-primary-main text-primary-main",
			secondary: "bg-transparent hover:bg-secondary-hovered border border-secondary-main text-secondary-main",
			success: "bg-transparent hover:bg-success-hovered border border-success-main text-success-main",
			warning: "bg-transparent hover:bg-warning-hovered border border-warning-main text-warning-main",
			error: "bg-transparent hover:bg-error-hovered border border-error-main text-error-main",
			info: "bg-transparent hover:bg-info-hovered border border-info-main text-info-main",
		},
		underlined: {
			primary: "bg-transparent hover:underline text-primary-main",
			secondary: "bg-transparent hover:underline text-secondary-main",
			success: "bg-transparent hover:underline text-success-main",
			warning: "bg-transparent hover:underline text-warning-main",
			error: "bg-transparent hover:underline text-error-main",
			info: "bg-transparent hover:underline text-info-main",
		},
	};

	return (
		<button
			data-testid={"button"}
			className={classNames(
				"rounded-md shadow-2",
				sizeScheme[size], // Boyutlandırma
				colorScheme[variant][colorSchemeProp], // Renk ve stil
				className, // Ekstra sınıflar
			)}
			{...props}
		>
			{children}
		</button>
	);
};
