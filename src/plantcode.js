var fs = require("fs");
var hbs = require("handlebars");
var parser = require("./plantuml");
var os = require("os");

var supported_languages = ["coffeescript", "csharp", "ecmascript5", "ecmascript6", "java", "php", "python", "ruby", "typescript", "swift"];

hbs.registerHelper('if_ne', function(a, b, opts) {
    if (a() != b) {
        return opts.fn(this);
    } else {
        return opts.inverse(this);
    }
});

// sReturnType Check
hbs.registerHelper('if_ne2', function(a, b, opts) {
  if (a["sReturnType"] != b) {
      return opts.fn(this);
  } else {
      return opts.inverse(this);
  }
});

hbs.registerHelper('call', function (context, member, options) {
   return member.call(context);
});

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
      output += template(element, {
        allowedProtoMethods: {
         "getExtends": true,
         "getFields": true,
         "getFullName": true,
         "getKeyword": true,
         "getMethods": true,
         "getName": true,
         "getParameters": true,
         "getReturnType": true,
         "hasFields": true,
         "hasMethods": true,
         "needsReturnStatement": true
        }
      }) + os.EOL + os.EOL;
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

exports.getSupportedLanguages = getSupportedLanguages;
exports.convertFile = convertFile;
