import { IconBox } from "@/components/icon-box/IconBox";
import type { IDropzone } from "@/interfaces/components/form/inputs/IDropzone";
import { icons } from "@/plugins/Icons";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useState } from "react";
import { useDropzone, type FileRejection, type DropEvent, type Accept } from "react-dropzone";
import { useTranslation } from "react-i18next";

export type IDropdownError = { fileName: string; error: string };

export const Dropzone: React.FC<IDropzone> = ({
	onFilesAccepted,
	maxFiles = 5,
	maxSize = 5 * 1024 * 1024, // 5MB
	acceptedFormats = ["image/jpeg", "image/png"],
	className = "",
}) => {
	const { t } = useTranslation();

	const [error, setError] = useState<IDropdownError[]>([]);
	const [acceptedFiles, setAcceptedFiles] = useState<File[]>([]);

	const onDrop = useCallback(
		(files: File[], fileRejections: FileRejection[], _event: DropEvent) => {
			// Filtrelenmiş dosyalar
			const newFiles = files.filter((file) => !acceptedFiles.some((acceptedFile) => acceptedFile.name === file.name));

			// Reddedilen dosyalar için hata mesajları oluştur
			if (fileRejections.length > 0) {
				const rejectionReasons = fileRejections.map((rejection) => {
					setAcceptedFiles((prev) => [...prev, rejection.file]);
					const formattedRejectionErrors = rejection.errors.map((err) => {
						if (err.code === "too-many-files") {
							return {
								code: "too-many-files",
								message: t("theme.dropzone.errors.too_many_file", { maxFiles }),
							};
						}
						return err;
					});
					return {
						fileName: rejection.file.name,
						error: t("theme.dropzone.errors.file_rejected", {
							error: formattedRejectionErrors.map((err) => err.message).join(", "),
						}),
					};
				});

				setError(rejectionReasons);
			}

			// Yeni dosyaları ekle ve geri bildirimde bulun
			if (newFiles.length > 0) {
				setAcceptedFiles((prev) => [...prev, ...newFiles]);
				onFilesAccepted([...acceptedFiles.filter((file) => !fileError(file.name)), ...newFiles]);
			}
		},
		[acceptedFiles, onFilesAccepted, t, maxFiles],
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		maxFiles,
		accept: acceptedFormats.reduce((acc, format) => {
			acc[format] = [];
			return acc;
		}, {} as Accept),
		validator: (file: File) => {
			if (file.size > maxSize) {
				return {
					code: "size-too-large",
					message: t("theme.dropzone.errors.size_too_large", { maxSize }),
				};
			}
			return null;
		},
	});

	const sizeToMb = (size: number): number => {
		return Number.parseFloat((size / (1024 * 1024)).toFixed(3));
	};

	const fileError = (fileName: string) => error.find((err) => err.fileName === fileName);

	const removeFile = (removedFile: File) => {
		if (!acceptedFiles || acceptedFiles.length === 0) return;
		const updatedFiles = acceptedFiles.filter((file) => file.name !== removedFile.name);
		setAcceptedFiles(updatedFiles);
		if (fileError(removedFile.name)) return;
		onFilesAccepted(updatedFiles.filter((file) => !fileError(file.name)));
	};

	return (
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
			<div className="p-6" {...getRootProps()}>
				<input {...getInputProps()} />
				<div className="flex justify-center items-center">
					<IconBox color="color-primary" size="2xl">
						{icons.outline.upload}
					</IconBox>
				</div>
				<p className="text-body2 mt-4 text-color-primary">
					{isDragActive ? t("theme.dropzone.drag_active_label") : t("theme.dropzone.drag_inactive_label")}
				</p>
				<p className="text-caption text-color-primary opacity-80 mt-1">
					{t("theme.dropzone.accepted_formats_text", {
						formats: acceptedFormats.join(", "),
						size: (maxSize / 1024 / 1024).toFixed(2),
					})}
				</p>
			</div>
			<div className="flex items-center gap-3 p-2 pt-0 overflow-auto">
				<AnimatePresence>
					{acceptedFiles.length > 0 &&
						acceptedFiles.map((file) => {
							return (
								<motion.div
									data-tooltip-id="global-tooltip"
									data-tooltip-hidden={!fileError(file.name)}
									data-tooltip-content={fileError(file.name)?.error}
									key={`${file.name}-${file.size}-${file.lastModified}`} // Unique key usage
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
										<IconBox size="sm" onClick={() => removeFile(file)} color="error-dark">
											{icons.outline.x}
										</IconBox>
									</div>
								</motion.div>
							);
						})}
				</AnimatePresence>
			</div>
		</div>
	);
};
