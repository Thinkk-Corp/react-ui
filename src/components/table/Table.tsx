import type { ITable } from "@/interfaces/components/ITable";
import classNames from "classnames";
import type { ReactNode } from "react";

export const Table = <T,>({ columns, rows }: ITable<T>) => {
	return (
		<div className="overflow-x-auto rounded-lg border border-custom-divider shadow-card">
			<table className="min-w-full divide-y-2 divide-custom-divider bg-paper-card text-color-primary">
				<thead className="ltr:text-left rtl:text-right">
					<tr className="divide-x divide-custom-divider">
						{columns.map((column) => (
							<th key={String(column.field)} className="text-body1 font-normal  whitespace-nowrap px-4 py-2">
								{column.headerName}
							</th>
						))}
					</tr>
				</thead>
				<tbody className="divide-y divide-custom-divider text-body2">
					{rows.map((row, rowIndex) => (
						<tr key={rowIndex.toString()} className={"even:bg-paper-level2 divide-x divide-custom-divider"}>
							{columns.map((column) => {
								if (column?.cellRenderer) {
									return column.cellRenderer({ row, column });
								}
								return (
									<td key={column.field.toString()} className={classNames("px-4 py-2")}>
										{row[column.field] as ReactNode}
									</td>
								);
							})}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
