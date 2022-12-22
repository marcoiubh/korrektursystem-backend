const { expect } = require('chai');

const User = require('../../models/user');

describe('User Model', () => {
  it('should be invalid if required field is missing', () => {
    let user = new User({});
    user.validate((error) => {
      expect(error.errors.email).to.exist;
      expect(error.errors.password).to.exist;
      expect(error.errors.role).to.exist;
    });
  });

  it('should be invalid if role is not student or professor', () => {
    let user = new User({
      email: 'test',
      password: 'secret',
      role: 'wrong',
    });

    user.validate((error) => {
      expect(error.errors.role).to.exist;
    });
  });

  it('should not throw errors with valid fields', () => {
    let user = new User({
      email: 'test',
      password: 'secret',
      role: 'student',
    });
    user.validate((error) => {
      expect(error).to.not.exist;
    });
  });
});
