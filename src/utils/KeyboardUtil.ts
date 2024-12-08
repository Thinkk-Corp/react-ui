import type React from "react";

export const keyboardUtil = ({
	e,
	key,
	callback,
}: { e: React.KeyboardEvent<any>; key: string | string[]; callback: () => void }) => {
	if ((Array.isArray(key) && !key.includes(e.key)) || e.key !== key) return;
	callback();
};
