
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

    var parser = require("../../src/plantuml");
    
    return {
        process: function (plantUml) {
            try {
                var aUMLBlocks = parser.parse(data);
            } catch(e) {
                throw "Error parsing [plantUml]";
            }
            /*
            fs.readFile("templates/" + options.language + ".hbs", { encoding: "UTF-8" }, function (err, data) {
                if (err === null) {
                    processTemplateFile(data, aUMLBlocks);
                } else {
                    abort("Unable to read template file for " + options.language + ".");
                }
            });*/
        }
    }
    
});


