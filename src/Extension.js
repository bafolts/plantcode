
module.exports = (function () {

  var Extension = function (bIsLeft) {
    this.bIsLeft = bIsLeft;
  }
  
  Extension.prototype.isLeft = function () {
    return this.bIsLeft;
  }

  return Extension;

})()
