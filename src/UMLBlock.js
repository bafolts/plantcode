
module.exports = (function () {

  var Namespace = require("./Namespace");
  var Class = require("./Class");
  var AbstractClass = require("./AbstractClass");
  var Connection = require("./Connection");
  var Package = require("./Package");
  var Extension = require("./Extension");
  var Interface = require("./Interface");
  var util = require("util");

  var UMLBlock = function (fileLines) {

    this.aNamespaces = []; // contains all defined namespaces
    this.aPackages = []; // contains all defined packages
    this.aClasses = []; // contains all defined classes
    this.aConnections = []; // contains all defined connections

    this.aItems = fileLines;

    this.populateGlobals(this);
    this.setupConnections();
  }

  UMLBlock.prototype.getClasses = function () {
    return this.aClasses;
  }

  UMLBlock.prototype.getItems = function () {
    return this.aItems;
  }

  UMLBlock.prototype.setupConnections = function () {
    for (var i = 0, length = this.aConnections.length; i < length; i++) {
      this.setupConnection(this.aConnections[i]);
    }
  }

  UMLBlock.prototype.setupConnection = function (connection) {
    var cLeft = null;
    var cRight = null;
    for (var i = 0, length = this.aClasses.length; i < length; i++) {
    
      if (connection.leftObject.indexOf(".") !== -1) {
        if (connection.leftObject.indexOf(".") === 0) {
          if (this.aClasses[i].getNamespace()===null && this.aClasses[i].getName() === connection.leftObject.substring(1)) {
            cLeft = this.aClasses[i];
          }
        } else {
          if (this.aClasses[i].getFullName() === connection.leftObject) {
            cLeft = this.aClasses[i];
          }
        }
      } else if (this.aClasses[i].getName() === connection.leftObject && this.aClasses[i].getNamespace() === connection.getNamespace()) {
        cLeft = this.aClasses[i];
      }
      
      if (connection.rightObject.indexOf(".") !== -1) {
        if (connection.rightObject.indexOf(".") === 0) {
          if (this.aClasses[i].getNamespace()===null && this.aClasses[i].getName() === connection.rightObject.substring(1)) {
            cRight = this.aClasses[i];
          }
        } else {
          if (this.aClasses[i].getFullName() === connection.rightObject) {
            cRight = this.aClasses[i];
          }
        }
      } else if (this.aClasses[i].getName() === connection.rightObject && this.aClasses[i].getNamespace() === connection.getNamespace()) {
        cRight = this.aClasses[i];
      }

    }

    if (cLeft !== null && cRight !== null) {
      if (connection.getConnector() instanceof Extension) {
        if (connection.getConnector().isLeft()) {
          cRight.setExtends(cLeft);
        } else {
          cLeft.setExtends(cRight);
        }
      }
    }
  }
  
  UMLBlock.prototype.populateGlobals = function (item) {
  
    var items = item.getItems();
  
    for (var i = 0, length = items.length; i < length; i++) {
      if (items[i] instanceof Namespace) {
        this.aNamespaces.push(items[i]);
        this.populateGlobals(items[i]);
      } else if (items[i] instanceof Class || items[i] instanceof AbstractClass || items[i] instanceof Interface) {
        this.aClasses.push(items[i]);
      } else if (items[i] instanceof Package) {
        this.aPackages.push(items[i]);
        this.populateGlobals(items[i]);
      } else if (items[i] instanceof Connection) {
        this.aConnections.push(items[i]);
      } else {
        throw "Unknown type";
      }
    }
  
  }
  
  return UMLBlock;

})()
