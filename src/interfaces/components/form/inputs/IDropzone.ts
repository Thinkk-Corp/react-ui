export interface IDropzone {
	onFilesAccepted: (files: File[]) => void; // Geçerli dosyaları iletmek için bir callback
	maxFiles?: number; // Maksimum dosya sayısı
	maxSize?: number; // Maksimum dosya boyutu (bayt cinsinden)
	acceptedFormats?: string[]; // Kabul edilen dosya formatları
	className?: string;
}
