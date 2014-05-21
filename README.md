#plantuml-code-generator

Provides a command line utility to generate code in various languages given a plantuml class diagram.

##Command line options

###-l/--language The language to output to.
The currently supported languages are
* CoffeeScript (coffeescript)
* TypeScript (typescript)

##PEG.js
The most recent version of [PlantUML](http://plantuml.sourceforge.net/) does not have a defined grammar to use with
parsing the PlantUML code. Below is a guess as to what the grammer for
the language should be, relative to the [PEG.js](https://github.com/dmajda/pegjs) parser. This creates
a parser which is then used in the creation of all output files. This grammar should validate to any valid PlantUML file.

```
plantumlfile
  = items:((noise newline { return null }) / (noise "@startuml" noise newline filelines:umllines noise "@enduml" { var UMLBlock = require("./UMLBlock"); return new UMLBlock(filelines) }))* { for (var i = 0; i < items.length; i++) { if (items[i] === null) { items.splice(i, 1); i--; } } return items }
umllines
  = lines:(umlline*) { for (var i = 0; i < lines.length; i++) { if (lines[i]===null) { lines.splice(i, 1); i--; } } return lines; }
umlline
  = propertyset newline { return null }
  / titleset newline { return null }
  / noise newline { return null }
  / hideline newline { return null }
  / declaration:packagedeclaration newline { return declaration }
  / declaration:namespacedeclaration newline { return declaration }
  / declaration:classdeclaration newline { return declaration }
  / declaration:abstractclassdeclaration newline { return declaration }
  / declaration:memberdeclaration newline { return declaration }
  / declaration:connectordeclaration newline { return declaration }
hideline
  = "hide empty members"
connectordeclaration
  = noise leftObject:objectname noise connectordescription? noise connector:connectortype noise connectordescription? noise rightObject:objectname noise ([:] [^\r\n]+)? { var Connection = require("./Connection"); return new Connection(leftObject, connector, rightObject) }
connectordescription
  = noise ["]([\\]["]/[^"])*["] noise
titleset
  = noise "title " noise [^\r\n]+ noise
connectortype
  = item:extends { return item }
  / concatenates { var Composition = require("./Composition"); return new Composition() }
  / aggregates { var Aggregation = require("./Aggregation"); return new Aggregation() }
  / connectorsize { return null }
extends
  = "<|" connectorsize { var Extension = require("./Extension"); return new Extension(true) }
  / connectorsize "|>" { var Extension = require("./Extension"); return new Extension(false) }
connectorsize
  = ".."
  / "--"
  / [.]
  / [-]
concatenates
  = "*" connectorsize
  / connectorsize [*]
aggregates
  = "o" connectorsize
  / connectorsize [o]
startblock
  = noise [{] noise
endblock
  = noise [}]
propertyset
  = "setpropname.*"
packagedeclaration
  = "package " objectname startblock newline umllines endblock
  / "package " objectname newline umllines "end package"
abstractclassdeclaration
  = noise "abstract " noise "class "? noise classname:objectname noise startblock lines:umllines endblock { var AbstractClass = require("./AbstractClass"); return new AbstractClass(classname, lines) }
  / noise "abstract " noise "class "? noise classname:objectname noise { var AbstractClass = require("./AbstractClass"); return new AbstractClass(classname) }
  / noise "abstract " noise "class "? noise classname:objectname noise newline noise lines:umllines "end class" { var AbstractClass = require("./AbstractClass"); return new AbstractClass(classname, lines) }
noise
  = [ \t]*
newline
  = [\r\n]
  / [\n]
classdeclaration
  = noise "class " noise classname:objectname noise startblock lines:umllines endblock { var Class = require("./Class"); return new Class(classname, lines) }
  / noise "class " noise classname:objectname noise { var Class = require("./Class"); return new Class(classname) }
  / noise "class " noise classname:objectname noise newline noise lines:umllines "end class" { var Class = require("./Class"); return new Class(classname, lines) }
color
  = [#][0-9a-fA-F]+
namespacedeclaration
  = noise "namespace " noise namespacename:objectname noise color? noise startblock lines:umllines endblock { var Namespace = require("./Namespace"); return new Namespace(namespacename, lines) }
  / noise "namespace " noise namespacename:objectname noise newline umllines "end namespace" { var Namespace = require("./Namespace"); return new Namespace(namespacename) }
staticmemberdeclaration
  = "static " memberdeclaration
memberdeclaration
  = declaration:methoddeclaration { return declaration }
  / declaration:fielddeclaration { return declaration }
fielddeclaration
  = noise accessortype:accessortype noise returntype:returntype noise membername:membername noise { var Field = require("./Field"); return new Field(accessortype, returntype, membername) }
methoddeclaration
  = noise field:fielddeclaration [(] parameters:methodparameters [)] noise { var Method = require("./Method"); return new Method(field.getAccessType(), field.getReturnType(), field.getName(), parameters); }
methodparameters
  = items:methodparameter* { return items; }
methodparameter
  = noise item:returntype membername:([ ] membername)? [,]? { var Parameter = require("./Parameter"); return new Parameter(item, membername ? membername[1] : null); }
returntype
  = items:[^ ,\n\r\t(){}]+ { return items.join("") }
objectname
  = objectname:([A-Za-z][A-Za-z0-9.]*) { return [objectname[0], objectname[1].join("")].join("") }
membername
  = items:[A-Za-z]+ { return items.join("") }
accessortype
  = publicaccessor
  / privateaccessor
  / protectedaccessor
publicaccessor
  = [+]
privateaccessor
  = [-]
protectedaccessor
  = [#]
```

##Goals
Initially this project will only run with node.js and output coffeescript classes.
The general idea is that, given any PlantUML file, we will be able
to generate class files in any output language. Eventually moving on from node.js and supporting
other tools to use for conversion.

##Example

The current example is very basic and features a common example of a car.

###PlantUML Code:

```
@startuml

hide empty members

abstract Car {
  + void setModel(String model)
  + void setMake(String make)
  + void setYear(Number)
  + String getModel()
  + String getMake()
  + Number getYear()
}
  
class Toyota
class Honda
class Ford
  
Toyota --|> Car
Honda --|> Car
Ford --|> Car

@enduml
```

###CoffeeScript Produced:

```coffeescript
class Car

  setModel: (model) ->

  setMake: (make) ->

  setYear: (paramX) ->

  getModel:  ->

  getMake:  ->

  getYear:  ->

class Toyota extends Car

class Honda extends Car

class Ford extends Car
```

###Running:

```
node plantcode tests/car.pegjs >> tests/car.coffee
```
