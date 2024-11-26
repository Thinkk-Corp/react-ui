import { assert } from "chai";
import { Builder, By, type WebDriver, until } from "selenium-webdriver";

describe("Google Search", function () {
	this.timeout(30000); // Testlerin 30 saniyede tamamlanmasını bekleyelim.

	let driver: WebDriver;

	// Her testten önce tarayıcıyı başlatıyoruz.
	before(async () => {
		driver = await new Builder().forBrowser("chrome").build();
	});

	// Her testten sonra tarayıcıyı kapatıyoruz.
	after(async () => {
		await driver.quit();
	});

	// Google ana sayfasında arama yapmayı test ediyoruz.
	it("should search for Selenium WebDriver", async () => {
		// Google ana sayfasına gidiyoruz.
		await driver.get("https://www.google.com");

		// Arama kutusuna Selenium WebDriver yazıyoruz.
		const searchBox = await driver.findElement(By.name("q"));
		await searchBox.sendKeys("Selenium WebDriver");

		// Arama butonuna tıklıyoruz.
		const searchButton = await driver.findElement(By.name("btnK"));
		await searchButton.click();

		// Sonuçların sayfa yüklendiğini doğruluyoruz.
		await driver.wait(until.titleContains("Selenium WebDriver"), 10000);

		// Sayfa başlığının beklenen metni içerdiğini doğruluyoruz.
		const title = await driver.getTitle();
		assert.include(title, "Selenium WebDriver");
	});
});
