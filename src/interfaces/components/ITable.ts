import type { ReactNode } from "react";

export type ICellRenderer<T> = (params: { column: ITableColumn<T>; row: T }) => ReactNode;

export interface ITableColumn<T> {
	headerName: string;
	field: keyof T;
	cellRenderer?: ICellRenderer<T>;
}

export interface ITable<T> {
	rows: T[];
	columns: ITableColumn<T>[];
}
