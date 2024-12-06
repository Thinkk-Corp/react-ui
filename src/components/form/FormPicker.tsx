import { Checkbox } from "@/components/form/inputs/checkbox/Checkbox.tsx";
import { Input } from "@/components/form/inputs/input/Input.tsx";
import { Radiobox } from "@/components/form/inputs/radiobox/Radiobox.tsx";
import { Select } from "@/components/form/inputs/select/Select.tsx";
import { Textarea } from "@/components/form/inputs/textarea/Textarea.tsx";
import { Toggle } from "@/components/form/inputs/toggle/Toggle.tsx";
import type { IDefaultFormField } from "@/interfaces/components/form/IFormCreator.ts";
import type { IInputPicker } from "@/interfaces/components/form/IInputPicker.ts";

export const FormPicker = ({ field, control, isInvalid }: IInputPicker) => {
	const { type, initialValue, ...restField } = field as IDefaultFormField;

	const renderInputByType = () => {
		switch (type) {
			case "text":
			case "password":
			case "email":
				return <Input type={type} isInvalid={isInvalid} value={initialValue} {...restField} {...control} />;

			case "select":
				return <Select isInvalid={isInvalid} value={initialValue} {...restField.selectSettings} {...control} />;

			case "checkbox":
				return <Checkbox isInvalid={isInvalid} {...restField} {...control} />;

			case "radiobox":
				return <Radiobox {...restField} {...control} />;

			case "toggle":
				return <Toggle {...restField} {...control} />;

			case "textarea":
				return <Textarea value={initialValue} {...restField} {...control} />;
			default:
				return null;
		}
	};

	return <>{renderInputByType()}</>;
};
