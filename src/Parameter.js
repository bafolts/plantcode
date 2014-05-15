
module.exports = (function () {

  var Parameter = function (parameterString) {
    var aItems = parameterString.split(" ");
    this.sReturnType = aItems[0];
    if (aItems.length > 1) {
      this.sParameterName = aItems[1];
    } else {
      this.sParameterName = null;
    }
  }

  Parameter.prototype.getName = function () {
    return this.sParameterName;
  }

  return Parameter;

})()
