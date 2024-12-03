import { Input } from "@/components/form/inputs/input/Input.tsx";
import { Select } from "@/components/form/inputs/select/Select.tsx";
import type { IDefaultFormField } from "@/interfaces/components/form/IFormCreator.ts";
import type { IInputPicker } from "@/interfaces/components/form/IInputPicker.ts";

export const InputPicker = ({ field, control, isInvalid }: IInputPicker) => {
	const typeField = field as IDefaultFormField;

	switch (typeField.type) {
		case "text":
		case "email":
			return (
				<Input
					isInvalid={isInvalid}
					type={typeField.type}
					required={typeField.required}
					readOnly={typeField.readonly}
					placeholder={typeField.placeholder}
					{...control}
				/>
			);
		case "select":
			return <Select isInvalid={isInvalid} {...typeField.selectSettings} {...control} />;
		default:
			return null;
	}
};
