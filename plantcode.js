#!/usr/bin/env node

if (process.argv.length === 2) {
  printUsage();
} else {
  processArguments();
}


function printUsage() {
  console.log("plantcode inputFile");
}

function processArguments() {

  var fs = require("fs");
  fs.readFile(process.argv[2], { encoding: "UTF-8" }, function (err, data) {
    if (err === null) {
      var parser = require("./src/plantuml");
      try {
        var aUMLBlocks = parser.parse(data);
      } catch(e) {
        console.log("Error parsing input file: ", e);
      }
      for (var i = 0, length = aUMLBlocks.length; i < length; i++) {
        aUMLBlocks[i].generateClassFiles();
      }
    } else {
      console.log("Unable to read input file.");
    }
  });

}