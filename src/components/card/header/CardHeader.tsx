import type { ICardChild } from "@/interfaces/components/card/ICardChild.ts";
import classNames from "classnames";

export const CardHeader = ({ children, style, className = "" }: ICardChild) => {
	const cardHeaderStyle = classNames(
		{ [`text-h4 text-color-primary ${className}`]: !style || style.defaultStyleActive },
		style?.customStyle,
	);

	return (
		<div data-testid={"card-header"} className={cardHeaderStyle}>
			{children}
		</div>
	);
};
