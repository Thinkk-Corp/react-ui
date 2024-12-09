const actualI18next = jest.requireActual("i18next");

module.exports = {
	...actualI18next,
	init: jest.fn().mockResolvedValue(undefined), // `init` metodunu doğru şekilde mockla
	use: jest.fn(() => ({
		init: jest.fn().mockResolvedValue(undefined), // Eğer `use` içinde de `init` varsa
	})),
	changeLanguage: jest.fn(),
	addResources: jest.fn(),
};
