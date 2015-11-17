var assert = require('assert');

var App = require('../App');

suite('main');

test('#testApp-simple', function() {
  var app = new App();

  app.addProject('proj1', 120);
  app.backProject('back1', 'proj1', '4111111111111111', 60);

  assert(!app.getProject('proj1').isTargetFunded());

  app.backProject('back2', 'proj1', '1234567812345670', 60);
  assert(app.getProject('proj1').isTargetFunded());
});