const config = require('config');
const _ = require('lodash');
const Module = require('../models/module');
const { User } = require('../models/user');
const admin = require('../middleware/admin');
const authentication = require('../middleware/authentication');
const express = require('express');
const router = express.Router();
const modules = require('../routes/modules');
const addModuleToUser = require('../routes/modules'); 

// Outprint if Jest is working well
test('Jest is working on user.test', () => {});

//Testblock 1 "modules" shouldn't be null or undefined
describe('modules', () => {
    it('should be defined', () => {
        expect(modules).toEqual(expect.anything());
    })
});

//Testblock 2 "modules" should accept userID & module
describe('modules', () => {
    it('should accept userID & module', () => {
       const result = addModuleToUser('userID', module);
       expect(result).toEqual(expect.anything());
    })
});
