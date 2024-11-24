import { getOptionsAction } from "@/actions/server/GetOptionsAction.ts";
import { IconBox } from "@/components/iconbox/IconBox.tsx";
import { Input } from "@/components/inputs/input/Input.tsx";
import type { IOption, ISelect } from "@/interfaces/components/inputs/ISelect.ts";
import { icons } from "@/plugins/Icons.tsx";
import classNames from "classnames";
import type React from "react";
import { useRef } from "react";
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
	const defaultOption = { value: "", label: "Seçiniz" };
	const [isOpen, setIsOpen] = useState(false);
	const [options, setOptions] = useState<IOption[]>([defaultOption]);
	const [selectedValue, setSelectedValue] = useState<string>(defaultValue || "");
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
		setFilteredOptions(options);
		onBlur?.();
		setTimeout(() => setIsOpen(false), 100);
	};

	const iconRenderer = () => (
		<IconBox size={"sm"} color={"color-primary"}>
			{icons.outline[isOpen ? "chevron_up" : "chevron_down"]}
		</IconBox>
	);

	const handleOutsideClick = useCallback(
		(e: MouseEvent) => {
			if (!selectInputRef.current || selectInputRef.current.contains(e.target as Node)) return;
			setIsOpen(false);
			onBlur?.();
		},
		[onBlur],
	);

	useEffect(() => {
		window.addEventListener("click", handleOutsideClick);
		return () => {
			window.removeEventListener("click", handleOutsideClick);
		};
	}, [handleOutsideClick]);

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

	// Default Değer Güncellenirse
	useEffect(() => {
		if (defaultValue && defaultValue !== selectedValue) {
			setSelectedValue(defaultValue);
		}
	}, [defaultValue]);

	useEffect(() => {
		if (selectedValue === findLabelByValue(searchValue)) return;
		setSearchValue(findLabelByValue(selectedValue));
	}, [selectedValue]);

	return (
		<div
			data-toggle={isOpen}
			data-testid="select-container"
			className={classNames("relative group min-w-60 inline-block", className)}
		>
			{/* Seçim veya Arama Alanı */}
			{!isSearchable ? (
				<div
					ref={selectInputRef}
					data-testid={"select-input"}
					onKeyDown={() => {}}
					onClick={toggleDropdown}
					onBlur={handleBlur}
					id={id}
					data-invalid={isInvalid}
					className={classNames(
						"h-10 w-full flex items-center justify-between px-3 rounded-lg cursor-pointer",
						"bg-paper-level2 border border-custom-divider",
						"data-[invalid='true']:border-error-main",
						"data-[invalid='false']:hover:border-primary-main",
						"data-[invalid='false']:group-data-[toggle='true']:border-primary-main",
					)}
				>
					<span className="text-body1">{filteredOptions.length === 0 ? "Seçiniz" : searchValue}</span>
					{iconRenderer()}
				</div>
			) : (
				<Input
					data-testid={"select-input"}
					icon={iconRenderer()}
					isInvalid={isInvalid}
					value={filteredOptions.length === 0 ? "Seçiniz" : searchValue}
					onChange={handleSearchChange}
					onClick={toggleDropdown}
					onBlur={handleBlur}
					className="w-full"
				/>
			)}

			{/* Seçenek Listesi */}
			<ul
				data-testid="select-menu"
				className={classNames(
					"absolute overflow-hidden w-full mt-1 rounded-lg shadow-md border divide-y",
					"bg-paper-level2 divide-custom-divider border-custom-divider",
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
