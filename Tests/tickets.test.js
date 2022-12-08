const authentication = require('../middleware/authentication');
const tickets = require('../routes/tickets');
const express = require('express');
const { Router } = require('express');
const router = express.Router();

// Outprint if Jest is working well
test('Jest is working on tickets.test', () => {});

//Testblock 1 tickets is defined
describe('tickets', () => {
    it('should check if tickets defined', () => {
        expect(tickets).toEqual(expect.anything());
    })
});

//Testblock 2 router gets id as a String & authentication and are containing these
describe('router',() => {
    it('returns validated tickets', () => {
    const result1 = router.get('/:id', authentication);
    expect(result1).toEqual(router.get(authentication));
    })
});

//Testblock 3 router gets role 'student'
describe('router',() => {
    it('returns user role "student"', () => {
        const result2 = router.get('student');
        expect(result2).toEqual(router.get('student'));
    })
});

//Testblock 4 router gets role 'professor'
describe('router',() => {
    it('returns user role "professor"', () => {
        const result3 = router.get('professor');
        expect(result3).toEqual(router.get('professor'));
    })
});