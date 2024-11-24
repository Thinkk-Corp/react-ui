export interface IObserverUtil {
	callback: (mutationsList: MutationRecord[], observer: MutationObserver) => void;
	config?: MutationObserverInit;
	target?: Node;
}
