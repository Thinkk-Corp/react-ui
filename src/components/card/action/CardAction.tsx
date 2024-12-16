import type { ICardChild } from "@/interfaces/components/card/ICardChild.ts";
import classNames from "classnames";

export const CardAction = ({ children, styleClass, className = "" }: ICardChild) => {
	const cardActionStyle = classNames(
		{ [`flex items-center justify-end gap-4 ${className}`]: !styleClass || styleClass.defaultStyleActive },
		styleClass?.customStyle,
	);

	return (
		<div data-testid={"card-action"} className={cardActionStyle}>
			{children}
		</div>
	);
};
