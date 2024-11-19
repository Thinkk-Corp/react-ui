import { DialogAction } from "@/components/overlays/dialog/DialogAction";
import { DialogBody } from "@/components/overlays/dialog/DialogBody";
import { DialogHeader } from "@/components/overlays/dialog/DialogHeader";
import type { IDialog } from "@/interfaces/components/overlays/dialog/IDialog";
import type { ISize } from "@/interfaces/types/IMetrics.ts";
import { emitter } from "@/plugins/Mitt.tsx";
import { mediaQueryUtil } from "@/utils/MediaQueryUtil";
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
 * @param {boolean} onCloseToClickOutside - dialog dışına tıklanarak kapanıp kapanamayacağını belirler.
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
	onCloseToClickOutside = true,
	onOpened,
	onClosed,
	type = "modal",
	children,
}: IDialog): JSX.Element => {
	const [status, setStatus] = useState<boolean>(false); // dialog'ın açılma durumu
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const [zIndex, setZIndex] = useState<number>(100);
	const [isMdScreen, setIsMdScreen] = useState<boolean>(true);

	const dialogRef = useRef<HTMLDivElement>(null); // dialog elemanını referansla alıyoruz
	const overlayRef = useRef<HTMLDivElement>(null);

	// dialog alt bileşenleri (başlık, içerik, aksiyonlar)
	const childList = [DialogHeader, DialogBody, DialogAction];

	// dialog'u açmak için fonksiyon
	const handleDialogOpen = useCallback(() => {
		setStatus(true); // dialog'u aç
		onOpened?.(); // Eğer onOpened fonksiyonu sağlanmışsa çalıştır
	}, [onOpened]);

	// dialog'u kapatmak için fonksiyon
	const handleDialogClose = useCallback(() => {
		setStatus(false); // dialog'u kapat
		onClosed?.(); // Eğer onClosed fonksiyonu sağlanmışsa çalıştır
	}, [onClosed]);

	// Modal açma/kapama durumunu togglemek için fonksiyon
	const handleDialogToggle = useCallback(() => {
		setStatus((prevStatus) => {
			const newStatus = !prevStatus;
			if (newStatus) {
				onOpened?.(); // dialog açıldıysa onOpened fonksiyonunu çağır
			} else {
				onClosed?.(); // dialog kapandıysa onClosed fonksiyonunu çağır
			}
			return newStatus;
		});
	}, [onOpened, onClosed]);

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
	}, [isOpen, status]);

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

		const config = { childList: true, subtree: true };

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

		const observer = new MutationObserver(callback);

		observer.observe(document.body, config);

		// Mitt üzerinden gelen event'ler ile dialog kontrolü
		emitter.on("dialog.open", ({ id: emittedId }) => id === emittedId && handleDialogOpen());
		emitter.on("dialog.close", ({ id: emittedId }) => id === emittedId && handleDialogClose());
		emitter.on("dialog.toggle", ({ id: emittedId }) => id === emittedId && handleDialogToggle());
		emitter.on("dialog.close.all", handleDialogClose);

		return () => {
			observer.disconnect();
			if (detachListener) detachListener();
			emitter.off("dialog.open", ({ id: emittedId }) => id === emittedId && handleDialogOpen());
			emitter.off("dialog.close", ({ id: emittedId }) => id === emittedId && handleDialogClose());
			emitter.off("dialog.toggle", ({ id: emittedId }) => id === emittedId && handleDialogToggle());
			emitter.off("dialog.close.all", handleDialogClose);
		};
	}, [handleDialogOpen, handleDialogClose, handleDialogToggle, id]);

	// Modal dışına tıklanarak kapanmasını sağlamak için dışarıdan tıklama dinleyicisi
	useEffect(() => {
		if (!isVisible || !onCloseToClickOutside || !dialogRef.current || !overlayRef.current) return;

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
	}, [onCloseToClickOutside, handleDialogClose, isVisible]);

	useEffect(() => {
		// Modal kapandığında animasyonu tekrar başlat
		if (!status) {
			setTimeout(() => {
				setIsVisible(false);
			}, 300);
			return;
		}
		setIsVisible(true);
	}, [status]);

	useEffect(() => {
		const handleScreenSize = () => {
			setIsMdScreen(mediaQueryUtil("md") as boolean);
		};

		handleScreenSize();

		window.addEventListener("resize", handleScreenSize);

		if (!dialogRef.current) return;
		const dialogs = document.querySelectorAll("#dialog");
		const dialogIndex = Array.from(dialogs).findIndex((dialog) => dialog === dialogRef.current);
		if (dialogIndex === 0) return;
		setZIndex((prev) => prev + dialogIndex * 10);

		return () => {
			window.removeEventListener("resize", handleScreenSize);
		};
	}, []);

	return (
		<>
			{isVisible &&
				createPortal(
					<AnimatePresence>
						{status && (
							<div id="dialog-overlay" ref={overlayRef} style={{ zIndex }} className="fixed inset-0">
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 0.5 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 0.3 }}
									key={"backdrop"}
									style={{ zIndex }}
									id="backdrop"
									className="absolute inset-0 bg-black"
								/>
								<div
									className={classNames("flex h-screen inset-0 absolute", {
										"items-center justify-center": type === "modal",
										"justify-end": type === "drawer",
									})}
								>
									<motion.div
										{...(type === "modal" ? modalAnimateProps : drawerAnimateProps)}
										transition={{ duration: 0.3 }}
										key={"dialog"}
										ref={dialogRef}
										style={{ zIndex: zIndex + 1 }}
										id="dialog"
										className={classNames(
											"bg-paper-level2 p-4 flex flex-col gap-8",
											{ "rounded-lg": type === "modal" },
											isMdScreen ? sizeSchema[size] : type === "modal" ? "w-full mx-4" : "w-full ",
										)}
									>
										{Children.toArray(children).map((child) => {
											if (isValidElement(child) && childList.includes((child as ReactElement).type as any)) {
												return cloneElement(child as ReactElement, { setStatus, type });
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
