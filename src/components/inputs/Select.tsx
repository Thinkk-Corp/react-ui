import { IconBox } from "@/components/IconBox.tsx";
import type { ISelect } from "@/interfaces/components/inputs/ISelect.ts";
import { icons } from "@/plugins/Icons.tsx";
import classNames from "classnames";
import { useState } from "react";

export const Select = ({ options, className, isInvalid = false, id, defaultValue, onChange, onClick, onBlur }: ISelect) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedValue, setSelectedValue] = useState<string>("");

	const handleSelect = (value: string) => {
		setSelectedValue(value);
		onChange?.(value);
		setIsOpen(false);
	};

	const handleClick = () => {
		onClick?.();
		setIsOpen(!isOpen);
	};

	const findDefaultOption = () => options.find((option) => option.value === defaultValue)?.label;

	return (
		<div
			onKeyDown={() => {}}
			onBlur={onBlur}
			onClick={handleClick}
			data-toggle={isOpen}
			className={classNames("relative group inline-block", className)}
		>
			<div
				id={id}
				data-invalid={isInvalid}
				className={classNames(
					"w-full h-10 flex hover:primary items-center justify-between px-3 rounded-lg cursor-pointer",
					"bg-paper-level2 border border-custom-divider",
					"data-[invalid='true']:border-error-main",
					"data-[invalid='false']:group-data-[toggle='true']:border-primary-main",
					"hover:data-[invalid='false']:border-primary-main",
				)}
			>
				<span className="text-body2 text-color-primary">{selectedValue === "" ? findDefaultOption() : selectedValue}</span>
				<IconBox color={"color-primary"} size={"sm"}>
					{icons.outline[isOpen ? "chevron_up" : "chevron_down"]}
				</IconBox>
			</div>
			<ul
				className={classNames(
					"absolute overflow-hidden z-10 w-full mt-1 rounded-lg shadow-md border divide-y",
					"bg-paper-level2 divide-custom-divider border-custom-divider",
					"group-data-[toggle='false']:hidden",
				)}
			>
				{options.map((option, index) => (
					<li
						data-active={selectedValue === option.value}
						onKeyDown={() => {}}
						key={index.toString()}
						className={classNames(
							"px-3 py-2 text-body2 cursor-pointer",
							"data-[active='false']:hover:bg-action-hover data-[active='false']:text-color-primary",
							"data-[active='true']:bg-primary-main data-[active='true']:text-white",
						)}
						onClick={() => handleSelect(option.value)}
					>
						{option.label}
					</li>
				))}
			</ul>
		</div>
	);
};
