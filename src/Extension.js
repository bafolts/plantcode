
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function (require) {

return (function () {

  var Extension = function (bIsLeft) {
    this.bIsLeft = bIsLeft;
  }
  
  Extension.prototype.isLeft = function () {
    return this.bIsLeft;
  }

  return Extension;

})()

});

