import ServerDataException from "@/exceptions/ServerDataException.ts";
import ServerNotResponseException from "@/exceptions/ServerNotResponseException.ts";
import ServerResponseNotJSONException from "@/exceptions/ServerResponseNotJSONException.ts";
import type { IResponseServiceSuccessfullyGenerateNotExtraResponse } from "@/interfaces/IResponse.ts";
import axios, { type AxiosError } from "axios";

/**
 * HTTPClient, Axios kullanarak API isteklerini yönetir.
 * - İstekler için JWT token'ı başlığa ekler.
 * - Yanıtlar için JSON formatını kontrol eder ve uygun istisnaları fırlatır.
 * - Başarılı yanıtlar için kullanıcıya bildirim gösterir.
 */
const HTTPClient = axios.create({
	baseURL: "/api",
});

/**
 * Axios istek interceptörü.
 *
 * - JWT token'ı `Authorization` başlığına ekler.
 * - Buton yükleme durumunu `true` olarak ayarlar.
 *
 * @param {object} config - Axios istek konfigürasyonu.
 * @returns {object} - Güncellenmiş Axios istek konfigürasyonu.
 * @throws {Promise<Error>} - İstek sırasında bir hata oluşursa, hata döner.
 */
HTTPClient.interceptors.request.use(
	(config) => {
		// if (config.method === "get") {
		// 	loaderEvent()?.show({ isSplashScreen: false });
		// }

		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

/**
 * Axios yanıt interceptörü.
 *
 * - Yanıtın JSON formatında olup olmadığını kontrol eder.
 * - İçerik türü uygun değilse veya veri formatında sorun varsa, uygun istisnaları fırlatır.
 * - Başarılı yanıtlar için kullanıcıya bildirim gösterir.
 *
 * @param {object} response - Axios yanıt nesnesi.
 * @returns {object} - Axios yanıt nesnesi.
 * @throws {ServerNotResponseException | ServerResponseNotJSONException | ServerDataException} - Yanıt sırasında bir hata oluşursa, uygun istisnayı fırlatır.
 */
HTTPClient.interceptors.response.use(
	(response) => {
		// loaderEvent()?.hidden();

		const contentType = response.headers["Content-Type"];
		if (typeof response.data === "undefined") {
			throw new ServerNotResponseException("Sunucudan veri alınamadı! Lütfen daha sonra tekrar deneyin:", response);
		}
		if (contentType?.toString().includes("application/json")) {
			throw new ServerResponseNotJSONException("Sunucu veri formatında sorun var!  Lütfen daha sonra tekrar deneyin:", response);
		}
		const data = response.data as IResponseServiceSuccessfullyGenerateNotExtraResponse;
		if (data.error === 1) {
			throw new ServerDataException(data.message, response);
		}

		return response;
	},
	(error: Error | AxiosError) => {
		// loaderEvent()?.hidden();
		return Promise.reject(error); // Hata yönetilemedi, Promise.reject'e düş
	},
);

export default HTTPClient;
