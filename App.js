var makeProject = require("./Project").makeProject;
var Pledge = require("./Pledge");
var makeBacker = require("./Backer").makeBacker;
var CardManager = require("./CardManager");

function App() {

  // Could substitute a datastore for these maps later, if we wish.
  // @type {Map<string, Project>}
  this._projects = new Map();

  // @type {Map<string, Backer>}
  this._backers = new Map();

  this._cardManager = new CardManager();
}

/**
 * @param {String} projectName
 * @param {Number} targetAmount
 */
App.prototype.addProject = function(projectName, targetAmount) {
  if (!!this._projects.get(projectName)) {
    throw new Error("ERROR: project with that name already exists.");
  }
  this._projects.set(projectName, makeProject(projectName, targetAmount));
  console.log("Added " + projectName + " project with target of " + targetAmount);
}

/**
 * @param {String} backerName
 * @param {String} projectName
 * @param {String} cardNumber
 * @param {Number} targetAmount
 */
App.prototype.backProject = function(backerName, projectName, cardNumber, amount) {
  var cardStatus = this._cardManager.tryAddCard(backerName, cardNumber);
  if (cardStatus != CardManager.CardAddStatus.VALID) {
    throw new Error(cardStatus);
  }

  var pledge = new Pledge(backerName, projectName, cardNumber, amount);

  var project = this._projects.get(projectName);
  if (!project) {
    throw new Error("ERROR: no project with that name.");
  }

  var backer = this._backers.get(backerName);
  if (!backer) {
    backer = makeBacker(backerName);
    this._backers.set(backerName, backer);
  }

  project.updatePledge(pledge);
  backer.updatePledge(pledge);

  console.log(backerName + " backed project " + projectName +
    " for $" + amount);
}

/**
 * @param {String} projectName
 */
App.prototype.getProject = function(projectName) {
  var project = this._projects.get(projectName);
  if (!project) {
    throw new Error("ERROR: no project with that name.");
  }
  return project;
};

/**
 * @param {String} backerName
 */
App.prototype.getBacker = function(backerName) {
  var backer = this._backers.get(backerName);
  if (!backer) {
    throw new Error("ERROR: no backer with that name.");
  }
  return backer;
}

module.exports = App;