import { getOptionsAction } from "@/actions/server/GetOptionsAction.ts";
import { IconBox } from "@/components/iconbox/IconBox.tsx";
import { Input } from "@/components/inputs/input/Input.tsx";
import type { IOption, ISelect } from "@/interfaces/components/inputs/ISelect.ts";
import { icons } from "@/plugins/Icons.tsx";
import classNames from "classnames";
import type React from "react";
import { useCallback } from "react";
import { useEffect, useState } from "react";

export const Select = ({
	options: optionsProp,
	endpoint,
	className,
	isInvalid = false,
	id,
	defaultValue,
	onChange,
	onClick,
	onBlur,
	isSearchable = false,
}: ISelect) => {
	const [isOpen, setIsOpen] = useState(false);
	const [options, setOptions] = useState<IOption[]>([{ value: "", label: "Seçiniz" }]);
	const [selectedValue, setSelectedValue] = useState<string>("");
	const [isSearched, setIsSearched] = useState<boolean>(false);
	const [searchValue, setSearchValue] = useState<string>("");
	const [filteredOptions, setFilteredOptions] = useState<IOption[]>([]);

	// Helper function to find label by value
	const findLabelByValue = useCallback(
		(value: string) => {
			const option = options.find((option) => option.value === value);
			return option ? option.label : "";
		},
		[options],
	);

	const handleSelect = (value: string) => {
		setSelectedValue(value);
		setSearchValue(findLabelByValue(value)); // Update label on selection
		onChange?.(value);
		setIsOpen(false);
	};

	const handleClick = () => {
		onClick?.();
		setIsOpen((prev) => !prev);
	};

	const handleBlur = () => {
		setSearchValue(findLabelByValue(selectedValue));
		setIsSearched(false);
		setTimeout(() => setIsOpen(false), 100);
		onBlur?.();
	};

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSearchValue(value);
		setIsSearched(true);
		if (isOpen) return;
		setIsOpen(true);
	};

	// Load options from endpoint if not passed via props
	useEffect(() => {
		if (optionsProp && optionsProp.length > 0) {
			setOptions((prev) => [...prev, ...optionsProp]);
		} else if (endpoint) {
			const fetchOptions = async () => {
				const optionsData = await getOptionsAction(endpoint);
				if (optionsData) setOptions((prev) => [...prev, ...optionsData]);
			};
			fetchOptions();
		}
	}, [endpoint, optionsProp]);

	// Update the selected value if the defaultValue changes
	useEffect(() => {
		if (options.length === 0 || defaultValue === selectedValue || !defaultValue) return;
		setSelectedValue(defaultValue);
		if (!isSearchable) return;
		setSearchValue(findLabelByValue(defaultValue));
	}, [options, defaultValue]);

	// Apply filtering when searchValue or options change
	useEffect(() => {
		if (!searchValue || !isSearched) {
			setFilteredOptions(options); // Show all options when search is empty
		} else {
			const filtered = options.filter((option) => option.label.toLowerCase().includes(searchValue.toLowerCase()));
			setFilteredOptions(filtered);
		}
	}, [options, searchValue, isSearched]);

	if (options.length === 0) return null;

	return (
		<span
			data-toggle={isOpen}
			data-testid={"select-container"}
			className={classNames("relative min-w-48 inline-block group", className)}
		>
			{!isSearchable ? (
				<span
					data-testid={"select-input"}
					onKeyDown={() => {}}
					onBlur={handleBlur}
					onClick={handleClick}
					id={id}
					data-invalid={isInvalid}
					className={classNames(
						"h-10 w-full flex gap-4 hover:primary items-center justify-between px-3 rounded-lg cursor-pointer",
						"bg-paper-level2 border border-custom-divider",
						"data-[invalid='true']:border-error-main",
						"data-[invalid='false']:group-data-[toggle='true']:border-primary-main",
						"hover:data-[invalid='false']:border-primary-main",
					)}
				>
					<span className="text-body1 text-color-primary">{findLabelByValue(searchValue)}</span>
					<IconBox color={"color-primary"} size={"sm"}>
						{icons.outline[isOpen ? "chevron_up" : "chevron_down"]}
					</IconBox>
				</span>
			) : (
				<Input
					data-testid={"select-input"}
					icon={
						<IconBox color={"color-primary"} size={"sm"}>
							{icons.outline[isOpen ? "chevron_up" : "chevron_down"]}
						</IconBox>
					}
					onBlur={handleBlur}
					onClick={handleClick}
					isInvalid={isInvalid}
					value={searchValue}
					className={"w-full"}
					onChange={handleSearchChange}
				/>
			)}

			<ul
				data-testid={"select-menu"}
				className={classNames(
					"absolute overflow-hidden w-full mt-1 rounded-lg shadow-md border divide-y",
					"bg-paper-level2 divide-custom-divider border-custom-divider",
					"group-data-[toggle='false']:hidden",
				)}
			>
				{filteredOptions.length > 0 ? (
					filteredOptions.map((option, index) => (
						<li
							data-testid={"select-option"}
							onKeyDown={() => {}}
							key={index.toString()}
							data-active={selectedValue === option.value}
							className={classNames(
								"px-3 py-2 text-body2 cursor-pointer",
								"data-[active='false']:hover:bg-action-hover data-[active='false']:text-color-primary",
								"data-[active='true']:bg-primary-main data-[active='true']:text-white",
							)}
							onClick={() => handleSelect(option.value)}
						>
							{option.label}
						</li>
					))
				) : (
					<li data-testid={"select-no-option"} className={classNames("px-3 py-2 text-body2")}>
						{"İçerik Bulunamadı"}
					</li>
				)}
			</ul>
		</span>
	);
};
