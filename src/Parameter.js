
module.exports = (function () {

  var Parameter = function (returnType, memberName) {
    this.sReturnType = returnType;
    this.sParameterName = memberName;
  }

  Parameter.prototype.getName = function () {
    return this.sParameterName;
  }

  return Parameter;

})()
