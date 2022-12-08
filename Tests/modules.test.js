const config = require('config');
const _ = require('lodash');
const Module = require('../models/module');
const { User } = require('../models/user');
const admin = require('../middleware/admin');
const authentication = require('../middleware/authentication');
const express = require('express');
const router = express.Router();
const modules = require('../routes/modules');


// Outprint if Jest is working well
test('Jest is working on user.test', () => {});

//Testblock 1 addModelTosUser shouldn't be null or undefined
const addModuleToUser = modules.addModuleToUser;
describe('addModulesToUser', () => {
    it('should be defined', () => {
        expect(addModuleToUser).toEqual(expect.anything());
    })
});