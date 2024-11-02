import type { AxiosResponse } from "axios";

/**
 * Sunucudan yanıt alınamadığında kullanılan özel bir hata sınıfıdır.
 * Bu sınıf, yanıt alınamadığı durumlarda hata mesajını ve ilgili yanıtı taşır.
 */
export default class ServerNotResponseException extends Error {
	/** Sunucudan alınamayan yanıt */
	public response: AxiosResponse;

	/**
	 * `ServerNotResponseException` sınıfının bir örneğini oluşturur.
	 *
	 * @param {string} message - Hata mesajı.
	 * @param {AxiosResponse} response - Sunucudan alınamayan yanıt.
	 */
	constructor(message: string, response: AxiosResponse) {
		super(message);
		this.response = response;
	}
}
