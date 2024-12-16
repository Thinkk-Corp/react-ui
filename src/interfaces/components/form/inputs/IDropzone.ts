import type { HTMLAttributes } from "react";
import type { IFileError } from "react-dropzone-kit";

export interface IDropzone extends Omit<HTMLAttributes<HTMLInputElement>, "onDrop" | "children"> {
	onFilesAccepted?: (files: File[]) => void;
	maxSize?: number;
	minSize?: number;
	initialFiles?: File[];
	multiple?: boolean;
	maxFiles?: number;
	acceptedFormats?: string[];
	validationMessages?: IFileError[];
	className?: string;
}
