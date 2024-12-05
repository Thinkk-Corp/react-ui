import { getOptionsAction } from "@/actions/server/GetOptionsAction.ts";
import { Input } from "@/components/form/inputs/input/Input.tsx";
import { IconBox } from "@/components/icon-box/IconBox.tsx";
import type { IOption, ISelect } from "@/interfaces/components/form/inputs/ISelect.ts";
import { icons } from "@/plugins/Icons.tsx";
import classNames from "classnames";
import { useRef } from "react";
import { useCallback } from "react";
import { useEffect, useState } from "react";

export const Select = ({
	options: optionsProp,
	endpoint,
	className,
	isInvalid = false,
	id,
	value,
	onChange,
	onClick,
	onBlur,
	isSearchable = false,
}: ISelect) => {
	const defaultOption = { value: "", label: "Seçiniz" };
	const [isOpen, setIsOpen] = useState(false);
	const [options, setOptions] = useState<IOption[]>([defaultOption]);
	const [selectedValue, setSelectedValue] = useState<string>("");
	const [searchValue, setSearchValue] = useState<string>("");
	const [filteredOptions, setFilteredOptions] = useState<IOption[]>(options);

	const selectInputRef = useRef<HTMLDivElement>(null);

	// Helper: Label Bul
	const findLabelByValue = useCallback(
		(value: string) => options.find((option) => option.value === value)?.label || "",
		[options],
	);

	// Seçim Yapma
	const handleSelect = (value: string) => {
		setSelectedValue(value);
		onChange?.(value);
		setIsOpen(false);
	};

	// Listeyi Aç/Kapat
	const toggleDropdown = () => {
		setIsOpen((prev) => !prev);
		onClick?.();
	};

	// Arama Girdisi
	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSearchValue(value);
		if (value.trim()) {
			setFilteredOptions(options.filter((option) => option.label.toLowerCase().includes(value.toLowerCase())));
		} else {
			setFilteredOptions(options);
		}
		if (!isOpen) setIsOpen(true);
	};

	// Blur Olayı
	const handleBlur = () => {
		if (searchValue !== findLabelByValue(selectedValue)) setSearchValue(findLabelByValue(selectedValue));
		setTimeout(() => {
			setFilteredOptions(options);
			setIsOpen(false);
			onBlur?.();
		}, 100);
	};

	const iconRenderer = () => (
		<IconBox size={"sm"} color={"color-primary"}>
			{icons.outline[isOpen ? "chevron_up" : "chevron_down"]}
		</IconBox>
	);

	// Props ile Gelen Seçenekleri Yükleme
	useEffect(() => {
		if (optionsProp && optionsProp.length > 0) {
			setOptions([defaultOption, ...optionsProp]);
			setFilteredOptions([defaultOption, ...optionsProp]);
		} else if (endpoint) {
			const fetchOptions = async () => {
				const data = await getOptionsAction(endpoint);
				if (data) {
					setOptions([defaultOption, ...data]);
					setFilteredOptions([defaultOption, ...data]);
				} else {
					setOptions([]);
					setFilteredOptions([]);
				}
			};
			fetchOptions();
		} else if (!optionsProp || optionsProp.length === 0) {
			setOptions([]);
			setFilteredOptions([]);
		}
	}, [optionsProp, endpoint]);

	useEffect(() => {
		setSearchValue(findLabelByValue(selectedValue));
	}, [selectedValue]);

	useEffect(() => {
		if (typeof value === "undefined" || value === null || value === selectedValue) return;
		setSelectedValue(value);
	}, [value, selectedValue]);

	return (
		<div
			data-toggle={isOpen}
			data-testid="select-container"
			className={classNames("relative z-40 isolate group min-w-60 inline-block", className)}
		>
			{/* Seçim veya Arama Alanı */}
			{!isSearchable ? (
				<div
					onBlur={handleBlur}
					ref={selectInputRef}
					data-testid={"select-input"}
					onKeyDown={() => {}}
					onClick={toggleDropdown}
					id={id}
					data-invalid={isInvalid}
					className={classNames(
						"h-10 w-full flex items-center justify-between px-3 rounded-lg cursor-pointer",
						"bg-transparent border border-custom-divider",
						"data-[invalid='true']:border-error-main",
						"data-[invalid='false']:hover:border-primary-main",
						"data-[invalid='false']:group-data-[toggle='true']:border-primary-main",
					)}
				>
					<span className="text-body1">{searchValue}</span>
					{iconRenderer()}
				</div>
			) : (
				<Input
					onBlur={handleBlur}
					data-testid={"select-input"}
					icon={iconRenderer()}
					isInvalid={isInvalid}
					value={searchValue}
					onChange={handleSearchChange}
					onClick={toggleDropdown}
					className="w-full"
				/>
			)}

			{/* Seçenek Listesi */}
			<ul
				data-testid="select-menu"
				className={classNames(
					"absolute overflow-hidden w-full mt-1 max-h-80 overflow-y-auto rounded-lg shadow-md border divide-y",
					"bg-paper-card divide-custom-divider border-custom-card-border",
					{ hidden: !isOpen },
				)}
			>
				{filteredOptions.length ? (
					filteredOptions.map((option) => (
						<li
							data-testid={"select-option"}
							onKeyDown={() => {}}
							key={option.value}
							onClick={() => handleSelect(option.value)}
							className={classNames("px-3 py-2 cursor-pointer", {
								"bg-primary-main text-white": selectedValue === option.value,
								"hover:bg-action-hover text-color-primary": selectedValue !== option.value,
							})}
						>
							{option.label}
						</li>
					))
				) : (
					<li data-testid={"select-no-option"} className="px-3 py-2 text-body2">
						İçerik Bulunamadı
					</li>
				)}
			</ul>
		</div>
	);
};
