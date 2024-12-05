import type { ITextarea } from "@/interfaces/components/form/inputs/ITextarea.ts";
import classNames from "classnames";

export const Textarea = ({ isInvalid = false, rows = 4, className = "", ...props }: ITextarea) => {
	return (
		<textarea
			data-testid={"textarea"}
			data-invalid={isInvalid}
			className={classNames(
				"px-3 py-2 w-full bg-transparent rounded-lg border align-top shadow-2 text-body1",
				"border-custom-divider",
				"focus:outline-0",
				"data-[invalid='false']:hover:border-primary-main",
				"data-[invalid='false']:focus:border-primary-main",
				"data-[invalid='true']:border-error-dark",
				className,
			)}
			rows={rows}
			{...props}
		/>
	);
};
