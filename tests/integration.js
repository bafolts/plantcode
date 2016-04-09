var plantcode = require("../src/plantcode");
var exec = require('child_process').exec;

var inputs = [{
  language: "java",
  input: "tests/comment-file-simple.pegjs",
  output: "tests/comment-file-simple.java"
}, {
  language: "csharp",
  input: "tests/car.pegjs",
  output: "tests/car.cs"
}, {
  language: "java",
  input: "tests/car.pegjs",
  output: "tests/car.java"
}, {
  language: "coffeescript",
  input: "tests/car.pegjs",
  output: "tests/car.coffee"
}, {
  language: "typescript",
  input: "tests/car.pegjs",
  output: "tests/car.ts"
}, {
  language: "ruby",
  input: "tests/car.pegjs",
  output: "tests/car.rb"
}, {
  language: "php",
  input: "tests/car.pegjs",
  output: "tests/car.php"
}, {
  language: "ecmascript5",
  input: "tests/car.pegjs",
  output: "tests/car.js"
}, {
  language: "ecmascript6",
  input: "tests/car.pegjs",
  output: "tests/car.js6"
}];

for(var i = 0; i < inputs.length; i++) {
  plantcode.convertFile(inputs[i]);
}

for(var i = 0; i < inputs.length; i++) {
  exec('node plantcode -o ' + inputs[i].output + ' -l ' + inputs[i].language + ' ' + inputs[i].input,
    function(error, stdout, stderr) {
      if (error || stderr) {
        console.error(stderr);
        process.exit(0);
      }
    }
  );
}
