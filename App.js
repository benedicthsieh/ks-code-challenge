var Project = require("./Project");
var Pledge = require("./Pledge");
var Backer = require("./Backer");
var CardManager = require("./CardManager");

function AppStatus(success, message) {
  this.message = message;
  this.success = success;
}

function App() {

  // Could substitute a datastore for these maps later, if we wish.
  // @type {Map<string, Project>}
  this._projects = new Map();

  // @type {Map<string, Backer>}
  this._backers = new Map();

  this._cardManager = new CardManager();
}

App.prototype.addProject = function(projectName, targetAmount) {
  if (!!this._projects.get(projectName)) {
    return new AppStatus(false, "ERROR: project with that name already exists.");
  }
  this._projects.set(projectName, new Project(projectName, targetAmount));
  return new AppStatus(
    true, "Added " + projectName + " project with target of " + targetAmount);
}

App.prototype.backProject = function(backerName, projectName, cardNumber, amount) {
  var cardStatus = this._cardManager.tryAddCard(backerName, cardNumber);
  if (cardStatus != CardManager.CardAddStatus.VALID) {
    return new AppStatus(false, cardStatus);
  }

  var pledge = new Pledge(backerName, projectName, cardNumber, amount);

  var project = this._projects.get(projectName);
  if (!project) {
    return new AppStatus(false, "ERROR: no project with that name.");
  }

  var backer = this._backers.get(backerName);
  if (!backer) {
    backer = new Backer(backerName);
    this._backers.set(backerName, backer);
  }

  project.updatePledge(pledge);
  backer.updatePledge(pledge);

  return new AppStatus(true, backerName + " backed project " + projectName +
    " for $" + amount);
}

App.prototype.projectStatusString = function(projectName) {
  var project = this._projects.get(projectName);
  if (!project) {
    return "ERROR: no project with that name.";
  }
  return project.statusString();
};

App.prototype.backerStatusString = function(backerName) {
  var backer = this._backers.get(backerName);
  if (!backer) {
    return "ERROR: no backer with that name."
  }
  return backer.statusString();
}

module.exports = App;