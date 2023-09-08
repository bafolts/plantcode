
var Field = require("./Field");

class Method extends Field {
  constructor (accessType, returnType, fieldName, aParameters) {
    super(accessType, returnType, fieldName);
    this.aParameters = aParameters;
  }

  needsReturnStatement() {
    return this.sReturnType !== "void";
  }
  
  getParameters() {
    return this.aParameters;
  }
}

module.exports = Method;
