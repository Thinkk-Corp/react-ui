import { Button } from "@/components/Button";
import { IconBox } from "@/components/IconBox";
import { Card } from "@/components/card/Card";
import { CardAction } from "@/components/card/CardAction";
import { CardBody } from "@/components/card/CardBody";
import { CardHeader } from "@/components/card/CardHeader";
import { FormControl } from "@/components/form/FormControl";
import { FormPicker } from "@/components/form/FormPicker.tsx";
import type { IFormButton, IFormCreator, IFormField } from "@/interfaces/components/form/IFormCreator.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, type DefaultValues, type FieldValues, type Path, useForm } from "react-hook-form";

export const FormCreator = <T extends FieldValues>({
	fields,
	onSubmit,
	validationSchema,
	icon,
	header,
	cardStyles,
	buttons,
	initialValues,
	className,
	size = "md",
}: IFormCreator<T>) => {
	"use no memo";

	const getInitialValue = ({
		key,
		parentKey,
	}: {
		key: keyof typeof fields;
		parentKey?: keyof typeof fields;
	}) => {
		if (parentKey && fields[parentKey] && "combined" in fields[parentKey]) {
			const parentField = fields[parentKey];
			if (parentField.children && key in parentField.children) {
				return parentField.children[key][typeof parentField.children[key].checked === "undefined" ? "initialValue" : "checked"];
			}
		}
		if (key in fields && "type" in fields[key]) {
			return fields[key][typeof fields[key].checked === "undefined" ? "initialValue" : "checked"];
		}
	};

	const getInitialValues = Object.entries(fields).reduce<DefaultValues<T>>(
		(acc, [key, field]) => {
			if ("combined" in field && field.combined && field.children) {
				for (const [childKey] of Object.entries(field.children)) {
					acc[childKey] = getInitialValue({ parentKey: key as keyof typeof fields, key: childKey });
				}
			} else {
				acc[key] = getInitialValue({ key: key as keyof typeof fields });
			}
			return acc;
		},
		{} as DefaultValues<T>,
	);

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<T>({
		defaultValues: initialValues ?? getInitialValues,
		resolver: zodResolver(validationSchema),
		reValidateMode: "onBlur",
		mode: "onBlur",
	});

	const handleButtonClick = (button: IFormButton) => {
		if (button.type === "reset") {
			reset();
		}
		button.action?.();
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} noValidate>
			<Card data-testid={"form-creator"} size={size} className={className} styleClass={cardStyles}>
				{(header || icon) && (
					<CardHeader data-testid={"form-header-section"} className="flex items-center gap-3">
						{icon && (
							<IconBox data-testid={"form-icon"} className={"shadow-2 p-2"} radius="full">
								{icon}
							</IconBox>
						)}
						{header && (
							<h4 data-testid={"form-header"} className="text-h4">
								{header}
							</h4>
						)}
					</CardHeader>
				)}

				<CardBody className="flex flex-col gap-5">
					{Object.entries(fields).map(([fieldKey, field]) => {
						// Handling combined fields with children
						if ("children" in field && field.combined && field.children) {
							return (
								<div key={fieldKey} data-testid={"combined-fields"} className="flex-col sm:flex-row flex items-start gap-5">
									{Object.entries(field.children).map(([childKey, childField]) => (
										<Controller
											key={childKey}
											control={control} // Ensure control is passed correctly
											name={childKey as Path<T>}
											disabled={childField.disabled}
											render={({ field: fieldControl }) => (
												<FormControl
													label={childField.label}
													isRequired={childField.required}
													error={errors[childKey]?.message}
													className={"w-full sm:w-1/2"}
												>
													<FormPicker
														data-testid={"form-input-picker"}
														isInvalid={!!errors[childKey]}
														control={fieldControl}
														field={childField as IFormField}
													/>
												</FormControl>
											)}
										/>
									))}
								</div>
							);
						}

						if ("type" in field) {
							return (
								<Controller
									key={fieldKey}
									name={fieldKey as Path<T>}
									control={control} // Ensure control is passed correctly
									disabled={field.disabled}
									render={({ field: fieldControl }) => (
										<FormControl
											data-testid="form-control"
											label={field.label}
											isRequired={field.required}
											error={errors[fieldKey]?.message}
										>
											<FormPicker
												data-testid={"form-input-picker"}
												isInvalid={!!errors[fieldKey]}
												control={fieldControl}
												field={field as IFormField}
											/>
										</FormControl>
									)}
								/>
							);
						}
					})}
				</CardBody>

				{buttons && Array.isArray(buttons) && buttons.length > 0 && (
					<CardAction>
						{buttons.map((button, index) => (
							<Button
								key={index.toString()}
								type={button.type}
								colorScheme={button.colorScheme}
								variant={button.variant}
								onClick={() => handleButtonClick(button)}
							>
								{button.text}
							</Button>
						))}
					</CardAction>
				)}
			</Card>
		</form>
	);
};
