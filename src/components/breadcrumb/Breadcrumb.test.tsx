import { icons } from "@/plugins/Icons.tsx";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useMatches } from "react-router-dom";
import { Breadcrumb } from "./Breadcrumb";

// Mock match verisi
const mockMatches = [
	{
		handle: {
			crumb: {
				title: "Home", // Başlık
				path: "/home", // Yönlendirme yolu
				icon: icons.outline.home, // İkon
			},
		},
	},
	{
		handle: {
			crumb: {
				title: "Dashboard", // Başlık
				path: "/dashboard", // Yönlendirme yolu
				icon: icons.outline.x, // İkon
			},
		},
	},
];

// Test için Mock Router render fonksiyonu
const renderMockRouter = () =>
	render(
		<MemoryRouter initialEntries={["/"]}>
			<Routes>
				<Route
					path="/"
					element={
						<div>
							<Breadcrumb /> {/* Breadcrumb bileşeni */}
							Root {/* Ana sayfa */}
						</div>
					}
				/>
				<Route
					path="/home"
					element={
						<div>
							{" "}
							<Breadcrumb /> Home Page {/* Home sayfası */}
						</div>
					}
				/>
			</Routes>
		</MemoryRouter>,
	);

describe("Breadcrumb Component", () => {
	it("should render breadcrumb items correctly when matches are provided", () => {
		// useMatches fonksiyonunun dönüş değerini mock'ladık
		(useMatches as jest.Mock).mockReturnValue(mockMatches);

		renderMockRouter();

		// Breadcrumb öğelerinin doğru şekilde render edildiğini kontrol et
		const breadcrumbItems = screen.getAllByTestId("breadcrumb-item");
		expect(breadcrumbItems).toHaveLength(2);

		// Breadcrumb başlıklarının ve bağlantılarının doğru şekilde render edildiğini kontrol et
		expect(screen.getByText("Home")).toBeInTheDocument();
		expect(screen.getByText("Dashboard")).toBeInTheDocument();

		const crumbIcons = screen.getAllByTestId("breadcrumb-icon");

		// Breadcrumb ikonlarının doğru şekilde render edildiğini kontrol et
		expect(crumbIcons).toHaveLength(2);
		expect(crumbIcons[0]).toBeInTheDocument();
		expect(crumbIcons[1]).toBeInTheDocument();

		// Breadcrumb öğeleri arasındaki okları kontrol et
		const arrows = screen.getAllByTestId("breadcrumb-arrow");
		expect(arrows).toHaveLength(1); // Home ve Dashboard arasında bir ok olmalı
	});

	it("should handle an empty breadcrumb state", () => {
		// useMatches fonksiyonunun boş dönmesi sağlanıyor
		(useMatches as jest.Mock).mockReturnValue([]);

		renderMockRouter();

		// Breadcrumb öğelerinin render edilmediğini kontrol et
		const breadcrumbItems = screen.queryAllByTestId("breadcrumb-item");
		expect(breadcrumbItems).toHaveLength(0);
	});

	it("should navigate to the correct path when breadcrumb is clicked", async () => {
		// Yalnızca ilk breadcrumb öğesini mock'ladık
		(useMatches as jest.Mock).mockReturnValue([mockMatches[0]]);

		renderMockRouter();

		const homeLink = screen.getByText("Home");

		fireEvent.click(homeLink);

		// Home sayfasına yönlendirilip yönlendirilmediğini kontrol et
		expect(screen.getByText("Home Page")).toBeInTheDocument();
	});
});
