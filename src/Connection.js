
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function (require) {

return (function () {

  var Connection = function (leftObject, connector, rightObject) {
    this.leftObject = leftObject;
    this.connector = connector;
    this.pNamespace = null;
    this.rightObject = rightObject;
  }

  Connection.prototype.setNamespace = function (namespace) {
    this.pNamespace = namespace;
  }

  Connection.prototype.getConnector = function () {
    return this.connector;
  }

  Connection.prototype.getNamespace = function () {
    return this.pNamespace;
  }

  return Connection;

})()

});
