module.exports = {
	use: jest.fn().mockReturnThis(),
	init: jest.fn(),
	changeLanguage: jest.fn(),
	addResources: jest.fn(),
	on: jest.fn(),
};
