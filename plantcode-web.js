
define('util', function () {
    return {
        inherits: function(ctor, superCtor) {
        ctor.super_ = superCtor;
        ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
                value: ctor,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        }
    };
});

define(function (require) {

    var parser = require("src/plantuml");
    var settings = require("src/settings");
    var hbs = require("lib/handlebars-v3.0.0");
    var templates = {
        coffeescript: require("text!templates/coffeescript.hbs"),
        csharp: require("text!templates/csharp.hbs"),
        ecmascript5: require("text!templates/ecmascript5.hbs"),
        ecmascript6: require("text!templates/ecmascript6.hbs"),
        java: require("text!templates/java.hbs"),
        php: require("text!templates/php.hbs"),
        ruby: require("text!templates/ruby.hbs"),
        typescript: require("text!templates/typescript.hbs")
    };

    var test = require("text!tests/car.pegjs");

    function processTemplateFile(templateData, dictionary) {

        var template = hbs.compile(templateData);

        var output = "";

        dictionary.forEach(function (element) {
            element.getClasses().forEach(function (element) {
                output += template(element) + "\r\n";
            })
        })

        return output;
    }

    return {
        getSupportedLanguages: function () {
            return settings.languages;
        },
        process: function (plantUml) {
            try {
                var aUMLBlocks = parser.parse(test);
            } catch(e) {
                throw "Error parsing [plantUml]";
            }
            return processTemplateFile(templates.java, aUMLBlocks);
        }
    }
});


