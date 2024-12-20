import { Dropzone } from "@/components/form/Dropzone";
import { Checkbox } from "@/components/form/inputs/Checkbox";
import { Input } from "@/components/form/inputs/Input";
import { Radiobox } from "@/components/form/inputs/Radiobox";
import { Select } from "@/components/form/inputs/Select";
import { Textarea } from "@/components/form/inputs/Textarea";
import { Toggle } from "@/components/form/inputs/Toggle";
import type { IDefaultFormField } from "@/interfaces/components/form/IFormCreator.ts";
import type { IInputPicker } from "@/interfaces/components/form/IInputPicker.ts";

export const FormPicker = ({ field, control, isInvalid }: IInputPicker) => {
	const { dropzoneSettings, type, initialValue, ...restField } = field as IDefaultFormField;

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

			case "dropzone":
				return (
					<Dropzone
						onBlur={control.onBlur}
						onClick={control.onClick}
						initialFiles={initialValue as File[]}
						onFilesAccepted={(files: File[]) => control.onChange(files)}
						{...dropzoneSettings}
					/>
				);
			default:
				return null;
		}
	};

	return <>{renderInputByType()}</>;
};
