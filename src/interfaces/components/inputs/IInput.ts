import type { InputHTMLAttributes } from "react";

export interface IInput extends InputHTMLAttributes<HTMLInputElement> {
	isInvalid?: boolean;
}
