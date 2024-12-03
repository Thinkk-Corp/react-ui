import type { IFormField } from "@/interfaces/components/form/IFormCreator.ts";

export interface IInputPicker {
	field: IFormField;
	control: any;
	isInvalid: boolean;
}
