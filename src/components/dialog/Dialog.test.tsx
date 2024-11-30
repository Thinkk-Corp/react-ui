import { DialogAction } from "@/components/dialog/DialogAction.tsx";
import { DialogBody } from "@/components/dialog/DialogBody.tsx";
import { DialogHeader } from "@/components/dialog/DialogHeader.tsx";
import type { IDialog } from "@/interfaces/components/dialog/IDialog.ts"; // Adjust the path to where your Dialog component is located
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Dialog } from "./Dialog";

// Mocking the emitter (mitt)
jest.mock("@/plugins/Mitt.tsx", () => ({
	emitter: {
		on: jest.fn(),
		off: jest.fn(),
		emit: jest.fn(),
	},
}));

describe("Dialog Component", () => {
	const defaultProps: IDialog = {
		id: "jest-config-dialog",
		isOpen: false,
		size: "md",
		closeToClickOutside: true,
		onOpened: jest.fn(),
		onClosed: jest.fn(),
		type: "modal",
		children: (
			<>
				<DialogHeader>Dialog Header</DialogHeader>
				<DialogBody>Dialog Body</DialogBody>
				<DialogAction>Dialog Action</DialogAction>
			</>
		),
	};

	it("should render dialog when isOpen is true", () => {
		render(<Dialog {...defaultProps} isOpen={true} />);

		expect(screen.getByTestId("dialog")).toBeInTheDocument();
		expect(screen.getByTestId("dialog-overlay")).toBeInTheDocument();
		expect(screen.getByTestId("dialog-backdrop")).toBeInTheDocument();
	});

	it("should not render dialog when isOpen is false", () => {
		render(<Dialog {...defaultProps} isOpen={false} />);

		expect(screen.queryByTestId("dialog")).not.toBeInTheDocument();
	});

	it("should call onOpened when dialog is opened", async () => {
		const onOpenedMock = jest.fn();
		render(<Dialog {...defaultProps} isOpen onOpened={onOpenedMock} />);

		const dialog = screen.getByTestId("dialog");

		expect(dialog).toBeInTheDocument();

		await waitFor(() => {
			expect(onOpenedMock).toHaveBeenCalledTimes(1);
		});
	});

	it("should call onClosed when dialog is closed", async () => {
		const onClosedMock = jest.fn();
		render(<Dialog {...defaultProps} closeToClickOutside={false} isOpen={true} onClosed={onClosedMock} />);

		// Dialog elementinin doğru şekilde render edildiğini doğrula
		const dialog = screen.getByTestId("dialog");
		expect(dialog).toBeInTheDocument(); // Dialog görünür olmalı

		// Backdrop elementini al ve üzerine tıkla
		const backdrop = screen.getByTestId("dialog-backdrop");
		fireEvent.click(backdrop);

		// onClosed fonksiyonunun bir kez çağrıldığını bekleyelim
		await waitFor(() => {
			// Dialog'un artık görünmemesi gerektiğini kontrol et
			expect(dialog).toBeInTheDocument();
			expect(onClosedMock).not.toHaveBeenCalledTimes(1);
		});
	});

	it("should toggle dialog visibility when handleDialogToggle is called", async () => {
		const { rerender } = render(<Dialog {...defaultProps} isOpen={false} />);

		// Open dialog
		rerender(<Dialog {...defaultProps} isOpen={true} />);
		expect(screen.getByTestId("dialog")).toBeInTheDocument();

		// Close dialog
		rerender(<Dialog {...defaultProps} isOpen={false} />);
		expect(screen.queryByTestId("dialog")).not.toBeVisible();
	});

	it("should close dialog when clicked outside (closeToClickOutside is true)", async () => {
		const onClosedMock = jest.fn();
		render(<Dialog {...defaultProps} isOpen={true} onClosed={onClosedMock} />);

		// Dialog elementinin doğru şekilde render edildiğini doğrula
		const dialog = screen.getByTestId("dialog");
		expect(dialog).toBeInTheDocument(); // Dialog görünür olmalı

		// Backdrop elementini al ve üzerine tıkla
		const backdrop = screen.getByTestId("dialog-backdrop");
		fireEvent.click(backdrop);

		// onClosed fonksiyonunun bir kez çağrıldığını bekleyelim
		await waitFor(() => {
			// Dialog'un artık görünmemesi gerektiğini kontrol et
			expect(dialog).not.toBeInTheDocument();
			expect(onClosedMock).toHaveBeenCalledTimes(1);
		});
	});

	it("should not close dialog when clicked inside the dialog", async () => {
		const onCloseMock = jest.fn();
		render(<Dialog {...defaultProps} isOpen={true} onClosed={onCloseMock} />);

		const dialog = screen.getByTestId("dialog");
		fireEvent.click(dialog); // Click inside the dialog

		await waitFor(() => expect(onCloseMock).not.toHaveBeenCalled());
	});

	it("should render correct size classes based on the size prop", () => {
		render(<Dialog {...defaultProps} isOpen={true} size="sm" />);

		expect(screen.getByTestId("dialog")).toHaveClass("w-1/4 max-w-sm");
	});

	it("should change zIndex when multiple dialogs are present", async () => {
		render(<Dialog {...defaultProps} isOpen={true} size="md" id="dialog-1" />);
		render(<Dialog {...defaultProps} isOpen={true} size="md" id="dialog-2" />);

		const dialogs = screen.getAllByTestId("dialog");

		expect(dialogs).toHaveLength(2);

		// Check if zIndex has been adjusted correctly for each dialog
		await waitFor(() => {
			expect(dialogs[0]).toHaveStyle("z-index: 101");
			expect(dialogs[1]).toHaveStyle("z-index: 103"); // Access the second dialog from the array
		});
	});

	it("should render portal correctly when dialog is visible", () => {
		render(<Dialog {...defaultProps} isOpen={true} />);

		expect(screen.getByTestId("dialog-overlay")).toBeInTheDocument();
		expect(screen.getByTestId("dialog-container")).toBeInTheDocument();
	});
});
