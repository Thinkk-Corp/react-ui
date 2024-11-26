import { SidebarItem } from "@/components/sidebar/SidebarItem.tsx";
import { icons } from "@/plugins/Icons.tsx";
import { setupMockUseUIStore } from "@/test/SetupMockUseUIStore.ts";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

const renderSidebarItem = (isChild?: boolean) => {
	render(
		<MemoryRouter>
			<SidebarItem menu={{ icon: icons.outline.x, text: "test", action: "" }} isChild={isChild} />
		</MemoryRouter>,
	);
};

describe("SidebarItem", () => {
	beforeEach(() => {
		setupMockUseUIStore({ sidebarCollapsed: { isLocked: true, status: false } });
	});

	it("should rendered correctly", () => {
		renderSidebarItem();

		// Sidebar item container render görünürmü?
		const sidebarItemContainer = screen.getByTestId("sidebar-item-container");
		expect(sidebarItemContainer).toBeVisible();

		//Sidebar item child dt görünürmü
		const sidebarItemChildDot = screen.getByTestId("sidebar-item-child-dot");
		console.log(window.getComputedStyle(sidebarItemChildDot));
		expect(sidebarItemChildDot).not.toBeInTheDocument();
	});
});
