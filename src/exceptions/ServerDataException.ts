import type { AxiosResponse } from "axios";

/**
 * Sunucu tarafından döndürülen hataları temsil eden özel bir hata sınıfıdır.
 * Bu sınıf, sunucu yanıtıyla birlikte hata mesajını taşır.
 */
export default class ServerDataException extends Error {
	/** Sunucudan dönen hata yanıtı */
	public response: AxiosResponse;

	/**
	 * `ServerDataException` sınıfının bir örneğini oluşturur.
	 *
	 * @param {string} message - Hata mesajı.
	 * @param {AxiosResponse} response - Sunucudan alınan hata yanıtı.
	 */
	constructor(message: string, response: AxiosResponse) {
		super(message);
		this.response = response;
	}
}
