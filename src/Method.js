
module.exports = (function () {

  var util = require("util");
  var Field = require("./Field");

  var Method = function (accessType, returnType, fieldName, aParameters) {
    this.aParameters = aParameters;
    this.sReturnType = returnType;
    Method.super_.call(this, accessType, returnType, fieldName);
  }
  util.inherits(Method, Field);
  
  Method.prototype.getReturnType = function () {
    return this.sReturnType;
  }
  
  Method.prototype.needsReturnStatement = function () {
    return this.sReturnType !== "void";
  }
  
  Method.prototype.getParameters = function () {
    return this.aParameters;
  }

  return Method;

})()
