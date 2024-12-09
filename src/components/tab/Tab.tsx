import type { ITab } from "@/interfaces/components/ITab";
import classNames from "classnames";
import { useState, useEffect } from "react";
import type { ISizeSchema } from "@/components/form/inputs/toggle/Toggle";
import { keyboardUtil } from "@/utils/KeyboardUtil";

export const Tab = ({ tabs, size = "md", className = "", selectedTab, onChange }: ITab) => {
	const [internalSelectedTab, setInternalSelectedTab] = useState<string>(selectedTab);

	const sizeSchema: ISizeSchema = {
		sm: "py-1 px-2 text-caption",
		md: "py-2 px-4 text-body2",
		lg: "py-3 px-6 text-body2",
		xl: "py-4 px-8 text-body1",
		"2xl": "py-5 px-10 text-body1",
	};

	useEffect(() => {
		// Sync internalSelectedTab with selectedTab prop if it changes
		if (selectedTab !== internalSelectedTab) {
			setInternalSelectedTab(selectedTab);
		}
	}, [selectedTab]);

	const handleTabClick = (selectedTab: string) => {
		setInternalSelectedTab(selectedTab);
		onChange?.(selectedTab);
	};

	const isTabActive = (tabValue: string) => {
		return internalSelectedTab === tabValue;
	};

	const handleKeyDown = (key: "ArrowLeft" | "ArrowRight") => {
		const getTabIndex = tabs.findIndex((tab) => tab.value === internalSelectedTab);

		if (key === "ArrowLeft" && getTabIndex > 0) {
			setInternalSelectedTab(tabs[getTabIndex - 1].value);
		}
		if (key === "ArrowRight" && getTabIndex < tabs.length - 1) {
			setInternalSelectedTab(tabs[getTabIndex + 1].value);
		}
	};

	return (
		<nav className={classNames("flex gap-6 overflow-x-hidden overflow-y-auto", className)} aria-label="Tabs" data-testid="tab">
			{tabs?.map((tab, index) => (
				<button
					type="button"
					key={index.toString()}
					onKeyDown={(e) => {
						keyboardUtil({ e, key: "ArrowLeft", callback: () => handleKeyDown("ArrowLeft") });
						keyboardUtil({ e, key: "ArrowRight", callback: () => handleKeyDown("ArrowRight") });
					}}
					data-testid="tab-item"
					data-activated={isTabActive(tab.value)}
					onClick={() => handleTabClick(tab.value)}
					className={classNames(
						"shrink-0 rounded-lg bg-transparent opacity-80 text-color-primary cursor-pointer",
						"data-[activated='true']:text-white",
						"data-[activated='true']:bg-primary-main",
						"data-[activated='false']:hover:bg-action-hover",
						"data-[activated='false']:hover:opacity-100",
						"data-[activated='true']:opacity-100",
						sizeSchema[size],
					)}
				>
					{tab.label}
				</button>
			))}
		</nav>
	);
};
