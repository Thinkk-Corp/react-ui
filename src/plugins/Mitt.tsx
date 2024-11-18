import type { IMittEvents } from "@/interfaces/plugin/IMittEvents.ts";
import mitt from "mitt";

export const emitter = mitt<IMittEvents>();
