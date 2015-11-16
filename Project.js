var Pledge = require("./Pledge");

/**
 * Represents a Kickstarter project. Expected to be 'keyed' by name.
 * @param {String} name
 * @param {Number} target Target funding amount
 */
function Project(name, target) {
  this.name = name;
  this.target = target;

  // @type {Array.<Pledge>}
  this._pledges = [];
}

Project.prototype.getFundingTotal = function() {
  var total = 0;
  this._pledges.forEach(function(pledge, i, arr) {
    total += pledge.amount;
  });
  return total;
}

Project.prototype.isTargetFunded = function() {
  return this.getFundingTotal() > this.target;
}

Project.prototype.fundingShortBy = function() {
  return this.target - this.getFundingTotal();
}

/** @type {Pledge} pledge */
Project.prototype.updatePledge = function(pledge) {
  Pledge.findAndUpdatePledge(this._pledges, pledge);
}

Project.prototype.statusString = function() {
  var str = this._pledges.map(function(pledge) {
    return "-- " + pledge.backerName + " backed for $" + pledge.amount;
  }).join('\n');

  str += '\n';
  str += this.isTargetFunded() ?
      " is successful!" :
      this.name + " needs $" + this.fundingShortBy() +
          " more dollars to be successful.";

  return str;
}

/**
 * Map from names to projects. Could substitute a data store here later.
 * @type {Map<string, Project>}
 */
var projects = new Map();

// static
/** @param {String} */
Project.getProject = function(name) {
  return projects.get(name);
}

module.exports = Project;

