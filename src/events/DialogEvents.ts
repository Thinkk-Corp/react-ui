import { emitter } from "@/plugins/Mitt.tsx";

export const dialogEvents = () => {
	const open = (id: string) => {
		emitter.emit("dialog.open", { id });
	};

	const close = (id: string) => {
		emitter.emit("dialog.close", { id });
	};

	const toggle = (id: string) => {
		emitter.emit("dialog.toggle", { id });
	};

	const closeAll = () => {
		emitter.emit("dialog.close.all");
	};

	return { open, closeAll, toggle, close };
};
