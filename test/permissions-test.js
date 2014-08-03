var chai = require('chai');
var expect = chai.expect;
var testPermissions = require('../permissions.js');

describe('Permission', function() {
  it('Supports global permission', function() {
    expect(testPermissions({filename: 'open-file.txt'})).to.be.true;
    expect(testPermissions({filename: 'open-file-2.txt'})).to.be.true;
  });
  it('Supports password protection', function() {
    expect(testPermissions({filename: 'password-protected.txt', password: 'flooberjorbin'})).to.be.true;
    expect(testPermissions({filename: 'password-protected.txt', password: 'badpassword'})).to.be.false;
  });
  it('Supports date protection', function() {
    expect(testPermissions({filename: 'time-protected.txt'})).to.be.true;
  });
  it('Supports compound rules', function() {
    expect(testPermissions({filename: 'compound-rule-file.txt', password: 'flooberjorbin'})).to.be.true;
    expect(testPermissions({filename: 'compound-rule-file.txt', password: 'badpassword'})).to.be.false;
  });
});