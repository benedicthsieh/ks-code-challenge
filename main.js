var prompt = require('prompt');
var fs = require('fs');
var App = require('./App');


// We expect the line to be one of:
// -  project <project> <target amount>
// -  back <given name> <project> <credit card number> <backing amount>
// -  list <project>
// -  backer <given name>
// @param {String} line
// @param {App} app
// @return {String} any errors or status updates from the command.
function parseAndExecuteLine(line, app) {
  var arr = line.split(" ");
  if (arr.length < 1) {
    return "ERROR: Invalid input, expected a command.";
  }
  switch (arr[0]) {
    case "project":
      if (arr.length != 3) {
        return "ERROR: project command expects 2 arguments";
      }
      var amount = parseInt(arr[2], 10);
      if (!amount) {
        return "ERROR: 2nd argument for project must be a number.";
      }
      return app.addProject(arr[1], amount).message;
    case "back":
      if (arr.length != 5) {
        return "ERROR: back command expects 4 arguments.";
      }
      var amount = parseInt(arr[4], 10);
      if (!amount) {
        return "ERROR: 4th argument for back must be a number.";
      }
      return app.backProject(arr[1], arr[2], arr[3], amount).message;
    case "list":
      if (arr.length != 2) {
        return "ERROR: list command expects 1 argument.";
      }
      return app.projectStatusString(arr[1]);
    case "backer":
      if (arr.length !=2) {
        return "ERROR: backer command expects 2 arguments.";
      }
      return app.backerStatusString(arr[1]);
    default:
      return "ERROR: Invalid input, expected a command.";
  }
}

function runInteractive() {
  var stdin = process.openStdin();
  process.stdout.write("> ");
  var app = new App();
  stdin.addListener("data", function(d) {
    console.log(parseAndExecuteLine(d.toString().trim(), app));
    process.stdout.write("> ");
  });
}

function runOnFile(filename) {
  fs.readFile(filename, 'utf8', function(err, data) {
    if (err) {
      return console.log(err);
    }
    var app = new App();
    data.split('\n').forEach(function(line) {
      process.stdout.write(parseAndExecuteLine(line, app) + '\n');
    });
  })
}

var main = function(){
  if (process.argv.length > 2) {

  } else {
    runInteractive();
  }
}

if (require.main === module) {
    main();
}