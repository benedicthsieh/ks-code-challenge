var assert = require('assert');
var sinon = require('sinon');

var parseAndExecuteLine = require('../main').parseAndExecuteLine;

suite('main');

test('#parseAndExecuteLine', function() {
  var app = {
    addProject: function() {},
    backProject: function() {},
    projectStatusString: function() {},
    backerStatusString: function() {}
  };
  var fineStatus = {
    message: 'fine',
    success: 'true'
  };
  var mock = sinon.mock(app);

  mock.expects("addProject").once().withArgs("proj1", 120)
      .returns(fineStatus);
  parseAndExecuteLine("project proj1 120", app);
  mock.verify();

  mock.expects("backProject").once()
      .withArgs("backer", "proj-1", "4111111111111111", 100)
      .returns(fineStatus);
  parseAndExecuteLine("back backer proj-1 4111111111111111 100", app);
  mock.verify();

  mock.expects("projectStatusString").once().withArgs("a_project")
      .returns(fineStatus);
  parseAndExecuteLine("list a_project", app);
  mock.verify();

  mock.expects("backerStatusString").once().withArgs("-a-backer12")
      .returns(fineStatus);
  parseAndExecuteLine("backer -a-backer12", app);
  mock.verify();
});