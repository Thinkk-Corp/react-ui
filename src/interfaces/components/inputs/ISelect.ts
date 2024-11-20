import type { ISize } from "@/interfaces/types/IMetrics.ts";

export interface IOption {
	value: string;
	label: string;
}

export interface ISelect {
	id?: string;
	onBlur?: () => void;
	isInvalid?: boolean;
	onClick?: () => void;
	customSize?: ISize;
	options: IOption[];
	className?: string;
	defaultValue?: string;
	onChange?: (value: string) => void;
}
