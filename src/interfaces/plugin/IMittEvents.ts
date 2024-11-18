import type { EventType } from "mitt";

export interface IDialogEvent {
	id: string;
}

export interface IMittEvents extends Record<EventType, unknown> {
	"dialog.open": IDialogEvent;
	"dialog.close": IDialogEvent;
	"dialog.toggle": IDialogEvent;
	"dialog.close.all": undefined;
	[key: string]: unknown;
}
