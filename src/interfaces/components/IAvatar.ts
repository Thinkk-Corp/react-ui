import type { IRounded, ISize } from "@/interfaces/IMetrics.ts";

export interface IAvatar {
	image: string;
	size?: ISize;
	rounded?: IRounded;
	alt: string;
	className?: string;
}
