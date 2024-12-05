import type { IFormControl } from "@/interfaces/components/form/IFormControl.ts";
import classNames from "classnames";

export const FormControl = ({ error, isRequired, label, children, className }: IFormControl) => {
	return (
		<div data-testid={"form-control"} className={classNames("flex flex-col gap-1", className)}>
			{label && (
				<div data-testid={"label-box"} className={"flex gap-1 items-start"}>
					<p
						data-testid={"label"}
						data-invalid={!!error}
						className={"text-body2 text-color-primary data-[invalid='true']:text-error-dark"}
					>
						{label}
					</p>
					{isRequired && (
						<p data-testid={"asterisk"} className={"text-error-dark text-body2"}>
							*
						</p>
					)}
				</div>
			)}
			{children}
			{error && error !== "" && (
				<p data-testid={"error"} className="text-caption text-error-dark">
					{error}
				</p>
			)}
		</div>
	);
};
