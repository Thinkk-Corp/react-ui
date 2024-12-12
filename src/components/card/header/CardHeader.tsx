import type { ICardChild } from "@/interfaces/components/card/ICardChild.ts";
import classNames from "classnames";

export const CardHeader = ({ children, styleClass, className = "" }: ICardChild) => {
	const cardHeaderStyle = classNames(
		{ [`text-h4 text-color-primary ${className}`]: !styleClass || styleClass.defaultStyleActive },
		styleClass?.customStyle,
	);

	return (
		<div data-testid={"card-header"} className={cardHeaderStyle}>
			{children}
		</div>
	);
};
