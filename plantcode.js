#!/usr/bin/env node
var fs = require("fs");
var hbs = require("handlebars");
var parser = require("./src/plantuml");

if (process.argv.length === 2) {
  printUsage();
} else {
  processArguments();
}


function printUsage() {
  console.log("plantcode inputFile");
}

function processArguments() {
  fs.readFile(process.argv[2], { encoding: "UTF-8" }, function (err, data) {
    if (err === null) {
      processInputFile(data);
    } else {
      console.log("Unable to read input file.");
    }
  });

}

function processInputFile(data) {
  try {
    var aUMLBlocks = parser.parse(data);
  } catch(e) {
    console.log("Error parsing input file: ", e);
  }
  fs.readFile("templates/coffeescript.hbs", { encoding: "UTF-8" }, function (err, data) {
    if (err === null) {
      processTemplateFile(data, aUMLBlocks);
    } else {
      console.log("Unable to read template file.");
    }
  });
}

function processTemplateFile(templateData, dictionary) {

  var template = hbs.compile(templateData);
  
  var classesToOutput = [];
  
  for (var i = 0, length = dictionary.length; i < length; i++) {
    classesToOutput = classesToOutput.concat(dictionary[i].getClasses());
  }
  
  for (var i = 0, length = classesToOutput.length; i < length; i++) {
    console.log(template(classesToOutput[i]))
  }
  
}