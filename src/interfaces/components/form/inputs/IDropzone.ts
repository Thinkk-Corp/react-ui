import type { IFileError } from "dropzone-kit";

export interface IDropzone {
	onFilesAccepted?: (files: File[]) => void;
	maxSize?: number;
	minSize?: number;
	maxFiles?: number;
	acceptedFormats?: string[];
	validationMessages?: IFileError[];
	className?: string;
}
