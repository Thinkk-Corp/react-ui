import { IconBox } from "@/components/icon-box/IconBox.tsx";
import type { ICustomHandle } from "@/interfaces/plugin/ICustomRouteObject.ts";
import { icons } from "@/plugins/Icons.tsx";
import { useEffect, useState } from "react";
import { Link, useMatches } from "react-router-dom";

export const Breadcrumb = () => {
	const matches = useMatches(); // Yönlendirme eşleşmelerini al

	const [crumbs, setCrumbs] = useState<ICustomHandle["crumb"][]>([]); // Breadcrumb öğeleri için durum

	useEffect(() => {
		// Eğer eşleşme yoksa, breadcrumb oluşturma işlemi yapılmaz
		if (!matches || matches.length === 0) return;

		// Geçerli bir breadcrumb öğesi olup olmadığını kontrol et
		const isValidCrumb = (crumb: ICustomHandle["crumb"]): crumb is NonNullable<ICustomHandle["crumb"]> => {
			return !!crumb?.title && !!(crumb?.title?.trim() && crumb?.path?.trim()) && Object.keys(crumb).length >= 2;
		};

		// Eşleşmelerden geçerli breadcrumb öğelerini filtrele ve listele
		const crumbsList = matches
			.map((match) => match.handle as ICustomHandle | undefined)
			.filter((handle): handle is ICustomHandle => !!handle?.crumb && isValidCrumb(handle.crumb))
			.map((handle) => handle.crumb);

		if (crumbsList.length > 0) setCrumbs(crumbsList); // Breadcrumb öğelerini durum olarak ayarla
	}, [matches]);

	return (
		<nav data-testid={"breadcrumb"} aria-label="Breadcrumb">
			<ol className="flex items-center gap-1 text-color-primary">
				{crumbs.length > 0 &&
					crumbs.map((crumb, index) => (
						<li key={index.toString()} data-testid={"breadcrumb-item"}>
							<div className={"flex gap-1 transition items-center opacity-70 hover:opacity-100"}>
								{crumb?.icon && (
									<IconBox data-testid={"breadcrumb-icon"} size={"sm"}>
										{crumb?.icon}
									</IconBox>
								)}
								<Link data-testid={"breadcrumb-title"} to={crumb?.path || ""} className="block">
									<span className={"text-body2"}>{crumb?.title}</span>
								</Link>
								{index !== crumbs.length - 1 && (
									<IconBox data-testid={"breadcrumb-arrow"} size={"sm"}>
										{icons.outline.chevron_right}
									</IconBox>
								)}
							</div>
						</li>
					))}
			</ol>
		</nav>
	);
};
