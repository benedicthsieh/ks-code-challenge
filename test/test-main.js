var assert = require('assert');
var sinon = require('sinon');

var parseAndExecuteLine = require('../main').parseAndExecuteLine;

suite('main');

test('#parseAndExecuteLine', function() {
  var app = {
    addProject: function() {},
    backProject: function() {},
    getProject: function() {},
    getBacker: function() {}
  };
  var mock = sinon.mock(app);

  mock.expects("addProject").once().withArgs("proj1", 120);
  parseAndExecuteLine("project proj1 120", app);
  mock.verify();

  mock.expects("backProject").once()
      .withArgs("backer", "proj-1", "4111111111111111", 100);
  parseAndExecuteLine("back backer proj-1 4111111111111111 100", app);
  mock.verify();

  mock.expects("getProject").once().withArgs("a_project");
  parseAndExecuteLine("list a_project", app);
  mock.verify();

  mock.expects("getBacker").once().withArgs("-a-backer12");
  parseAndExecuteLine("backer -a-backer12", app);
  mock.verify();
});

test('#parseAndExecuteLine-wrongArgs', function() {
  assert.equal(
    parseAndExecuteLine("project proj1", {}).indexOf('ERROR'),
    0);

  assert.equal(
    parseAndExecuteLine("back", {}).indexOf('ERROR'),
    0);

  assert.equal(
    parseAndExecuteLine("list a_project a_backer", {}).indexOf('ERROR'),
    0);

  assert.equal(
    parseAndExecuteLine("backer a_project a_backer", {}).indexOf('ERROR'),
    0);
});
