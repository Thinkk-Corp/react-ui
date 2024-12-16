import type { ICardChild } from "@/interfaces/components/card/ICardChild.ts";
import classNames from "classnames";

export const CardBody = ({ children, styleClass, className = "" }: ICardChild) => {
	const cardBodyStyle = classNames(
		{ [`text-body2 text-color-primary ${className}`]: !styleClass || styleClass.defaultStyleActive },
		styleClass?.customStyle,
	);
	return (
		<div data-testid={"card-body"} className={cardBodyStyle}>
			{children}
		</div>
	);
};
