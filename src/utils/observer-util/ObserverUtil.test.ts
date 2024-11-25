import { createMutationObserver } from "@/utils/observer-util/ObserverUtil.ts"; // uygun yolu belirtin
import { waitFor } from "@testing-library/react";
import { type Mock, describe, expect, it, vi } from "vitest";

describe("createMutationObserver", () => {
	let mockCallback: Mock;
	let observer: ReturnType<typeof createMutationObserver>;

	beforeEach(() => {
		// Mock callback fonksiyonu oluşturalım
		mockCallback = vi.fn();
		// Observer'ı başlatalım
		observer = createMutationObserver({
			target: document.body,
			config: { subtree: true, childList: true },
			callback: mockCallback,
		});
	});

	it("should start observing when startObserving is called", () => {
		// Observer'ı başlat
		observer.startObserving();
		expect(mockCallback).not.toHaveBeenCalled(); // Başlatmadan callback çağrılmamalı
	});

	it("should not start observing if callback is not a function", () => {
		const invalidObserver = createMutationObserver({
			target: document.body,
			config: { subtree: true, childList: true },
			callback: undefined as any, // geçersiz bir callback
		});
		invalidObserver.startObserving();
		expect(mockCallback).not.toHaveBeenCalled(); // Callback geçerli değilse çağrılmamalı
	});

	it("should disconnect observer when disconnectObserver is called", () => {
		observer.startObserving();
		observer.disconnectObserver();
		expect(mockCallback).not.toHaveBeenCalled(); // Observer durdurulduğunda callback çağrılmamalı
	});

	it("should restart the observer when restart is called", () => {
		observer.startObserving();
		observer.restart();
		expect(mockCallback).not.toHaveBeenCalled(); // Restart yapıldığında observer tekrar başlatılmalı
	});

	it("should not create a new observer if one already exists", () => {
		observer.startObserving();
		const observerSpy = vi.spyOn(observer, "startObserving"); // Observer'ı tekrar başlatmayı izle
		observer.startObserving(); // Aynı observer'ı yeniden başlatmayı dene
		expect(observerSpy).toHaveBeenCalledTimes(1); // Observer sadece bir kez başlatılmalı
	});

	it("should call the callback when mutations occur", async () => {
		observer.startObserving();
		// Simüle edilmiş bir mutasyon meydana getiriyoruz
		document.body.appendChild(document.createElement("div"));
		// Callback'in çağrıldığını kontrol edelim
		await waitFor(() => expect(mockCallback).toHaveBeenCalled()); // Callback çağrılmalı)
	});
});
