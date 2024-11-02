import type { AxiosResponse } from "axios";

/**
 * Sunucu yanıtında JSON formatında bir hata ile karşılaşıldığında kullanılan özel bir hata sınıfıdır.
 * Bu sınıf, yanıtın JSON formatında olmadığı durumlarda hata mesajını ve yanıtı taşır.
 */
export default class ServerResponseNotJSONException extends Error {
	/** Sunucudan alınan yanıt */
	public response: AxiosResponse;

	/**
	 * `ServerResponseNotJSONException` sınıfının bir örneğini oluşturur.
	 *
	 * @param {string} message - Hata mesajı.
	 * @param {AxiosResponse} response - Sunucudan alınan yanıt.
	 */
	constructor(message: string, response: AxiosResponse) {
		super(message);
		this.response = response;
	}
}
