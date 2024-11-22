import { DropdownItem } from "@/components/dropdown/DropdownItem.tsx";
import { DropdownTrigger } from "@/components/dropdown/DropdownTrigger.tsx";
import type { IDropdown } from "@/interfaces/components/dropdown/IDropdown.ts";
import type { IPosition, ISize } from "@/interfaces/types/IMetrics.ts";
import classNames from "classnames";
import { Children, type ReactElement, cloneElement, isValidElement, useCallback, useEffect, useRef, useState } from "react";

// Dropdown bileşeni
export const Dropdown = ({
	onOpened,
	onClosed,
	isOpen = false,
	onCloseToClickOutside = true,
	onCloseToClickInside = true,
	styles,
	children,
	size = "md",
	position = "bottom-right",
}: IDropdown) => {
	const [internalIsOpen, setInternalIsOpen] = useState(isOpen);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const triggerRef = useRef<HTMLDivElement>(null);

	const positionSchema: Record<IPosition, string> = {
		top: "bottom-full mb-3 left-1/2 -translate-x-1/2",
		bottom: "mt-2 left-1/2 -translate-x-1/2",
		right: "ml-2 left-full top-1/2 -translate-y-1/2",
		left: "mr-2 right-full top-1/2 -translate-y-1/2",
		"top-right": "mb-3 bottom-full left-0",
		"top-left": "mb-3 bottom-full right-0",
		"bottom-right": "mt-2 left-0",
		"bottom-left": "mt-2 right-0",
	};

	const sizeSchema: Record<ISize, string> = {
		sm: "w-32",
		md: "w-56",
		lg: "w-64",
		xl: "w-72",
		"2xl": "w-96",
	};

	// Dışarıya tıklanıp tıklanmadığını kontrol eden fonksiyon
	const handleClick = useCallback(
		(event: MouseEvent) => {
			if (!dropdownRef.current || !triggerRef.current || !internalIsOpen) return;

			const isClickOnTrigger = triggerRef.current.contains(event.target as Node);

			if (isClickOnTrigger) return;

			const isClickOutside = !dropdownRef.current.contains(event.target as Node);

			if ((onCloseToClickOutside && isClickOutside) || (onCloseToClickInside && !isClickOutside)) {
				setInternalIsOpen(false);
			}
		},
		[onCloseToClickOutside, onCloseToClickInside, internalIsOpen],
	);

	useEffect(() => {
		// Dropdown açıldığında onOpened, kapandığında onClosed callback'lerini çağır
		if (internalIsOpen) {
			onOpened?.();
		} else {
			onClosed?.();
		}
	}, [internalIsOpen, onOpened, onClosed]);

	useEffect(() => {
		if (onCloseToClickOutside) {
			window.addEventListener("click", handleClick);
		}

		return () => {
			window.removeEventListener("click", handleClick);
		};
	}, [handleClick, onCloseToClickOutside]);

	return (
		<span className="relative" ref={dropdownRef}>
			{/* Dropdown tetikleyici (Trigger) kısmı */}
			{Children.toArray(children).map((child) => {
				// Sadece DropdownTrigger bileşenini render et
				if (!isValidElement(child) || child.type !== DropdownTrigger) return null;
				return cloneElement(child as ReactElement, {
					isOpen: internalIsOpen,
					setIsOpen: setInternalIsOpen,
					style: styles?.trigger,
					ref: triggerRef,
				});
			})}
			{/* Eğer Dropdown açık ise, item'ları render et */}
			{internalIsOpen && (
				<div
					className={classNames(
						"absolute",
						{
							"bg-paper-level2 divide-y divide-custom-divider rounded-lg border border-custom-divider shadow-lg":
								typeof styles?.menu?.defaultStyleActive === "undefined" || styles?.menu?.defaultStyleActive === null
									? true
									: styles?.menu?.defaultStyleActive,
						},
						sizeSchema[size],
						styles?.menu?.customStyle,
						positionSchema[position],
					)}
					role="menu"
				>
					{Children.toArray(children).map((child) => {
						// Sadece DropdownItem bileşenini render et
						if (!isValidElement(child) || child.type !== DropdownItem) return null;
						return cloneElement(child as ReactElement, { style: styles?.item }); // DropdownItem'ı olduğu gibi render et
					})}
				</div>
			)}
		</span>
	);
};

// Dropdown bileşeninin alt bileşenleri (Trigger ve Item)
Dropdown.Trigger = DropdownTrigger;
Dropdown.Item = DropdownItem;
