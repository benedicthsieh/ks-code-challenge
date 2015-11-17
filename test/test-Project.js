var assert = require('assert');

var makeProject = require('../Project').makeProject;
var Pledge = require('../Pledge');

suite('main');

test('#testProject-simple', function() {
  var project = makeProject('proj', 100);
  var pledge1 = new Pledge('backer', 'proj', '49927398716', 30);
  project.updatePledge(pledge1);

  assert(!project.isTargetFunded());
  assert.equal(project.getFundingTotal(), 30);

  var pledge2 = new Pledge('backer2', 'proj', '1234567812345670', 70);
  project.updatePledge(pledge2)
  assert(project.isTargetFunded());
});

test('#testProject-dupeBacker', function() {
  var project = makeProject('proj', 100);
  var pledge1 = new Pledge('backer', 'proj', '49927398716', 30);
  project.updatePledge(pledge1);

  assert(!project.isTargetFunded());
  assert.equal(project.getFundingTotal(), 30);

  var pledge2 = new Pledge('backer', 'proj', '1234567812345670', 70);
  project.updatePledge(pledge2)
  assert(!project.isTargetFunded());
  assert.equal(project.getFundingTotal(), 70);
});