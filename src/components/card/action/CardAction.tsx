import type { ICardChild } from "@/interfaces/components/card/ICardChild.ts";
import classNames from "classnames";

export const CardAction = ({ children, style, className = "" }: ICardChild) => {
	const cardActionStyle = classNames(
		{ [`flex items-center justify-end gap-4 ${className}`]: !style || style.defaultStyleActive },
		style?.customStyle,
	);

	return (
		<div data-testid={"card-action"} className={cardActionStyle}>
			{children}
		</div>
	);
};
