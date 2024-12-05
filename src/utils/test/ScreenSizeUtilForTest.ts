export const screenSizeUtilForTest = (width: number) => {
	Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: width });
	window.dispatchEvent(new Event("resize")); // Ekran boyutu değişikliğini simüle etmek için resize eventi tetiklenir.
};
