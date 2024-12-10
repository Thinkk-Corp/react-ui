const actualI18next = jest.requireActual("i18next");

module.exports = {
	...actualI18next,
	use: jest.fn().mockReturnThis(),
	init: jest.fn().mockResolvedValue(true),
	addResources: jest.fn(),
	changeLanguage: jest.fn(),
};
