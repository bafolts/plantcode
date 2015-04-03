
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function (require) {
return (function () {

  var Parameter = function (returnType, memberName) {
    this.sReturnType = returnType;
    this.sParameterName = memberName;
  }
  
  Parameter.prototype.getReturnType = function () {
    return this.sReturnType;
  }

  Parameter.prototype.getName = function () {
    return this.sParameterName;
  }

  return Parameter;

})()

});
