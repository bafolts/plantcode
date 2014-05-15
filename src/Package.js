
module.exports = (function () {


  var Package = function (namespaceName, fileLines) {
    this.namespaceName = namespaceName;
    this.fileLines = fileLines;
  }

  return Package;

})()
