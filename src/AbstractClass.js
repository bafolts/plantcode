
module.exports = (function () {

  var util = require("util");
  var Class = require("./Class");

  var AbstractClass = function (className, fileLines) {
    AbstractClass.super_.call(this, className, fileLines);
  }
  util.inherits(AbstractClass, Class);

  AbstractClass.prototype.getKeyword = function () {
    return "abstract class";
  }

  AbstractClass.prototype.isAbstract = function () {
    return true;
  }

  return AbstractClass;

})()
