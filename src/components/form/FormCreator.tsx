import { Button } from "@/components/button/Button.tsx";
import { Card } from "@/components/card/Card.tsx";
import { CardAction } from "@/components/card/CardAction.tsx";
import { CardBody } from "@/components/card/CardBody.tsx";
import { CardHeader } from "@/components/card/CardHeader.tsx";
import { FormControl } from "@/components/form/FormControl.tsx";
import { InputPicker } from "@/components/form/InputPicker.tsx";
import { IconBox } from "@/components/iconbox/IconBox.tsx";
import type { IFormButton, IFormCreator, IFormField } from "@/interfaces/components/form/IFormCreator.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, type DefaultValues, type FieldValues, type Path, useForm } from "react-hook-form";

export const FormCreator = <T extends FieldValues>({
	fields,
	onSubmit,
	validationSchema,
	icon,
	header,
	cardStyles,
	buttons,
	defaultValues,
	className,
	size = "md",
}: IFormCreator<T>) => {
	"use no memo";

	const getDefaultValue = ({
		key,
		parentKey,
	}: {
		key: keyof typeof fields;
		parentKey?: keyof typeof fields;
	}) => {
		if (parentKey && fields[parentKey] && "combined" in fields[parentKey]) {
			const parentField = fields[parentKey];
			if (parentField.children && key in parentField.children) {
				return parentField.children[key].defaultValue;
			}
		}
		if (key in fields && "type" in fields[key]) {
			return fields[key].defaultValue;
		}
	};

	const getDefaultValues = Object.entries(fields).reduce<DefaultValues<T>>(
		(acc, [key, field]) => {
			if ("combined" in field && field.combined && field.children) {
				for (const [childKey] of Object.entries(field.children)) {
					acc[childKey] = getDefaultValue({ parentKey: key as keyof typeof fields, key: childKey });
				}
			} else {
				acc[key] = getDefaultValue({ key: key as keyof typeof fields });
			}
			return acc;
		},
		{} as DefaultValues<T>,
	);

	const {
		control,
		handleSubmit,
		reset,
		watch,
		formState: { errors },
	} = useForm<T>({
		defaultValues: defaultValues ?? getDefaultValues,
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

	const watchh = watch();

	useEffect(() => {
		console.log(watchh);
	}, [watchh]);

	return (
		<form onSubmit={handleSubmit(onSubmit)} noValidate>
			<Card size={size} className={className} styles={cardStyles}>
				{(header || icon) && (
					<CardHeader className="flex items-center gap-3">
						{icon && (
							<IconBox className={"shadow-2 p-2"} radius="full">
								{icon}
							</IconBox>
						)}
						{header && <h4 className="text-h4">{header}</h4>}
					</CardHeader>
				)}

				<CardBody className="flex flex-col gap-5">
					{Object.entries(fields).map(([fieldKey, field]) => {
						// Handling combined fields with children
						if ("children" in field && field.combined && field.children) {
							return (
								<div key={fieldKey} className="flex-col sm:flex-row flex items-start gap-5">
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
													<InputPicker isInvalid={!!errors[childKey]} control={fieldControl} field={childField as IFormField} />
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
										<FormControl label={field.label} isRequired={field.required} error={errors[fieldKey]?.message}>
											<InputPicker isInvalid={!!errors[fieldKey]} control={fieldControl} field={field as IFormField} />
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
