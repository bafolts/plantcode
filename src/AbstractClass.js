
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function(require) {
return (function () {

  var Class = require("./Class");
  var util = require("util");

  var AbstractClass = function (className, fileLines) {
    AbstractClass.super_.call(this, className, fileLines);
  }
  util.inherits(AbstractClass, Class);

  AbstractClass.prototype.isAbstract = function () {
    return true;
  }

  return AbstractClass;

})()
})
