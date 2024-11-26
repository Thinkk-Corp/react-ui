import { logger } from "@/utils/LoggerHelper.ts"; // LoggerHelper'ı doğru import ettiğinizden emin olun
import { Builder, By } from "selenium-webdriver";
import { Options } from "selenium-webdriver/chrome";

(async function AvatarComponentTest() {
	// WebDriver'ı başlat
	const driver = await new Builder()
		.forBrowser("chrome") // Chrome tarayıcısını kullanıyoruz
		.setChromeOptions(new Options()) // Başsız modda çalıştırıyoruz
		.build();

	try {
		// 1. Test: Default Properties (Varsayılan Özellikler)
		await driver.get("http://localhost:3001"); // React uygulamanızın çalıştığı URL

		const avatarContainer = await driver.findElement(By.css("[data-testid='avatar-container']"));
		const avatarImage = await driver.findElement(By.css("[data-testid='avatar-image']"));

		// Avatar container'ın doğru boyutta olup olmadığını kontrol et
		const containerClasses = await avatarContainer.getAttribute("class");
		if (containerClasses.includes("w-12 h-12")) {
			logger({ message: "Default size test passed", color: "green" });
		} else {
			logger({ message: "Default size test failed", color: "red", line: "17" });
		}

		// Görselin doğru src ve alt attribute'larına sahip olup olmadığını kontrol et
		const imageSrc = await avatarImage.getAttribute("src");
		const imageAlt = await avatarImage.getAttribute("alt");
		if (imageSrc === "https://via.placeholder.com/150" && imageAlt === "test") {
			logger({ message: "Image attributes test passed", color: "green" });
		} else {
			logger({ message: "Image attributes test failed", color: "red", line: "23" });
		}

		// 2. Test: Custom Size (Özel Boyut)
		await driver.get("http://localhost:3000"); // Yeni sayfayı yükle
		const avatarContainerLg = await driver.findElement(By.css("[data-testid='avatar-container']"));
		const containerClassesLg = await avatarContainerLg.getAttribute("class");
		if (containerClassesLg.includes("w-16 h-16")) {
			logger({ message: "Custom size test passed", color: "green" });
		} else {
			logger({ message: "Custom size test failed", color: "red", line: "31" });
		}

		// 3. Test: Custom Alt Text (Özel Alt Metin)
		const avatarImageAlt = await driver.findElement(By.css("[data-testid='avatar-image']"));
		const altText = await avatarImageAlt.getAttribute("alt");
		if (altText === "test") {
			logger({ message: "Custom alt text test passed", color: "green" });
		} else {
			logger({ message: "Custom alt text test failed", color: "red", line: "39" });
		}

		// 4. Test: Custom Rounded Class (Özel Yuvarlak Sınıfı)
		const avatarContainerRounded = await driver.findElement(By.css("[data-testid='avatar-container']"));
		const containerClassesRounded = await avatarContainerRounded.getAttribute("class");
		if (containerClassesRounded.includes("rounded-lg")) {
			logger({ message: "Custom rounded class test passed", color: "green" });
		} else {
			logger({ message: "Custom rounded class test failed", color: "red", line: "47" });
		}

		// 5. Test: Default Rounded Class (Varsayılan Yuvarlak Sınıfı)
		const avatarContainerDefaultRounded = await driver.findElement(By.css("[data-testid='avatar-container']"));
		const containerClassesDefaultRounded = await avatarContainerDefaultRounded.getAttribute("class");
		if (containerClassesDefaultRounded.includes("rounded-full")) {
			logger({ message: "Default rounded class test passed", color: "green" });
		} else {
			logger({ message: "Default rounded class test failed", color: "red", line: "55" });
		}

		// 6. Test: Custom ClassName (Özel className)
		const avatarContainerCustomClass = await driver.findElement(By.css("[data-testid='avatar-container']"));
		const containerClassesCustomClass = await avatarContainerCustomClass.getAttribute("class");
		if (containerClassesCustomClass.includes("custom-class")) {
			logger({ message: "Custom className test passed", color: "green" });
		} else {
			logger({ message: "Custom className test failed", color: "red", line: "63" });
		}
	} catch (err) {
		console.error("Test failed: ", err);
		logger({ message: `Test failed: ${(err as Error).message}`, color: "red", line: "69" });
	} finally {
		await driver.quit(); // Test bitiminde tarayıcıyı kapat
	}
})();
