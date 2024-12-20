import { IconBox } from "@/components/IconBox";
import type { IDropzone } from "@/interfaces/components/form/inputs/IDropzone";
import { icons } from "@/plugins/Icons";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Dropzone as DropzoneKit, type IFileRejection } from "react-dropzone-kit";
import { useTranslation } from "react-i18next";

/**
 * Dropzone bileşeni, dosya yükleme işlemleri için bir kullanıcı arayüzü sağlar.
 *
 * @param {IDropzone} props - Dropzone bileşenine ait özellikler.
 * @param {(files: File[]) => void} props.onFilesAccepted - Kabul edilen dosyalar için çağrılan callback fonksiyonu.
 * @param {number} [props.minSize] - Yüklenebilecek dosyaların minimum boyutu (byte cinsinden).
 * @param {number} [props.maxSize] - Yüklenebilecek dosyaların maksimum boyutu (byte cinsinden).
 * @param {number} [props.maxFiles] - Maksimum yüklenebilecek dosya sayısı.
 * @param {string[]} [props.acceptedFormats] - Kabul edilen dosya formatları.
 * @param {string} [props.className] - Ek CSS sınıfları.
 * @param {Object} [props.validationMessages] - Özelleştirilmiş doğrulama mesajları.
 *
 * @returns {JSX.Element} Dropzone bileşeni.
 */
export const Dropzone = ({
	initialFiles = [],
	onFilesAccepted,
	minSize,
	maxSize,
	maxFiles,
	acceptedFormats,
	multiple,
	className = "",
	validationMessages,
	...props
}: IDropzone) => {
	// Kabul edilen dosyalar.
	const [acceptedFiles, setAcceptedFiles] = useState<File[]>([]);
	// Tüm bırakılan dosyalar (kabul edilen ve reddedilen).
	const [droppedFiles, setDroppedFiles] = useState<File[]>([]);
	// Reddedilen dosyalar ve nedenleri.
	const [fileRejections, setFileRejections] = useState<IFileRejection[]>([]);

	const { t } = useTranslation();

	// Kabul edilen dosyaları işleyen fonksiyon.
	const handleDropAccepted = (files: File[]) => {
		if (files.length === acceptedFiles.length) return;
		setAcceptedFiles(files);
	};

	// Reddedilen dosyaları işleyen fonksiyon.
	const handleDropRejected = (rejections: IFileRejection[]) => {
		if (rejections.length === 0 && fileRejections.length === 0) return;
		setFileRejections(rejections);
	};

	/**
	 * Bir dosya adına ait hata mesajlarını döner.
	 * @param {string} fileName - Dosya adı.
	 * @returns {string | null} Hata mesajlarını içeren HTML veya null.
	 */
	const fileError = (fileName: string) => {
		const errors = fileRejections.find((rejection) => rejection.file.name === fileName)?.error.map((err) => err.message);

		if (!errors || errors.length === 0) return null;

		const htmlContent = errors.map((err: string) => `<li>${err}</li>`).join(""); // HTML içeriği oluşturuluyor

		return `<ul>${htmlContent}</ul>`;
	};

	/**
	 * Byte cinsinden verilen bir boyutu megabayta çevirir.
	 * @param {number} size - Boyut (byte).
	 * @returns {number} Boyut (MB).
	 */
	const sizeToMb = (size: number): number => {
		return Number.parseFloat((size / (1024 * 1024)).toFixed(3));
	};

	/**
	 * Bir dosyayı siler.
	 * @param {File} removedFile - Silinecek dosya.
	 * @param {(file: File) => void} callback - Silme işlemi sonrası çağrılacak fonksiyon.
	 */
	const removeFile = (removedFile: File, callback: (file: File) => void) => {
		if (!droppedFiles || droppedFiles.length === 0) return;
		callback(removedFile);
	};

	/**
	 * Yükleme kurallarıyla ilgili metni oluşturur.
	 * @returns {string | null} Kurallar metni veya null.
	 */
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

	// Kabul edilen dosyalar değiştiğinde callback'i çağırır.
	useEffect(() => {
		onFilesAccepted?.(acceptedFiles);
	}, [acceptedFiles]);

	// Kabul edilen, reddedilen ve tüm bırakılan dosyaları günceller.
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
			initialFiles={initialFiles}
			multiple={multiple}
			{...props}
		>
			{({ containerProps, inputProps, handleFileDelete, isDragActive }) => (
				<div
					data-testid={"dropzone-outer-container"}
					className={classNames(
						"cursor-pointer border-2 overflow-hidden w-full border-dashed bg-action-hover duration-200 rounded-lg text-center",
						{
							"border-primary-main": isDragActive,
							"hover:border-primary-main border-custom-divider": !isDragActive,
						},
						className,
					)}
				>
					<div {...containerProps} className="p-6" data-testid="dropzone-container">
						<input data-testid="dropzone-input" {...inputProps} />
						<div className="flex justify-center items-center">
							<IconBox color="color-primary" size="2xl">
								{icons.outline.upload}
							</IconBox>
						</div>
						<p data-testid="dropzone-drag-text" className="text-body2 mt-4 text-color-primary">
							{isDragActive ? t("theme.dropzone.drag_active_label") : t("theme.dropzone.drag_inactive_label")}
						</p>
						{ruleTextGenerator() && (
							<span data-testid="dropzone-rules-text" className="text-color-primary text-caption opacity-80 mt-2">
								{ruleTextGenerator()}
							</span>
						)}
					</div>
					<div className="flex items-center gap-3 p-2 pt-0 overflow-auto">
						<AnimatePresence>
							{droppedFiles.length > 0 &&
								droppedFiles.map((file) => (
									<motion.div
										data-testid="dropzone-file"
										data-tooltip-id="global-tooltip"
										data-tooltip-html={fileError(file.name)}
										data-tooltip-hidden={!fileError(file.name)}
										key={`${file.name}-${file.size}-${file.lastModified}`}
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{ duration: 0.3 }}
										className={classNames("border rounded flex items-center gap-2 p-2 text-caption text-color-primary", {
											"border-error-dark bg-error-hovered": fileError(file.name),
											"border-custom-divider bg-action-hover": !fileError(file.name),
										})}
									>
										<span data-testid="dropzone-file-name-text" className="text-nowrap">
											{file.name}
										</span>
										<span
											data-testid="dropzone-file-size-text"
											className="opacity-80 text-nowrap"
										>{`${sizeToMb(file.size)} MB`}</span>
										<IconBox size="sm" onClick={() => removeFile(file, handleFileDelete)} color="error-dark">
											{icons.outline.x}
										</IconBox>
									</motion.div>
								))}
						</AnimatePresence>
					</div>
				</div>
			)}
		</DropzoneKit>
	);
};
