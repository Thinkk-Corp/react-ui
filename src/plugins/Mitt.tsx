import type { IMittEvents } from "@/interfaces/plugins/IMittEvents";
import mitt from "mitt";

export const emitter = mitt<IMittEvents>();
