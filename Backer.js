var Pledge = require("./Pledge");

var BACKER_NAME_MIN_LENGTH = 4;
var BACKER_NAME_MAX_LENGTH = 20;

/**
 * Represents a Kickstarter backer. Expected to be 'keyed' by name.
 * @param {String} name
 */
function Backer(name) {
  this.name = name;

  // Note that these Pledge objects are shared with the corresponding Project,
  // and some non-key values can change from under us.
  // @type {Array.<Pledge>}
  this._pledges = [];
}

/**
 * @param {Pledge} pledge
 */
Backer.prototype.updatePledge = function(pledge) {
  Pledge.findAndUpdatePledge(this._pledges, pledge);
}

Backer.prototype.statusString = function() {
  var str = this._pledges.map(function(pledge) {
    return "-- Backed " + pledge.projectName + " for $" + pledge.amount;
  }).join('\n');
  return str;
}

/*
 * @param {String} backerName
 */
function makeBacker(backerName) {
  if (backerName.length > BACKER_NAME_MAX_LENGTH
    || backerName.length < BACKER_NAME_MIN_LENGTH) {
    throw new Error("ERROR: backer name must be between "
      + BACKER_NAME_MIN_LENGTH + " and " + BACKER_NAME_MAX_LENGTH
      + "characters long.");
  }
  return new Backer(backerName);
}

exports.makeBacker = makeBacker;