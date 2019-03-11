var fs = require("fs");
var hbs = require("handlebars");
var parser = require("./plantuml");
var os = require("os");

var supported_languages = ["coffeescript", "csharp", "ecmascript5", "ecmascript6", "java", "php", "ruby", "typescript"];

function convertFile(config) {

  fs.readFile(config.input, { encoding: "UTF-8" }, function (err, data) {
    if (err === null) {
      processInputFile(config, data);
    } else {
      console.error("Unable to read input file.");
    }
  });

}

function getSupportedLanguages() {
	return supported_languages;
}

function processInputFile(config, data) {
  try {
    var aUMLBlocks = parser.parse(data);
  } catch(e) {
    console.error("Error parsing input file: ", config.input, e);
  }
  fs.readFile("templates/" + config.language + ".hbs", { encoding: "UTF-8" }, function (err, data) {
    if (err === null) {
      processTemplateFile(config, data, aUMLBlocks);
    } else {
      console.error("Unable to read template file for " + config.language + ".");
    }
  });
}

function processTemplateFile(config, templateData, dictionary) {

  var template = hbs.compile(templateData);

  var output = "";

  dictionary.forEach(function (element) {
    element.getClasses().forEach(function (element) {
      output += template(element) + os.EOL + os.EOL;
    })
  })

  if (config.output === null) {
    console.log(output);
  } else {
    fs.writeFile(config.output, output, function (err) {
      if (err !== null) {
        console.error("Unable to write output file for " + config.output + ".");
      }
    })
  }

}

// Workaround for an apparent bug in Handlebars: functions are not called with the parent scope
// as context.
//
// Here the getFullName is found in the parent scope (Class), but it is called with the current
// scope (Field) as context:
//
// {{#each getFields}}
//   {{../getFullName}}
// {{/each}}
//
// The following helper works around it:
//
// {{#each getFields}}
//   {{#call ../this ../getFullName}}
// {{/each}}
hbs.registerHelper('if_ne', function(a, b, opts) {
    if (a() != b) {
        return opts.fn(this);
    } else {
        return opts.inverse(this);
    }
});

hbs.registerHelper('call', function (context, member, options) {
   return member.call(context);
});

exports.getSupportedLanguages = getSupportedLanguages;
exports.convertFile = convertFile;
