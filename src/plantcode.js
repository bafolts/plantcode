var fs = require("fs");
var hbs = require("handlebars");
var parser = require("./plantuml");
var os = require("os");
var templates = require("../templates/index");

var supported_languages = ["coffeescript", "csharp", "ecmascript5", "ecmascript6", "java", "php", "python", "ruby", "typescript", "swift", "kotlin"];

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
hbs.registerHelper('call', function (context, member, options) {
   return member.call(context);
});

function convertFile(config) {
  fs.readFile(config.input, { encoding: "UTF-8" }, function (err, data) {
    if (err === null) {
      var output = convertText(config, data);
      if (config.output === null) {
        console.log(output);
      } else {
        fs.writeFile(config.output, output, function (err) {
          if (err !== null) {
            console.error("Unable to write output file for " + config.output + ".");
          }
        })
      }
    } else {
      console.error("Unable to read input file.");
    }
  });
}

function getSupportedLanguages() {
  return supported_languages;
}

function convertText(config, data) {
  try {
    var aUMLBlocks = parser.parse(data);
  } catch(e) {
    console.error("Error parsing input file: ", config.input, e);
    return;
  }
  var data = templates[config.language];
  if (data === undefined) {
    console.error("Unable to read template file for " + config.language + ".");
    return;
  }
  return processTemplateFile(config, data, aUMLBlocks);
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
         "isPrivate": true,
         "isProtected": true,
         "isPublic": true,
         "needsReturnStatement": true
        }
      }) + os.EOL + os.EOL;
    })
  })

  return output;
}

exports.getSupportedLanguages = getSupportedLanguages;
exports.convertFile = convertFile;
exports.convertText = convertText;
