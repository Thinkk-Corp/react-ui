import type { ReactNode } from "react";

export interface ISidebarMenu {
	/** Menüde görüntülenecek metin */
	text: string;

	/** Menüdeki ikon, ReactNode olarak kabul edilerek esneklik sağlanır */
	icon?: ReactNode;

	/** Menü öğesinin bir etiket olup olmadığını belirtir */
	isLabel?: boolean;

	/** Menü öğesinin tıklama eylemi; string bir rota veya işlev olabilir */
	action?: string | (() => void);

	/** Alt menü öğeleri için çocuk öğeler */
	children?: ISidebarMenu[];
}
