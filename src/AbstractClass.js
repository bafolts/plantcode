
var Class = require("./Class");

class AbstractClass extends Class {
  getKeyword() {
    return "abstract class";
  }

  isAbstract() {
    return true;
  }
}

module.exports = AbstractClass;
