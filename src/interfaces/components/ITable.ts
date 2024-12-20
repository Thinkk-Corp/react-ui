import type { ReactNode } from "react";

/**
 * @interface ITableCaption
 * @description Tabloya ait açıklama verisini tutar.
 */
export interface ITableCaption {
	content?: string;
	position?: "top" | "bottom";
}

/**
 * @interface ITableCellRendererParams
 * @description Tablo hücrelerini özelleştirmek için kullanılan veri yapısı.
 * @template T Tablo verisi için kullanılan generik tür.
 */
export interface ITableCellRendererParams<T> {
	column: ITableColumn<T>;
	row: ITableRow<T>;
}

/**
 * @interface ITableColumn
 * @description Tablo sütunlarını yapılandırmak için kullanılan veri yapısı.
 */
export interface ITableColumn<T> {
	headerName: string; // Sütun başlığı
	field: keyof T; // Satırdaki veri ile eşleşen alan
	cellRenderer?: (props: ITableCellRendererParams<T>) => ReactNode; // Hücre render işlevi
}

/**
 * @interface ITableRow
 * @description Tablo satırlarını temsil eder. Her satır, bir nesne olmalıdır.
 */
export type ITableRow<T> = T;

/**
 * @interface ITableOptions
 * @description Tabloya ait ek özellikleri tanımlar.
 */
export interface ITableOptions<T> {
	showBorders?: boolean; // Sınırları gösterme
	layout?: "auto" | "fixed"; // Tablo düzeni
	onRowClick?: (row: ITableRow<T>) => void; // Satır tıklama işlevi
	caption?: ITableCaption; // Tablo açıklaması
	hoverHighlight?: boolean; // Satır üzerine gelince renk değişimi
	stripedRows?: boolean; // Çizgili satırlar
	headerHeight?: string; // Başlık yüksekliği
	rowHeight?: string; // Satır yüksekliği
	emptyStateMessage: string; // Veri yoksa gösterilecek mesaj
}

/**
 * @interface ITable
 * @description Tabloyu oluşturacak bileşen için gerekli olan özellikleri içerir.
 */
export interface ITable<T> {
	columns: ITableColumn<T>[]; // Tablo sütunlarının listesi
	rows: ITableRow<T>[]; // Tablo satırlarının listesi
	tableOptions?: ITableOptions<T>; // Tablo seçenekleri
}
