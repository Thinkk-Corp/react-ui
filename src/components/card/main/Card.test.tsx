import { CardAction } from "@/components/card/action/CardAction";
import { CardBody } from "@/components/card/body/CardBody";
import { CardHeader } from "@/components/card/header/CardHeader";
import { Card } from "@/components/card/main/Card.tsx";
import { useThemeStore } from "@/stores/ThemeStore";
import { act, render, screen } from "@testing-library/react";

const toggleTheme = useThemeStore.getState().toggleTheme;

describe("Card Component", () => {
	beforeEach(() => {
		act(() => toggleTheme());
	});

	test("renders Card component with default styles and size", () => {
		render(
			<Card>
				<CardHeader>Header Content</CardHeader>
				<CardBody>Body Content</CardBody>
				<CardAction>Action Content</CardAction>
			</Card>,
		);

		const card = screen.getByTestId("card");
		expect(card).toHaveClass(
			"flex",
			"flex-col",
			"gap-8",
			"p-5",
			"bg-paper-card",
			"border",
			"border-custom-card-border",
			"shadow-card",
			"rounded-lg",
		);
		expect(card).toHaveClass("w-[20rem]"); // Default size is "md"
	});

	test("renders children and filters out invalid components", () => {
		render(
			<Card>
				<CardHeader>Header Content</CardHeader>
				<CardBody>Body Content</CardBody>
				<div>Invalid Component</div>
				<CardAction>Action Content</CardAction>
			</Card>,
		);

		expect(screen.getByText("Header Content")).toBeInTheDocument();
		expect(screen.getByText("Body Content")).toBeInTheDocument();
		expect(screen.queryByText("Invalid Component")).not.toBeInTheDocument();
		expect(screen.getByText("Action Content")).toBeInTheDocument();
	});

	test("applies custom size correctly", () => {
		render(<Card size="lg">Card Content</Card>);
		const card = screen.getByTestId("card");
		expect(card).toHaveClass("w-[24rem]");
	});

	test("applies custom styles for Card and its child components", () => {
		render(
			<Card
				styleClass={{
					card: { customStyle: "custom-card-class" },
					cardHeader: { customStyle: "custom-header-class" },
					cardBody: { customStyle: "custom-body-class" },
					cardAction: { customStyle: "custom-action-class" },
				}}
			>
				<CardHeader>Header</CardHeader>
				<CardBody>Body</CardBody>
				<CardAction>Action</CardAction>
			</Card>,
		);

		const card = screen.getByTestId("card");
		expect(card).toHaveClass("custom-card-class");

		const header = screen.getByTestId("card-header");
		expect(header).toHaveClass("custom-header-class");

		const body = screen.getByTestId("card-body");
		expect(body).toHaveClass("custom-body-class");

		const action = screen.getByTestId("card-action");
		expect(action).toHaveClass("custom-action-class");
	});

	test("renders correctly when theme is 'light'", () => {
		render(
			<Card>
				<CardHeader>Light Theme Header</CardHeader>
			</Card>,
		);

		const card = screen.getByTestId("card");
		expect(card).toHaveClass("shadow-card");
	});
});
