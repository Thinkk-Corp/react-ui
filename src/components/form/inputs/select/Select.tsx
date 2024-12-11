import { getOptionsAction } from "@/actions/server/GetOptionsAction.ts";
import { Input } from "@/components/form/inputs/input/Input.tsx";
import { IconBox } from "@/components/icon-box/IconBox.tsx";
import type { IOption, ISelect } from "@/interfaces/components/form/inputs/ISelect.ts";
import { icons } from "@/plugins/Icons.tsx";
import { keyboardUtil } from "@/utils/KeyboardUtil.ts";
import classNames from "classnames";
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
	const [beingSelectedValue, setBeingSelectedValue] = useState<string>("");
	const [searchValue, setSearchValue] = useState<string>("");
	const [filteredOptions, setFilteredOptions] = useState<IOption[]>(options);

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

	const changeItem = (direction: "up" | "down"): void => {
		// Eğer seçili öğe filtrelenmiş lstede yok ise filtrelenmiş listede ilk öğeyi seç
		if (!filteredOptions.find((option) => option.value === beingSelectedValue)) {
			setBeingSelectedValue(filteredOptions[0].value);
		}

		const selectedValueIndex = filteredOptions.findIndex((option) => option.value === beingSelectedValue);

		// Eğer ilk ya da son öğedeysen, başka bir öğeye geçme
		if (selectedValueIndex === -1) return; // Seçili değer bulunamadıysa çık

		// Yukarı ve aşağı yönde geçişi kontrol et
		let newSelectedValueIndex: number;

		if (direction === "down") {
			newSelectedValueIndex = selectedValueIndex === filteredOptions.length - 1 ? selectedValueIndex : selectedValueIndex + 1;
		} else {
			newSelectedValueIndex = selectedValueIndex === 0 ? selectedValueIndex : selectedValueIndex - 1;
		}

		// Seçilen değeri güncelle
		setBeingSelectedValue(filteredOptions[newSelectedValueIndex].value);
	};

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
		setBeingSelectedValue(selectedValue);
	}, [selectedValue]);

	useEffect(() => {
		if (typeof value === "undefined" || value === null || value === selectedValue) return;
		setSelectedValue(value);
	}, [value, selectedValue]);

	useEffect(() => {
		if (isOpen) return;
		setBeingSelectedValue(selectedValue);
	}, [isOpen]);

	return (
		<div data-toggle={isOpen} data-testid="select-container" className={classNames("relative group inline-block", className)}>
			{/* Seçim veya Arama Alanı */}
			<Input
				readOnly={!isSearchable}
				onBlur={handleBlur}
				id={id}
				data-testid={"select-input"}
				icon={iconRenderer()}
				isInvalid={isInvalid}
				onKeyDown={(e) => {
					e.preventDefault();
					keyboardUtil({ e, key: "Enter", callback: toggleDropdown });
					keyboardUtil({ e, key: "ArrowUp", callback: () => changeItem("up") });
					keyboardUtil({ e, key: "ArrowDown", callback: () => changeItem("down") });
					if (!isOpen) return;
					keyboardUtil({
						e,
						key: "Enter",
						callback: () => {
							handleSelect(beingSelectedValue);
						},
					});
				}}
				value={searchValue}
				onChange={handleSearchChange}
				onClick={toggleDropdown}
				className="w-full z-40"
			/>

			{/* Seçenek Listesi */}
			<ul
				data-testid="select-menu"
				className={classNames(
					"absolute overflow-hidden z-50 w-full mt-1 max-h-80 overflow-y-auto rounded-lg shadow-md border divide-y",
					"bg-paper-card divide-custom-divider border-custom-card-border",
					{ hidden: !isOpen },
				)}
			>
				{filteredOptions.length ? (
					filteredOptions.map((option) => (
						<li
							data-testid={"select-option"}
							onKeyDown={(e) =>
								keyboardUtil({
									e,
									key: "Enter",
									callback: () => {
										handleSelect(option.value);
									},
								})
							}
							key={option.value}
							onClick={() => handleSelect(option.value)}
							className={classNames("px-3 py-2 cursor-pointer", {
								"bg-primary-main text-white": beingSelectedValue === option.value,
								"hover:bg-action-hover text-color-primary": beingSelectedValue !== option.value,
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
