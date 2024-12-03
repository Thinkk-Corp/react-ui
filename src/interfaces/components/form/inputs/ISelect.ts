import type { ISize } from "@/interfaces/types/IMetrics.ts";

export interface IOption {
	value: string;
	label: string;
}

export interface ISelect {
	id?: string;
	options?: IOption[];
	onBlur?: () => void;
	value?: string;
	isInvalid?: boolean;
	onClick?: () => void;
	customSize?: ISize;
	endpoint?: string;
	className?: string;
	defaultValue?: string;
	isSearchable?: boolean;
	onChange?: (value: string) => void;
}
