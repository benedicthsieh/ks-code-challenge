var assert = require('assert');

var Pledge = require('../Pledge');

suite('main');

test('#testFindAndUpdatePledge', function() {
  var arr = [
    new Pledge('b', 'p', '111', 50),
    new Pledge('b2', 'p', '123', 60)
  ];

  var update = new Pledge('b2', 'p', '123', 70);

  Pledge.findAndUpdatePledge(arr, update);
  var updated = arr[1];
  assert.deepEqual(update, updated);
})