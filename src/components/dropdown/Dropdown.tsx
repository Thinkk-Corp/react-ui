import { DropdownItem } from "@/components/dropdown/DropdownItem";
import { DropdownTrigger } from "@/components/dropdown/DropdownTrigger";
import type { IDropdown } from "@/interfaces/components/dropdown/IDropdown.ts";
import type { ICustomStylesConfig } from "@/interfaces/types/ICustomStyleConfig";
import type { IPosition, ISize } from "@/interfaces/types/IMetrics.ts";
import { useThemeStore } from "@/stores/ThemeStore.ts";
import classNames from "classnames";
import {
	Children,
	type Dispatch,
	type ReactElement,
	type RefObject,
	type SetStateAction,
	cloneElement,
	isValidElement,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";

export const positionSchema: Record<IPosition, string> = {
	top: "bottom-full mb-3 left-1/2 -translate-x-1/2",
	bottom: "mt-2 left-1/2 -translate-x-1/2",
	right: "ml-2 left-full top-1/2 -translate-y-1/2",
	left: "mr-2 right-full top-1/2 -translate-y-1/2",
	"top-right": "mb-3 bottom-full left-0",
	"top-left": "mb-3 bottom-full right-0",
	"bottom-right": "mt-2 left-0",
	"bottom-left": "mt-2 right-0",
};

// Dropdown bileşeni
export const Dropdown = ({
	onOpened,
	onClosed,
	isOpen = false,
	closeToClickOutside = true,
	closeToClickInside = true,
	styleClass,
	children,
	size = "md",
	position = "bottom-right",
}: IDropdown) => {
	const [internalIsOpen, setInternalIsOpen] = useState(isOpen);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const triggerRef = useRef<HTMLDivElement>(null);
	const theme = useThemeStore((state) => state.theme);

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

			if ((closeToClickOutside && isClickOutside) || (closeToClickInside && !isClickOutside)) {
				setInternalIsOpen(false);
			}
		},
		[closeToClickOutside, closeToClickInside, internalIsOpen],
	);

	useEffect(() => {
		// Dropdown açıldığında onOpened, kapandığında onClosed callback'lerini çağır
		if (internalIsOpen) {
			onOpened?.();
		} else {
			onClosed?.();
		}
	}, [internalIsOpen]);

	useEffect(() => {
		if (closeToClickOutside) {
			window.addEventListener("click", handleClick);
		}

		return () => {
			window.removeEventListener("click", handleClick);
		};
	}, [handleClick, closeToClickOutside]);

	useEffect(() => {
		setInternalIsOpen(isOpen);
	}, [isOpen]);

	return (
		<span data-testid={"dropdown"} className="relative" ref={dropdownRef}>
			{/* Dropdown tetikleyici (Trigger) kısmı */}
			{Children.toArray(children).map((child) => {
				// Sadece DropdownTrigger bileşenini render et
				if (!isValidElement(child) || child.type !== DropdownTrigger) return null;
				return cloneElement(
					child as ReactElement<{
						isOpen: boolean;
						setIsOpen: Dispatch<SetStateAction<boolean>>;
						styleClass?: ICustomStylesConfig;
						ref: RefObject<HTMLDivElement | null>;
					}>,
					{
						isOpen: internalIsOpen,
						setIsOpen: setInternalIsOpen,
						styleClass: styleClass?.trigger,
						ref: triggerRef,
					},
				);
			})}
			{/* Eğer Dropdown açık ise, item'ları render et */}
			{internalIsOpen && (
				<div
					data-testid={"dropdown-menu"}
					className={classNames(
						"absolute",
						{
							[`bg-paper-card divide-y divide-custom-divider overflow-hidden rounded-lg border border-custom-card-border ${theme === "light" && " shadow-card"}`]:
								typeof styleClass?.menu?.defaultStyleActive === "undefined" || styleClass?.menu?.defaultStyleActive === null
									? true
									: styleClass?.menu?.defaultStyleActive,
						},
						sizeSchema[size],
						styleClass?.menu?.customStyle,
						positionSchema[position],
					)}
					role="menu"
				>
					{Children.toArray(children).map((child) => {
						// Sadece DropdownItem bileşenini render et
						if (!isValidElement(child) || child.type !== DropdownItem) return null;
						return cloneElement(child as ReactElement<{ styleClass?: ICustomStylesConfig }>, { styleClass: styleClass?.item }); // DropdownItem'ı olduğu gibi render et
					})}
				</div>
			)}
		</span>
	);
};
