import type { EventType } from "mitt";

export interface IModalEvent {
	id: string;
}

export interface IMittEvents extends Record<EventType, unknown> {
	"modal.open": IModalEvent;
	"modal.close": IModalEvent;
	"modal.toggle": IModalEvent;
	"modal.close.all": undefined;
	[key: string]: unknown;
}
