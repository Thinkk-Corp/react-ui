import type { ISplitLayout } from "@/interfaces/components/layouts/ISplitLayout.ts";
import { useThemeStore } from "@/stores/ThemeStore.ts";
import classNames from "classnames";
import { Outlet } from "react-router-dom";

export const SplitLayout = ({ image, title, subtitle, direction = "normal" }: ISplitLayout) => {
	const isReversed = direction === "reverse";
	const theme = useThemeStore((s) => s.theme);
	return (
		<div
			data-testid={"split-layout"}
			className={classNames("flex flex-col lg:flex-row items-center bg-fixed bg-cover bg-center w-screen h-full lg:h-screen", {
				"bg-split-layout-light": theme === "light",
				"bg-split-layout-dark": theme === "dark",
			})}
		>
			{/* Sol taraf - Görsel */}
			<div
				data-testid={"left-container"}
				className={`flex-1 flex h-full items-center p-10 justify-center ${isReversed ? "order-2" : "order-1"}`}
			>
				<div className={"flex text-center flex-col gap-4 items-center"}>
					{image && <img data-testid={"image"} src={image} alt={title} className="object-cover w-72 h-72 md:w-96 md:h-96" />}
					<h3 data-testid={"title"} className="text-h1 max-w-[30rem] text-color-primary">
						{title}
					</h3>
					<p data-testid={"subtitle"} className="w-auto max-w-[30rem] text-wrap break-all text-subtitle2 opacity-70">
						{subtitle}
					</p>
				</div>
			</div>

			{/* Sağ taraf - Başlık ve Alt Başlık */}
			<div
				data-testid={"content-container"}
				className={`w-full lg:w-[42rem] h-[42rem] lg:h-full p-10 ${isReversed ? "order-1" : "order-2"}`}
			>
				<div className="h-full p-4 lg:p-8 w-full overflow-y-auto bg-paper-default rounded-xl">
					<Outlet />
				</div>
			</div>
		</div>
	);
};
