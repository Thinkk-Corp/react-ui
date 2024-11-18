import { emitter } from "@/plugins/Mitt.tsx";

export const modalEvents = () => {
	const open = (id: string) => {
		emitter.emit("modal.open", { id });
	};

	const close = (id: string) => {
		emitter.emit("modal.close", { id });
	};

	const toggle = (id: string) => {
		emitter.emit("modal.toggle", { id });
	};

	const closeAll = () => {
		emitter.emit("modal.close.all");
	};

	return { open, closeAll, toggle, close };
};
