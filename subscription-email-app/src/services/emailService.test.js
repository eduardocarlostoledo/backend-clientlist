const emailService = require('../services/emailService');

test('hello world!', () => {
	expect(emailService.someFunction()).toBe(someExpectedValue);
});