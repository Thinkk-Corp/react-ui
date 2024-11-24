import { DialogAction } from "@/components/dialog/DialogAction.tsx";
import { DialogBody } from "@/components/dialog/DialogBody.tsx";
import { DialogHeader } from "@/components/dialog/DialogHeader.tsx";
import type { IDialog } from "@/interfaces/components/dialog/IDialog.ts";
import type { ISize } from "@/interfaces/types/IMetrics.ts";
import { emitter } from "@/plugins/Mitt.tsx";
import { mediaQueryUtil } from "@/utils/MediaQueryUtil.ts";
import { createMutationObserver } from "@/utils/ObserverUtil.ts";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { Children, type ReactElement, cloneElement, isValidElement, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// Boyutlar için şema tanımlanıyor
const sizeSchema: Record<ISize, string> = {
	sm: "w-1/4 max-w-sm",
	md: "w-1/2 max-w-md",
	lg: "w-3/4 max-w-lg",
	xl: "w-full max-w-xl",
	"2xl": "w-full max-w-2xl",
};

/**
 * dialog bileşeni, kullanıcı etkileşimine göre açılıp kapanabilen bir dialog penceresi sağlar.
 *
 * @param {string} id - dialog bileşeninin benzersiz kimliği.
 * @param {boolean} isOpen - dialog'ın açık mı kapalı mı olduğunu belirten durum.
 * @param {ISize} size - dialog'ın boyutunu belirler (default: "md").
 * @param {boolean} closeToClickOutside - dialog dışına tıklanarak kapanıp kapanamayacağını belirler.
 * @param {() => void} onOpened - dialog açıldığında çalışacak geri çağırma fonksiyonu.
 * @param {() => void} onClosed - dialog kapandığında çalışacak geri çağırma fonksiyonu.
 * @param type
 * @param {ReactNode} children - dialog içeriği (başlık, gövde, aksiyonlar vb.).
 *
 * @returns {JSX.Element} dialog bileşenini render eder.
 */
export const Dialog = ({
	id,
	isOpen,
	size = "md",
	closeToClickOutside = true,
	onOpened,
	onClosed,
	type = "modal",
	children,
}: IDialog): JSX.Element => {
	const [status, setStatus] = useState<boolean>(isOpen ?? false);
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const [zIndex, setZIndex] = useState<number>(100);
	const [isMdScreen, setIsMdScreen] = useState<boolean>(true);

	const dialogRef = useRef<HTMLDivElement>(null); // dialog elemanını referansla alıyoruz
	const overlayRef = useRef<HTMLDivElement>(null);

	// dialog alt bileşenleri (başlık, içerik, aksiyonlar)
	const childList = [DialogHeader, DialogBody, DialogAction];

	// dialog'u açmak için fonksiyon
	const handleDialogOpen = useCallback(() => {
		if (status) return;
		setStatus(true); // dialog'u aç
		onOpened?.(); // Eğer onOpened fonksiyonu sağlanmışsa çalıştır
	}, [onOpened, status]);

	// dialog'u kapatmak için fonksiyon
	const handleDialogClose = useCallback(() => {
		if (!status) return;
		setStatus(false); // dialog'u kapat
	}, [status]);

	// Modal açma/kapama durumunu togglemek için fonksiyon
	const handleDialogToggle = useCallback(() => {
		setStatus((prev) => !prev);
	}, []);

	const modalAnimateProps = {
		initial: { opacity: 0, scale: 0.9 },
		animate: { opacity: 1, scale: 1 },
		exit: { opacity: 0, scale: 0.9 },
	};

	const drawerAnimateProps = {
		initial: { x: "100%" },
		animate: { x: 0 },
		exit: { x: "100%" },
	};

	// isOpen prop'una göre dialog durumunu güncelleme
	useEffect(() => {
		if (isOpen !== undefined && isOpen !== status) {
			setStatus(isOpen); // isOpen değeri değişirse dialog durumunu güncelle
		}
	}, [isOpen]);

	useEffect(() => {
		if (status) {
			return onOpened?.();
		}
		onClosed?.();
	}, [status]);

	// Modal tetikleyicisi (dialog'u açmak için kullanılan buton)
	useEffect(() => {
		const attachListener = () => {
			const dialogTrigger = document.querySelector(`[data-toggle-id="${id}"][data-toggle-mode="dialog"]`);

			if (dialogTrigger) {
				dialogTrigger.addEventListener("click", handleDialogToggle);
				return () => dialogTrigger.removeEventListener("click", handleDialogToggle);
			}
			return null; // Eğer tetikleyici bulunamazsa null döndür
		};

		let detachListener = attachListener();

		const callback = (mutationList: MutationRecord[]) => {
			for (const mutation of mutationList) {
				if (mutation.type === "childList") {
					// İlk olarak eski listener'i kaldır
					if (detachListener) {
						detachListener();
					}
					// Sonrasında listener'i tekrar ekle
					detachListener = attachListener();
				}
			}
		};

		const { startObserving, disconnectObserver } = createMutationObserver({ callback });

		startObserving();

		// Mitt üzerinden gelen event'ler ile dialog kontrolü
		emitter.on("dialog.open", ({ id: emittedId }) => id === emittedId && handleDialogOpen());
		emitter.on("dialog.close", ({ id: emittedId }) => id === emittedId && handleDialogClose());
		emitter.on("dialog.toggle", ({ id: emittedId }) => id === emittedId && handleDialogToggle());
		emitter.on("dialog.close.all", handleDialogClose);

		return () => {
			disconnectObserver();
			if (detachListener) detachListener();
			emitter.off("dialog.open", ({ id: emittedId }) => id === emittedId && handleDialogOpen());
			emitter.off("dialog.close", ({ id: emittedId }) => id === emittedId && handleDialogClose());
			emitter.off("dialog.toggle", ({ id: emittedId }) => id === emittedId && handleDialogToggle());
			emitter.off("dialog.close.all", handleDialogClose);
		};
	}, [handleDialogOpen, handleDialogClose, handleDialogToggle, id]);

	// Modal dışına tıklanarak kapanmasını sağlamak için dışarıdan tıklama dinleyicisi
	useEffect(() => {
		if (!isVisible || !closeToClickOutside || !dialogRef.current || !overlayRef.current) return;

		const dialog = dialogRef.current;
		const overlay = overlayRef.current;

		const listener = (e: MouseEvent) => {
			if (dialog.contains(e.target as Node) || !overlay.contains(e.target as Node)) return; // Eğer dialog içinde bir yere tıklanırsa hiçbir şey yapma
			handleDialogClose(); // Modal dışına tıklanırsa dialog'u kapat
		};

		window.addEventListener("click", listener); // Dinleyiciyi ekle

		return () => {
			window.removeEventListener("click", listener); // Temizleme
		};
	}, [closeToClickOutside, handleDialogClose, isVisible]);

	useEffect(() => {
		setIsVisible(true);
	}, []);

	useEffect(() => {
		const handleScreenSize = () => {
			setIsMdScreen(mediaQueryUtil("md") as boolean);
		};

		handleScreenSize();

		window.addEventListener("resize", handleScreenSize);

		// Dinamik zIndex hesaplayan fonksyon
		const calculateZIndex = () => {
			if (!dialogRef.current) return;

			const dialogs = document.querySelectorAll("#dialog");
			const dialogIndex = Array.from(dialogs).findIndex((dialog) => dialog === dialogRef.current);

			// Avoid updating zIndex if this is the first dialog
			if (dialogIndex === 0) return;

			// Check the previous dialog zIndex if exists
			const previousDialog = dialogs[dialogIndex - 1];
			const prevZIndex = window.getComputedStyle(previousDialog).zIndex;

			if (prevZIndex && !Number.isNaN(Number(prevZIndex))) {
				setZIndex(Number(prevZIndex) + 1);
			}
		};

		// Dialog elementi sonradan render edildiğinden dolayı mutation ile takip ediyoruz
		const callback = (mutations: MutationRecord[]) => {
			for (const mutation of mutations) {
				if (mutation.type !== "childList") continue; // sadece childList türündeki değişiklikleri işleyin
				calculateZIndex();
			}
		};

		const { startObserving, disconnectObserver } = createMutationObserver({ callback });

		startObserving();

		return () => {
			disconnectObserver();
			window.removeEventListener("resize", handleScreenSize);
		};
	}, []);

	return (
		<>
			{isVisible &&
				createPortal(
					<AnimatePresence>
						{status && (
							<div data-testid={"dialog-overlay"} ref={overlayRef} style={{ zIndex }} className="fixed inset-0">
								<motion.div
									data-testid={"dialog-backdrop"}
									initial={{ opacity: 0 }}
									animate={{ opacity: 0.5 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 0.3 }}
									key={"backdrop"}
									style={{ zIndex }}
									className="absolute inset-0 bg-black"
									onAnimationComplete={() => {
										if (status) return;
										setIsVisible(false);
									}}
								/>
								<div
									data-testid={"dialog-container"}
									className={classNames("flex h-screen inset-0 absolute", {
										"items-center justify-center": type === "modal",
										"justify-end": type === "drawer",
									})}
								>
									<motion.div
										data-testid={"dialog"}
										id={"dialog"}
										{...(type === "modal" ? modalAnimateProps : drawerAnimateProps)}
										transition={{ duration: 0.3 }}
										key={"dialog"}
										ref={dialogRef}
										style={{ zIndex: zIndex + 1 }}
										className={classNames(
											"bg-paper-level2 overflow-hidden h-[90%] p-4 flex flex-col gap-8",
											{
												"rounded-lg": type === "modal",
												"w-full mx-4": type === "modal" && !isMdScreen,
												"w-full": type !== "modal" || isMdScreen,
											},
											isMdScreen && sizeSchema[size],
										)}
									>
										{Children.toArray(children).map((child) => {
											if (isValidElement(child) && childList.includes((child as ReactElement).type as any)) {
												return cloneElement(child as ReactElement, { handleDialogClose, type });
											}
											return null;
										})}
									</motion.div>
								</div>
							</div>
						)}
					</AnimatePresence>,
					document.body,
				)}
		</>
	);
};
