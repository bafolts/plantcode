
module.exports = (function () {

  var Field = require("./Field");
  var Method = require("./Method");

  var Interface = function (interfaceName, fileLines) {
    this.cExtends = null;
    this.fileLines = fileLines || [];
    this.interfaceName = interfaceName;
    this.nNamespace = null;
  }

  Interface.prototype.getKeyword = function () {
    return "interface";
  }
  
  Interface.prototype.setExtends = function (interfaceName) {
    this.cExtends = interfaceName;
  }
  
  Interface.prototype.getExtends = function () {
    return this.cExtends;
  }

  Interface.prototype.setNamespace = function (namespace) {
    this.nNamespace = namespace;
  }
  
  Interface.prototype.getNamespace = function () {
    return this.nNamespace;
  }

  Interface.prototype.getName = function () {
    return this.interfaceName;
  }
 
  Interface.prototype.hasMethods = function () {
    for (var i = 0, length = this.fileLines.length; i < length; i++) {
      if (this.fileLines[i] instanceof Method) {
        return true;
      }
    }
    return false;
  }
 
  Interface.prototype.getMethods = function () {
    var aResult = [];
    for (var i = 0, length = this.fileLines.length; i < length; i++) {
      if (this.fileLines[i] instanceof Method) {
        aResult.push(this.fileLines[i]);
      }
    }
    return aResult;
  }
 
  Interface.prototype.hasFields = function () {
    for (var i = 0, length = this.fileLines.length; i < length; i++) {
      if (!(this.fileLines[i] instanceof Method) && this.fileLines[i] instanceof Field) {
        return true;
      }
    }
    return false;
  }
 
  Interface.prototype.getFields = function () {
    var aResult = [];
    for (var i = 0, length = this.fileLines.length; i < length; i++) {
      if (!(this.fileLines[i] instanceof Method) && this.fileLines[i] instanceof Field) {
        aResult.push(this.fileLines[i]);
      }
    }
    return aResult;
  }

  Interface.prototype.getFullName = function () {
    if (this.getNamespace() !== null) {
      return this.getNamespace().getFullName() + "." + this.getName();
    } else {
      return this.getName();
    }
  }

  return Interface;

})()
