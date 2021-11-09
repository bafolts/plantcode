
module.exports = (function () {

  var Field = function (accessType, returnType, fieldName) {
    this.sAccessType = accessType;
    this.sReturnType = returnType;
    this.sFieldName = fieldName;
  }

  Field.prototype.getAccessType = function () {
    return this.sAccessType;
  }

  Field.prototype.getReturnType = function () {
    return this.sReturnType;
  }
  
  Field.prototype.getName = function () {
    return this.sFieldName;
  }

  Field.prototype.isPrivate = function () {
    return this.sAccessType === '-';
  }

  Field.prototype.isProtected = function () {
    return this.sAccessType === '#';
  }

  Field.prototype.isPublic = function () {
    return this.sAccessType === '+';
  }

  return Field;

})()
