const { Schema, default: mongoose, model } = require('mongoose');
const user = require('../models/user');

// Outprint if Jest is working well
test('Jest is working on user.test', () => {});

//Testblock 1 Schema shouldn't be null or undefined
describe('Schema', () => {
    it('should be defined', () => {
        expect([user.schema]).toEqual(expect.anything());
    })

});

// Testblock 2 schema = mongoose.Schema
describe('Schema', () => {
    it('should be the mongoose.Schema', () => {
        expect(Schema).toBe(mongoose.Schema);
    });
})

// Testblock 3 user shouldn't be null or undefined
describe('User', () => {
    it('should be defined', () => {
        expect(user.User).toEqual(expect.anything());
    });
});
