import { useEffect, useState } from "react";
import { type IFileRejection, Dropzone as DropzoneKit } from "dropzone-kit";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import { IconBox } from "@/components/icon-box/IconBox";
import { icons } from "@/plugins/Icons";
import { AnimatePresence, motion } from "framer-motion";
import type { IDropzone } from "@/interfaces/components/form/inputs/IDropzone";

export const Dropzone = ({
	onFilesAccepted,
	minSize,
	maxSize,
	maxFiles,
	acceptedFormats,
	className = "",
	validationMessages,
}: IDropzone) => {
	const [acceptedFiles, setAcceptedFiles] = useState<File[]>([]);
	const [droppedFiles, setDroppedFiles] = useState<File[]>([]);
	const [fileRejections, setFileRejections] = useState<IFileRejection[]>([]);

	const { t } = useTranslation();

	const handleDropAccepted = (files: File[]) => {
		setAcceptedFiles(files);
	};

	const handleDropRejected = (rejections: IFileRejection[]) => {
		setFileRejections(rejections);
	};

	const fileError = (fileName: string) => {
		const errors = fileRejections.find((rejection) => rejection.file.name === fileName)?.error.map((err) => err.message);

		if (!errors || errors.length === 0) return null;

		const htmlContent = errors.map((err) => `<li>${err}</li>`).join(""); // HTML içeriği oluşturuluyor

		return `<ul>${htmlContent}</ul>`;
	};

	const sizeToMb = (size: number): number => {
		return Number.parseFloat((size / (1024 * 1024)).toFixed(3));
	};

	const removeFile = (removedFile: File, callback: (file: File) => void) => {
		if (!droppedFiles || droppedFiles.length === 0) return;
		callback(removedFile);
	};

	const ruleTextGenerator = () => {
		const ruleTexts: string[] = [];

		if (maxSize) {
			ruleTexts.push(t("theme.dropzone.rules_text.max_size", { maxSize: sizeToMb(maxSize).toString() }));
		}

		if (minSize) {
			ruleTexts.push(t("theme.dropzone.rules_text.min_size", { minSize: sizeToMb(minSize).toString() }));
		}

		if (maxFiles) {
			ruleTexts.push(t("theme.dropzone.rules_text.max_files", { maxFiles: maxFiles.toString() }));
		}

		if (acceptedFormats) {
			ruleTexts.push(t("theme.dropzone.rules_text.accepted_formats", { formats: acceptedFormats.join(", ") }));
		}

		if (ruleTexts.length === 0) return null;

		return ruleTexts.join(" - ");
	};

	useEffect(() => {
		onFilesAccepted?.(acceptedFiles);
	}, [acceptedFiles]);

	useEffect(() => {
		if (acceptedFiles.length === 0 && fileRejections.length === 0 && droppedFiles.length === 0) return;
		const fileToFileRejections = fileRejections.map((rejection) => rejection.file);
		setDroppedFiles([...acceptedFiles, ...fileToFileRejections]);
	}, [acceptedFiles, fileRejections]);

	return (
		<DropzoneKit
			validationMessages={validationMessages}
			acceptedFormats={acceptedFormats}
			onDropRejected={handleDropRejected}
			onDropAccepted={handleDropAccepted}
			maxSize={maxSize}
			maxFiles={maxFiles}
			minSize={minSize}
		>
			{({ containerProps, inputProps, handleFileDelete, isDragActive }) => (
				<div
					className={classNames(
						"cursor-pointer border-2 overflow-hidden w-full border-dashed bg-action-hover duration-200 rounded-lg text-center",
						{
							"border-primary-main": isDragActive,
							"hover:border-primary-main border-custom-divider": !isDragActive,
						},
						className,
					)}
				>
					<div {...containerProps} className="p-6">
						<input {...inputProps} />
						<div className="flex justify-center items-center">
							<IconBox color="color-primary" size="2xl">
								{icons.outline.upload}
							</IconBox>
						</div>
						<p className="text-body2 mt-4 text-color-primary">
							{isDragActive ? t("theme.dropzone.drag_active_label") : t("theme.dropzone.drag_inactive_label")}
						</p>
						{ruleTextGenerator() && (
							<span className="text-color-primary text-caption opacity-80 mt-2">{ruleTextGenerator()}</span>
						)}
					</div>
					<div className="flex items-center gap-3 p-2 pt-0 overflow-auto">
						<AnimatePresence>
							{droppedFiles.length > 0 &&
								droppedFiles.map((file) => (
									<motion.div
										data-tooltip-id="global-tooltip"
										data-tooltip-html={fileError(file.name)}
										data-tooltip-hidden={!fileError(file.name)}
										key={`${file.name}-${file.size}-${file.lastModified}`}
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{ duration: 0.3 }}
									>
										<div
											className={classNames("border rounded flex items-center gap-2 p-2 text-caption text-color-primary", {
												"border-error-dark bg-error-hovered": fileError(file.name),
												"border-custom-divider bg-action-hover": !fileError(file.name),
											})}
										>
											<span className="text-nowrap">{file.name}</span>
											<span className="opacity-80 text-nowrap">{`${sizeToMb(file.size)} MB`}</span>
											<IconBox size="sm" onClick={() => removeFile(file, handleFileDelete)} color="error-dark">
												{icons.outline.x}
											</IconBox>
										</div>
									</motion.div>
								))}
						</AnimatePresence>
					</div>
				</div>
			)}
		</DropzoneKit>
	);
};
