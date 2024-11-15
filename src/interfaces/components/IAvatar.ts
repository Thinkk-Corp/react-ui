import type { IRounded, ISize } from "@/interfaces/types/IMetrics.ts";

export interface IAvatar {
	image: string;
	size?: ISize;
	rounded?: IRounded;
	alt: string;
	className?: string;
}
