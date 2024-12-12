import { CardAction } from "@/components/card/action/CardAction.tsx";
import { CardBody } from "@/components/card/body/CardBody.tsx";
import { CardHeader } from "@/components/card/header/CardHeader.tsx";
import type { ICard } from "@/interfaces/components/card/ICard.ts";
import { useThemeStore } from "@/stores/ThemeStore.ts";
import classNames from "classnames";
import { Children, type ReactElement, cloneElement, isValidElement } from "react";

/**
 * Card bileşeni
 *
 * Kart benzeri UI elemanlarını düzenlemek için esnek ve stillendirilmiş bir kapsayıcı sağlar.
 * Farklı boyutları, özel stilleri ve tema desteğini destekler.
 *
 * @param {ICard} props - Card bileşenine aktarılan özellikler.
 * @param {string} [props.size="md"] - Kartın boyutu. (Örneğin: sm, md, lg)
 * @param {ReactNode} props.children - Kartın içinde yer alacak alt bileşenler.
 * @param {object} [props.styleClass] - Kart ve alt bileşenler için özelleştirilmiş stil seçenekleri.
 * @param {string} [props.className] - Ekstra CSS sınıfları.
 * @returns {JSX.Element} - Card bileşeni JSX çıktısı.
 */
export const Card = ({ size = "md", children, styleClass, className = "" }: ICard): JSX.Element => {
	const allowedComponents = [CardHeader, CardBody, CardAction];

	const theme = useThemeStore((state) => state.theme);

	// Kartın farklı boyutları için genişlik değerleri.
	const sizeScheme: Record<string, string> = {
		sm: "w-[16rem]", // 256px
		md: "w-[20rem]", // 320px
		lg: "w-[24rem]", // 384px
		xl: "w-[28rem]", // 448px
		"2xl": "w-[32rem]", // 512px
		full: "w-full", // Tam genişlik
	};

	// Kartın genel stillerini birleştirir.
	const cardStyle = classNames(
		{
			[`flex flex-col gap-8 p-5 bg-paper-card border border-custom-card-border ${theme === "light" && "shadow-card"} rounded-lg ${className}`]:
				!styleClass?.card || styleClass?.card?.defaultStyleActive,
		},
		sizeScheme[size],
		styleClass?.card?.customStyle,
	);

	return (
		<div data-testid="card" className={cardStyle}>
			{Children.toArray(children).map((child) => {
				if (!isValidElement(child)) return;

				// Alt bileşenin izin verilen bileşenlerden biri olup olmadığını kontrol eder.
				const isAllowedComponent = allowedComponents.some((Component) => child.type === Component);

				if (!isAllowedComponent) return null;

				// Her alt bileşen için özel stilleri döndürür.
				const customStyle = () => {
					switch (child.type) {
						case CardHeader:
							return styleClass?.cardHeader;
						case CardBody:
							return styleClass?.cardBody;
						case CardAction:
							return styleClass?.cardAction;
						default:
							return undefined;
					}
				};

				// Alt bileşeni klonlayarak özel stil uygular.
				return cloneElement(child as ReactElement, { styleClass: customStyle() });
			})}
		</div>
	);
};
