
module.exports = (function () {

  var Class = require("./Class");
  var AbstractClass = require("./AbstractClass");
  var Connection = require("./Connection");

  var Namespace = function (namespaceName, fileLines) {
    this.namespaceName = namespaceName;
    this.aItems = fileLines;
    this.nNamespace = null;
    this.init();
  }
  
  Namespace.prototype.getName = function () {
    return this.namespaceName;
  }
  
  Namespace.prototype.getItems = function () {
    return this.aItems;
  }

  Namespace.prototype.setNamespace = function (namespace) {
    this.nNamespace = namespace;
  }

  Namespace.prototype.getNamespace = function () {
    return this.nNamespace;
  }
  
  Namespace.prototype.getFullName = function () {
    var aFull = [this.getName()];
    var nSpace = this.getNamespace();
    while (nSpace !== null) {
      aFull.unshift(nSpace.getName());
      nSpace = nSpace.getNamespace();
    }
    return aFull.join(".");
  }

  Namespace.prototype.init = function () {
    for (var i = 0, length = this.aItems.length; i < length; i++) {
      if (this.aItems[i] instanceof Namespace) {
        this.aItems[i].setNamespace(this);
      } else if (this.aItems[i] instanceof Class || this.aItems[i] instanceof AbstractClass) {
        this.aItems[i].setNamespace(this);
      } else if (this.aItems[i] instanceof Connection) {
        this.aItems[i].setNamespace(this);
      }
    }
  }

  return Namespace;

})()
