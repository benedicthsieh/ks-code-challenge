var Pledge = require("./Pledge");

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

/** @type {Pledge} pledge */
Backer.prototype.updatePledge = function(pledge) {
  Pledge.findAndUpdatePledge(this._pledges, pledge);
}

Backer.prototype.statusString = function() {
  var str = this._pledges.map(function(pledge) {
    return "-- Backed " + pledge.projectName + " for $" + pledge.amount;
  }).join('\n');
  return str;
}

module.exports = Backer;