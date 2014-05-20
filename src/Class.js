
module.exports = (function () {

  var Field = require("./Field");
  var Method = require("./Method");

  var Class = function (className, fileLines) {
    this.cExtends = null;
    this.fileLines = fileLines || [];
    this.className = className;
    this.nNamespace = null;
  }
  
  Class.prototype.setExtends = function (className) {
    this.cExtends = className;
  }
  
  Class.prototype.getExtends = function () {
    return this.cExtends;
  }

  Class.prototype.setNamespace = function (namespace) {
    this.nNamespace = namespace;
  }
  
  Class.prototype.getNamespace = function () {
    return this.nNamespace;
  }

  Class.prototype.isAbstract = function () {
    return false;
  }

  Class.prototype.getName = function () {
    return this.className;
  }
 
  Class.prototype.getMethods = function () {
    var aResult = [];
    for (var i = 0, length = this.fileLines.length; i < length; i++) {
      if (this.fileLines[i] instanceof Method) {
        aResult.push(this.fileLines[i]);
      }
    }
    return aResult;
  }
 
  Class.prototype.getFields = function () {
    var aResult = [];
    for (var i = 0, length = this.fileLines.length; i < length; i++) {
      if (!(this.fileLines[i] instanceof Method) && this.fileLines[i] instanceof Field) {
        aResult.push(this.fileLines[i]);
      }
    }
    return aResult;
  }

  Class.prototype.getFullName = function () {
    if (this.getNamespace() !== null) {
      return this.getNamespace().getFullName() + "." + this.getName();
    } else {
      return this.getName();
    }
  }

  return Class;

})()
