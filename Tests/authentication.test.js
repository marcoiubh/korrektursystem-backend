const authentication = require('../middleware/authentication');

// Outprint if Jest is working well
test('Jest is working on authentication.test', () => {});

//Testblock 1 authentication is defined
describe('authentication', () => {
    it('should check if authentification defined', () => {
        expect(authentication).toEqual(expect.anything());
    })
});