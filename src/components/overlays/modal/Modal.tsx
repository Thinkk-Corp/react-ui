import { ModalAction } from "@/components/overlays/modal/ModalAction.tsx";
import { ModalBody } from "@/components/overlays/modal/ModalBody.tsx";
import { ModalHeader } from "@/components/overlays/modal/ModalHeader.tsx";
import type { IModal } from "@/interfaces/components/overlays/modal/IModal.ts";
import type { ISize } from "@/interfaces/types/IMetrics.ts";
import { emitter } from "@/plugins/Mitt.tsx";
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
 * Modal bileşeni, kullanıcı etkileşimine göre açılıp kapanabilen bir modal penceresi sağlar.
 *
 * @param {string} id - Modal bileşeninin benzersiz kimliği.
 * @param {boolean} isOpen - Modal'ın açık mı kapalı mı olduğunu belirten durum.
 * @param {ISize} size - Modal'ın boyutunu belirler (default: "md").
 * @param {boolean} onCloseToClickOutside - Modal dışına tıklanarak kapanıp kapanamayacağını belirler.
 * @param {() => void} onOpened - Modal açıldığında çalışacak geri çağırma fonksiyonu.
 * @param {() => void} onClosed - Modal kapandığında çalışacak geri çağırma fonksiyonu.
 * @param {ReactNode} children - Modal içeriği (başlık, gövde, aksiyonlar vb.).
 *
 * @returns {JSX.Element} Modal bileşenini render eder.
 */
export const Modal = ({
	id,
	isOpen,
	size = "md",
	onCloseToClickOutside = true,
	onOpened,
	onClosed,
	children,
}: IModal): JSX.Element => {
	const [status, setStatus] = useState<boolean>(false); // Modal'ın açılma durumu
	const [isVisible, setIsVisible] = useState<boolean>(false);

	const modalRef = useRef<HTMLDivElement>(null); // Modal elemanını referansla alıyoruz

	// Modal alt bileşenleri (başlık, içerik, aksiyonlar)
	const childList = [ModalHeader, ModalBody, ModalAction];

	// Modal'ı açmak için fonksiyon
	const handleModalOpen = useCallback(() => {
		setStatus(true); // Modal'ı aç
		onOpened?.(); // Eğer onOpened fonksiyonu sağlanmışsa çalıştır
	}, [onOpened]);

	// Modal'ı kapatmak için fonksiyon
	const handleModalClose = useCallback(() => {
		setStatus(false); // Modal'ı kapat
		onClosed?.(); // Eğer onClosed fonksiyonu sağlanmışsa çalıştır
	}, [onClosed]);

	// Modal açma/kapama durumunu togglemek için fonksiyon
	const handleModalToggle = useCallback(() => {
		setStatus((prevStatus) => {
			const newStatus = !prevStatus;
			if (newStatus) {
				onOpened?.(); // Modal açıldıysa onOpened fonksiyonunu çağır
			} else {
				onClosed?.(); // Modal kapandıysa onClosed fonksiyonunu çağır
			}
			return newStatus;
		});
	}, [onOpened, onClosed]);

	// isOpen prop'una göre modal durumunu güncelleme
	useEffect(() => {
		if (isOpen !== undefined && isOpen !== status) {
			setStatus(isOpen); // isOpen değeri değişirse modal durumunu güncelle
		}
	}, [isOpen, status]);

	// Modal tetikleyicisi (modal'ı açmak için kullanılan buton)
	useEffect(() => {
		const modalTrigger = document.querySelector(`[data-toggle-id="${id}"][data-toggle-mode="modal"]`);
		const toggleModal = handleModalToggle;

		if (modalTrigger) {
			modalTrigger.addEventListener("click", toggleModal); // Tetikleyiciye tıklanırsa modal'ı toggle et
			return () => modalTrigger.removeEventListener("click", toggleModal); // Temizleme
		}

		// Mitt üzerinden gelen event'ler ile modal kontrolü
		emitter.on("modal.open", ({ id: emittedId }) => id === emittedId && handleModalOpen());
		emitter.on("modal.close", ({ id: emittedId }) => id === emittedId && handleModalClose());
		emitter.on("modal.toggle", ({ id: emittedId }) => id === emittedId && handleModalToggle());
		emitter.on("modal.close.all", handleModalClose);

		return () => {
			emitter.off("modal.open", ({ id: emittedId }) => id === emittedId && handleModalOpen());
			emitter.off("modal.close", ({ id: emittedId }) => id === emittedId && handleModalClose());
			emitter.off("modal.toggle", ({ id: emittedId }) => id === emittedId && handleModalToggle());
			emitter.off("modal.close.all", handleModalClose);
		};
	}, [handleModalOpen, handleModalClose, handleModalToggle, id]);

	// Modal dışına tıklanarak kapanmasını sağlamak için dışarıdan tıklama dinleyicisi
	useEffect(() => {
		if (!isVisible || !onCloseToClickOutside || !modalRef.current) return;

		const modal = modalRef.current;

		const listener = (e: MouseEvent) => {
			if (modal.contains(e.target as Node)) return; // Eğer modal içinde bir yere tıklanırsa hiçbir şey yapma
			handleModalClose(); // Modal dışına tıklanırsa modal'ı kapat
		};

		window.addEventListener("click", listener); // Dinleyiciyi ekle

		return () => {
			window.removeEventListener("click", listener); // Temizleme
		};
	}, [onCloseToClickOutside, handleModalClose, isVisible]);

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

	return (
		<>
			{isVisible &&
				createPortal(
					<AnimatePresence>
						{status && (
							<div id="modal-overlay" className="fixed inset-0">
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 0.5 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 0.3 }}
									key={"backdrop"}
									style={{ zIndex: 190 }}
									className="absolute inset-0 bg-black"
								/>
								<div className="flex items-center justify-center inset-0 absolute">
									<motion.div
										initial={{ opacity: 0, scale: 0.9 }}
										animate={{ opacity: 1, scale: 1 }}
										exit={{ opacity: 0, scale: 0.9 }}
										transition={{ duration: 0.3 }}
										key={"modal"}
										ref={modalRef}
										style={{ zIndex: 200 }}
										className={classNames("bg-paper-level2 rounded-lg", sizeSchema[size])}
									>
										{Children.toArray(children).map((child) => {
											if (isValidElement(child) && childList.includes((child as ReactElement).type as any)) {
												return cloneElement(child as ReactElement, { handleModalClose });
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
