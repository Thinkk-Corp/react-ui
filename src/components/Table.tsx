import type { ITable, ITableCaption, ITableRow } from "@/interfaces/components/ITable";
import classNames from "classnames";
import type { ReactNode } from "react";

/**
 * @component Table
 * @description Verilen sütunlar ve satırlar ile bir tablo oluşturur. Tablo, başlık, gövde ve isteğe bağlı açıklama (caption) içerir.
 *
 * @template T Tablo verisi için kullanılan generik tür.
 * @param {ITable<T>} props Tablo için gerekli özellikleri içerir:
 *  - columns: Tablo sütunlarının yapılandırmaları.
 *  - rows: Tabloya eklenecek satırların verileri.
 *  - tableOptions: Tablo için ek seçenekler (başlık yüksekliği, satır tıklama işlevi vb.).
 *
 * @returns {ReactNode} Dinamik olarak oluşturulmuş tablo bileşeni.
 */
export const Table = <T,>({ columns, rows, tableOptions }: ITable<T>) => {
	/**
	 * @function handleRowClick
	 * @description Bir tablo satırına tıklandığında çağrılır. Satır verilerini onRowClick işlevine iletir.
	 *
	 * @param {ITableRow<T>} row Tıklanan satırın verileri.
	 */
	const handleRowClick = (row: ITableRow<T>) => {
		tableOptions?.onRowClick?.(row);
	};

	/**
	 * @function tableCaptionRenderer
	 * @description Tablo açıklamasını (caption) oluşturur. Açıklama verisi boşsa hiçbir şey render edilmez.
	 *
	 * @param {ITableCaption} captionData Tablo açıklaması verisi.
	 * @returns {ReactNode | null} Render edilen açıklama veya null.
	 */
	const tableCaptionRenderer = (captionData: ITableCaption) => {
		if (!captionData.content) return null;
		return (
			<p data-testid="table-caption" className={"leading-10 opacity-80 text-center text-color-primary text-caption"}>
				{captionData.content}
			</p>
		);
	};

	// Eğer hem sütunlar hem de satırlar boşsa tablo oluşturulmaz.
	if (!rows && !columns) return null;

	return (
		<div>
			{/* Üst kısım açıklaması render edilir */}
			{tableOptions?.caption?.position === "top" && tableCaptionRenderer(tableOptions.caption)}

			{/* Tablo dış sarmalayıcı */}
			<div
				data-testid="table-wrapper"
				className={classNames("overflow-x-auto rounded-lg shadow-card", {
					"border border-custom-divider": tableOptions?.showBorders || typeof tableOptions?.showBorders === "undefined",
				})}
			>
				{/* Tablo ana yapısı */}
				<table
					data-testid="table"
					className={classNames("min-w-full bg-paper-card text-color-primary", {
						"divide-y divide-custom-divider": tableOptions?.showBorders || typeof tableOptions?.showBorders === "undefined",
						"table-auto": tableOptions?.layout === "auto" || !tableOptions?.layout,
						"table-fixed": tableOptions?.layout === "fixed",
						"cursor-pointer": tableOptions?.onRowClick,
					})}
				>
					{/* Tablo başlığı */}
					<thead data-testid="table-head" className="ltr:text-left rtl:text-right bg-action-hover">
						<tr
							data-testid="table-head-row"
							className={classNames({
								"divide-x divide-custom-divider": tableOptions?.showBorders || typeof tableOptions?.showBorders === "undefined",
							})}
						>
							{/* Sütun başlıkları */}
							{columns.map((column) => (
								<th
									style={{ width: `${100 / columns.length}% ` }}
									data-testid="table-head-cell"
									key={String(column.field)}
									className={classNames(
										"text-body1 font-normal whitespace-nowrap px-4 py-2",
										tableOptions?.headerHeight || "min-h-[2.7rem]",
									)}
								>
									{column.headerName}
								</th>
							))}
						</tr>
					</thead>

					{/* Tablo gövdesi */}
					<tbody
						data-testid="table-body"
						className={classNames("text-body2", {
							"divide-y divide-custom-divider": tableOptions?.showBorders || typeof tableOptions?.showBorders === "undefined",
						})}
					>
						{/* Eğer satır verisi varsa render edilir */}
						{rows?.length > 0 ? (
							rows.map((row, rowIndex) => (
								<tr
									onKeyDown={() => {}} // Todo: Klavye ile erişilebilirlik eklenecek
									onClick={() => handleRowClick(row)}
									data-testid="table-body-row"
									key={rowIndex.toString()}
									className={classNames({
										"divide-x divide-custom-divider":
											tableOptions?.showBorders || typeof tableOptions?.showBorders === "undefined",
										"even:bg-paper-level2": tableOptions?.stripedRows,
										"hover:bg-action-hover": tableOptions?.hoverHighlight,
									})}
								>
									{/* Hücreler render edilir */}
									{columns.map((column) => (
										<td
											style={{ width: `${100 / columns.length}%` }}
											data-testid="table-body-cell"
											key={column.field.toString()}
											className={classNames("px-4 py-2", tableOptions?.rowHeight || "min-h-[2.5rem]")}
										>
											{/* Hücre içeriği dinamik olarak oluşturulur */}
											{column.cellRenderer ? column.cellRenderer({ column, row }) : (row[column.field] as ReactNode)}
										</td>
									))}
								</tr>
							))
						) : (
							// Eğer veri yoksa boş mesajı render edilir
							<tr data-testid="table-body-row">
								<td
									colSpan={columns.length}
									data-testid="table-empty-message-cell"
									className={classNames("px-4 py-2 text-center", tableOptions?.rowHeight || "min-h-[2.5rem]")}
								>
									{tableOptions?.emptyStateMessage}
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			{/* Alt kısım açıklaması render edilir */}
			{tableOptions?.caption?.position === "bottom" && tableCaptionRenderer(tableOptions.caption)}
		</div>
	);
};
