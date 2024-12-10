import type { IStatus } from "@/interfaces/types/IMetrics";
import { useThemeStore } from "@/stores/ThemeStore";
import { toast } from "react-toastify";

export const toaster = ({ type = "success", message = "" }: { type: IStatus; message: string }) => {
	const theme = useThemeStore.getState().theme;
	toast[type](message, { theme });
};
