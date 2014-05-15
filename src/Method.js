
module.exports = (function () {

  var util = require("util");
  var Field = require("./Field");

  var Method = function (accessType, returnType, fieldName, aParameters) {
    this.aParameters = aParameters;
    Method.super_.call(this, accessType, returnType, fieldName);
  }
  util.inherits(Method, Field);
  
  Method.prototype.getParameters = function () {
    return this.aParameters;
  }

  return Method;

})()
