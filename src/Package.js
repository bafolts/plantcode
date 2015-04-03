
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function (require) {
return (function () {


  var Package = function (namespaceName, fileLines) {
    this.namespaceName = namespaceName;
    this.fileLines = fileLines;
  }

  return Package;

})()

});
