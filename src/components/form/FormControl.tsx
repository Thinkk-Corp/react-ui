import type { IFormControl } from "@/interfaces/components/form/IFormControl.ts";
import classNames from "classnames";

export const FormControl = ({ error, isRequired, label, children, className }: IFormControl) => {
	return (
		<div className={classNames("flex flex-col gap-1", className)}>
			{label && (
				<div className={"flex gap-1 items-start"}>
					<p data-invalid={!!error} className={"text-body2 text-color-primary data-[invalid='true']:text-error-dark"}>
						{label}
					</p>
					{isRequired && <p className={"text-error-dark text-body2"}>*</p>}
				</div>
			)}
			{children}
			{error && error !== "" && <p className="text-caption text-error-dark">{error}</p>}
		</div>
	);
};
