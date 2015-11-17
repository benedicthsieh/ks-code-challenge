var Pledge = require("./Pledge");

var PROJECT_NAME_MIN_LENGTH = 4;
var PROJECT_NAME_MAX_LENGTH = 20;

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
  return this.getFundingTotal() >= this.target;
}

Project.prototype.fundingShortBy = function() {
  return this.target - this.getFundingTotal();
}

/**
 * @param {Pledge} pledge
 */
Project.prototype.updatePledge = function(pledge) {
  Pledge.findAndUpdatePledge(this._pledges, pledge);
}

Project.prototype.statusString = function() {
  var str = this._pledges.map(function(pledge) {
    return "-- " + pledge.backerName + " backed for $" + pledge.amount;
  }).join('\n');

  str += '\n' + this.name;
  str += this.isTargetFunded() ?
      " is successful!" :
      " needs $" + this.fundingShortBy() +
          " more dollars to be successful.";
  return str;
}

/*
 * @param {String} name
 * @param {Number} target Target funding amount
 * @return {!Project}
 */
function makeProject(projectName, target) {
  if (projectName.length > PROJECT_NAME_MAX_LENGTH
      || projectName.length < PROJECT_NAME_MIN_LENGTH) {
    throw new Error("ERROR: project name must be between "
      + PROJECT_NAME_MIN_LENGTH + " and " + PROJECT_NAME_MAX_LENGTH
      + "characters long.");
  }
  return new Project(projectName, target);
}

exports.makeProject = makeProject;

