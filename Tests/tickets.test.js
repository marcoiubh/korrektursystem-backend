
test('Our second test', () => {});

describe('getAuthentication', () => {
    it('should return the authentication', () => {
        const result = tickets.getAuthentication(authentication);
        expect(result).toBe({authentication});
    });
})