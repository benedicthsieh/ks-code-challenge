var assert = require('assert');

/**
 * Represents a Kickstarter pledge.
 * Expected to be 'keyed' by (backerName, projectName)
 * @param {String} backerName
 * @param {String} projectName
 * @param {String} card
 * @param {Number} amount
 */
function Pledge(backerName, projectName, card, amount) {
  this.backerName = backerName;
  this.projectName = projectName;
  this.card = card;
  this.amount = amount;
}

Pledge.prototype.update = function(newPledge) {
  assert(newPledge);
  assert.equal(newPledge.backerName, this.backerName);
  assert.equal(newPledge.projectName, this.projectName);

  this.card = newPledge.card;
  this.amount = newPledge.amount;
}

// static functions
Pledge.hasSameKey = function(pledge1, pledge2) {
  return pledge1.backerName === pledge2.backerName &&
    pledge1.projectName === pledge2.projectName;
}

/**
 * @param {Array.<Pledge>} arr
 * @param {Pledge} pledge
 */
Pledge.findAndUpdatePledge = function(arr, pledge) {
  var oldPledge = arr.find(Pledge.hasSameKey.bind(undefined, pledge));
  if (!!oldPledge) {
    oldPledge.update(pledge);
  } else {
    arr.push(pledge);
  }
}

module.exports = Pledge;
